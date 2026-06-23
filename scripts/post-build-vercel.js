#!/usr/bin/env node
/**
 * post-build-vercel.js
 *
 * Membuat Vercel Build Output API yang lengkap dari hasil build TanStack Start.
 * Menggunakan esbuild untuk membundle semua dependencies menjadi satu file
 * self-contained — tidak ada external package dependencies di Vercel runtime.
 */

import { existsSync, mkdirSync, cpSync, writeFileSync, rmSync, renameSync } from "fs";
import { join, resolve, dirname } from "path";
import { fileURLToPath } from "url";
import { build } from "esbuild";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");

const distClient = join(root, "dist", "client");
const distServer = join(root, "dist", "server");
const vercelOut = join(root, ".vercel", "output");
const vercelStatic = join(vercelOut, "static");
const serverFunc = join(vercelOut, "functions", "__server.func");

function ensureDir(dir) {
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
}

// ─── 1. Bersihkan output lama ────────────────────────────────────────────────
if (existsSync(vercelOut)) {
  rmSync(vercelOut, { recursive: true, force: true });
}
ensureDir(vercelStatic);
ensureDir(serverFunc);
console.log("✓ Cleaned and recreated .vercel/output/");

// ─── 2. Copy static assets ────────────────────────────────────────────────────
if (!existsSync(distClient)) {
  console.error("✗ dist/client not found! Run `npm run build` first.");
  process.exit(1);
}
cpSync(distClient, vercelStatic, { recursive: true });
console.log("✓ Copied dist/client → .vercel/output/static");

// ─── 3. Bundle server dengan esbuild (all deps inlined) ──────────────────────
const serverEntry = join(distServer, "server.js");
if (!existsSync(serverEntry)) {
  console.error("✗ dist/server/server.js not found!");
  process.exit(1);
}

console.log("⏳ Bundling server dengan esbuild...");

// Node.js built-ins yang tidak perlu di-bundle
const nodeBuiltins = [
  "node:async_hooks", "node:buffer", "node:child_process", "node:cluster",
  "node:console", "node:crypto", "node:diagnostics_channel", "node:dns",
  "node:events", "node:fs", "node:fs/promises", "node:http", "node:http2",
  "node:https", "node:inspector", "node:module", "node:net", "node:os",
  "node:path", "node:perf_hooks", "node:process", "node:querystring",
  "node:readline", "node:stream", "node:stream/promises", "node:stream/web",
  "node:string_decoder", "node:timers", "node:timers/promises", "node:tls",
  "node:trace_events", "node:url", "node:util", "node:v8", "node:vm",
  "node:wasi", "node:worker_threads", "node:zlib",
  // Tanpa prefix node:
  "async_hooks", "buffer", "child_process", "cluster", "console", "crypto",
  "diagnostics_channel", "dns", "events", "fs", "fs/promises", "http",
  "http2", "https", "inspector", "module", "net", "os", "path", "perf_hooks",
  "process", "querystring", "readline", "stream", "string_decoder", "timers",
  "tls", "url", "util", "v8", "vm", "worker_threads", "zlib",
];

let bundleSuccess = false;

try {
  await build({
    entryPoints: [serverEntry],
    bundle: true,
    platform: "node",
    target: "node20",
    format: "esm",
    // Code splitting supaya dynamic import() tetap bekerja
    splitting: true,
    outdir: serverFunc,
    outExtension: { ".js": ".mjs" }, // Output dengan ekstensi .mjs
    // Hanya exclude Node.js built-ins — semua package lain di-bundle
    external: nodeBuiltins,
    absWorkingDir: root,
    logLevel: "error", // Hanya tampilkan errors, bukan warnings
    minify: false,
    sourcemap: false,
    // Resolve dari root node_modules
    nodePaths: [join(root, "node_modules")],
    banner: {
      js: `import { createRequire } from 'module';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const require = createRequire(import.meta.url);
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);`,
    },
  });

  bundleSuccess = true;
  console.log("✓ Server berhasil di-bundle dengan esbuild!");

  // Verifikasi index.mjs ada
  const indexPath = join(serverFunc, "index.mjs");
  if (!existsSync(indexPath)) {
    // esbuild mungkin menamai output berdasarkan input filename
    const altPath = join(serverFunc, "server.mjs");
    if (existsSync(altPath)) {
      renameSync(altPath, indexPath);
      console.log("✓ Renamed server.mjs → index.mjs");
    } else {
      console.error("✗ index.mjs tidak ditemukan setelah bundling!");
      bundleSuccess = false;
    }
  } else {
    console.log("✓ index.mjs siap");
  }
} catch (buildErr) {
  console.error("✗ esbuild error:", buildErr.message);
  bundleSuccess = false;
}

