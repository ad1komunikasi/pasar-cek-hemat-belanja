#!/usr/bin/env node
/**
 * post-build-vercel.js
 * Membuat Vercel Build Output API yang lengkap dari hasil build TanStack Start.
 *
 * TanStack Start menghasilkan:
 *   dist/client/   -> static assets (JS, CSS, HTML)
 *   dist/server/   -> server bundle
 *
 * Vercel Build Output API membutuhkan:
 *   .vercel/output/config.json          -> routing config
 *   .vercel/output/static/              -> static files
 *   .vercel/output/functions/__server.func/index.mjs  -> serverless function
 *   .vercel/output/functions/__server.func/.vc-config.json
 */

import { existsSync, mkdirSync, cpSync, writeFileSync, readFileSync, readdirSync } from "fs";
import { join, resolve } from "path";

const root = process.cwd();
const distClient = join(root, "dist", "client");
const distServer = join(root, "dist", "server");
const vercelOut = join(root, ".vercel", "output");
const vercelStatic = join(vercelOut, "static");
const vercelFunctions = join(vercelOut, "functions");
const serverFunc = join(vercelFunctions, "__server.func");

// 1. Bersihkan dan buat direktori
function ensureDir(dir) {
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true });
  }
}

ensureDir(vercelStatic);
ensureDir(serverFunc);

// 2. Copy static assets dari dist/client ke .vercel/output/static
if (existsSync(distClient)) {
  cpSync(distClient, vercelStatic, { recursive: true });
  console.log("✓ Copied dist/client → .vercel/output/static");
}

// 3. Copy server bundle ke .vercel/output/functions/__server.func/
if (existsSync(distServer)) {
  cpSync(distServer, serverFunc, { recursive: true });
  console.log("✓ Copied dist/server → .vercel/output/functions/__server.func");
}

// 4. Rename server.js ke index.mjs (Vercel membutuhkan index.mjs sebagai entry)
const serverJsSrc = join(serverFunc, "server.js");
const indexMjsDest = join(serverFunc, "index.mjs");
if (existsSync(serverJsSrc) && !existsSync(indexMjsDest)) {
  const content = readFileSync(serverJsSrc, "utf8");
  // Ubah import "./assets/..." menjadi import dari lokasi yang benar
  writeFileSync(indexMjsDest, content, "utf8");
  console.log("✓ Created index.mjs from server.js");
}

// 5. Buat .vc-config.json untuk function
const vcConfig = {
  runtime: "nodejs20.x",
  handler: "index.mjs",
  launcherType: "Nodejs",
  experimentalResponseStreaming: true,
};
writeFileSync(join(serverFunc, ".vc-config.json"), JSON.stringify(vcConfig, null, 2));
console.log("✓ Created .vc-config.json");

// 6. Buat config.json (routing)
// Semua request yang bukan static file diteruskan ke serverless function
const config = {
  version: 3,
  routes: [
    // Static assets dengan cache panjang
    {
      src: "^/assets/(.*)$",
      headers: { "cache-control": "public, max-age=31536000, immutable" },
      continue: true,
    },
    // Sajikan static files jika ada
    {
      handle: "filesystem",
    },
    // Semua request lain ke serverless function
    {
      src: "/(.*)",
      dest: "/__server",
    },
  ],
};
writeFileSync(join(vercelOut, "config.json"), JSON.stringify(config, null, 2));
console.log("✓ Created config.json");

console.log("\n✅ Vercel Build Output API siap di .vercel/output/");