// ─── Fallback jika bundling gagal ────────────────────────────────────────────
if (!bundleSuccess) {
  console.log("\n⚠ Fallback: copy dist/server + node_modules packages...");

  // Bersihkan serverFunc dari file esbuild yang gagal
  if (existsSync(serverFunc)) {
    rmSync(serverFunc, { recursive: true, force: true });
  }
  ensureDir(serverFunc);

  // Copy dist/server
  cpSync(distServer, serverFunc, { recursive: true });

  // Rename server.js → index.mjs
  const serverJs = join(serverFunc, "server.js");
  const indexMjs = join(serverFunc, "index.mjs");
  if (existsSync(serverJs) && !existsSync(indexMjs)) {
    const { readFileSync } = await import("fs");
    writeFileSync(indexMjs, readFileSync(serverJs, "utf8"), "utf8");
  }

  // Copy required packages ke node_modules function
  const requiredPkgs = [
    "h3-v2",
    "@tanstack/router-core",
    "@tanstack/react-router",
    "@tanstack/react-start",
    "@tanstack/start-server-core",
    "@tanstack/start-client-core",
    "@tanstack/react-start-server",
    "seroval",
    "@tanstack/history",
  ];

  const fnNodeModules = join(serverFunc, "node_modules");
  ensureDir(fnNodeModules);

  for (const pkg of requiredPkgs) {
    const src = join(root, "node_modules", pkg);
    const dest = join(fnNodeModules, ...pkg.split("/"));
    if (existsSync(src)) {
      ensureDir(dirname(dest));
      cpSync(src, dest, { recursive: true });
      console.log(`  ✓ Copied ${pkg}`);
    } else {
      console.warn(`  ⚠ Not found: ${pkg}`);
    }
  }
}

// ─── 4. Buat .vc-config.json ─────────────────────────────────────────────────
writeFileSync(
  join(serverFunc, ".vc-config.json"),
  JSON.stringify(
    {
      runtime: "nodejs20.x",
      handler: "index.mjs",
      launcherType: "Nodejs",
      experimentalResponseStreaming: true,
    },
    null,
    2
  )
);
console.log("✓ Created .vc-config.json");

// ─── 5. Buat config.json ─────────────────────────────────────────────────────
writeFileSync(
  join(vercelOut, "config.json"),
  JSON.stringify(
    {
      version: 3,
      routes: [
        {
          src: "^/assets/(.+)$",
          headers: { "cache-control": "public, max-age=31536000, immutable" },
          continue: true,
        },
        { handle: "filesystem" },
        { src: "/(.*)", dest: "/__server" },
      ],
    },
    null,
    2
  )
);
console.log("✓ Created config.json");

// ─── 6. Verifikasi ───────────────────────────────────────────────────────────
import { statSync } from "fs";
const indexMjsPath = join(serverFunc, "index.mjs");
const indexExists = existsSync(indexMjsPath);
const indexSize = indexExists ? statSync(indexMjsPath).size : 0;

// Hitung total chunks yang dihasilkan esbuild
const { readdirSync } = await import("fs");
const allChunks = readdirSync(serverFunc).filter(
  (f) => f.endsWith(".mjs") || f.endsWith(".js")
);

console.log("\n✅ Vercel Build Output API siap:");
console.log(`   static/          → ${existsSync(vercelStatic) ? "OK" : "MISSING"}`);
console.log(`   index.mjs        → ${indexExists ? `OK (${indexSize} bytes, entry chunk)` : "MISSING"}`);
console.log(`   server chunks    → ${allChunks.length} files`);
console.log(`   .vc-config.json  → OK`);
console.log(`   config.json      → ${existsSync(join(vercelOut, "config.json")) ? "OK" : "MISSING"}`);

// index.mjs dengan splitting memang kecil — cukup pastikan ia ada dan berisi export
if (!indexExists) {
  console.error("\n✗ ERROR: index.mjs tidak ada!");
  process.exit(1);
}

// Cek bahwa index.mjs mengexport default
const { readFileSync } = await import("fs");
const indexContent = readFileSync(indexMjsPath, "utf8");
if (!indexContent.includes("export") || !indexContent.includes("default")) {
  console.error("✗ ERROR: index.mjs tidak mengexport default handler!");
  process.exit(1);
}

console.log("\n🚀 Siap untuk di-deploy ke Vercel!");

