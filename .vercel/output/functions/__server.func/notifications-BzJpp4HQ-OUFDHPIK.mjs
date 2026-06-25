import { createRequire } from 'module';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const require = createRequire(import.meta.url);
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
import {
  AppShell,
  EmptyState,
  PageHeader
} from "./chunk-TQBGYPF4.mjs";
import {
  fmtDateTime
} from "./chunk-LEY4RZ2W.mjs";
import {
  useAuth
} from "./chunk-YRLTXJTO.mjs";
import "./chunk-C7CN73EW.mjs";
import {
  useQuery,
  useQueryClient
} from "./chunk-DH7FIRD7.mjs";
import {
  Button
} from "./chunk-AVRRWDIK.mjs";
import "./chunk-NXBQQK3G.mjs";
import "./chunk-IHLGWONG.mjs";
import "./chunk-Y5N26HX3.mjs";
import {
  supabase
} from "./chunk-KXW3467E.mjs";
import "./chunk-NDUCSHRX.mjs";
import "./chunk-FO6XWC3V.mjs";
import "./chunk-26CBNBTQ.mjs";
import {
  require_jsx_runtime,
  require_react
} from "./chunk-RTXGIA7H.mjs";
import {
  __toESM
} from "./chunk-G2MDZA75.mjs";

// dist/server/assets/notifications-BzJpp4HQ.js
var import_jsx_runtime = __toESM(require_jsx_runtime(), 1);
var import_react = __toESM(require_react(), 1);
function NotifPage() {
  const {
    user
  } = useAuth();
  const qc = useQueryClient();
  const {
    data: items
  } = useQuery({
    queryKey: ["notif", user?.id],
    queryFn: async () => (await supabase.from("notifications").select("*").eq("user_id", user.id).order("created_at", {
      ascending: false
    })).data ?? []
  });
  async function markAll() {
    await supabase.from("notifications").update({
      read_at: (/* @__PURE__ */ new Date()).toISOString()
    }).is("read_at", null).eq("user_id", user.id);
    qc.invalidateQueries({
      queryKey: ["notif"]
    });
  }
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, { title: "Notifikasi", description: "Pemberitahuan tentang harga, pesanan, dan langganan Anda.", action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, { variant: "outline", onClick: markAll, children: "Tandai semua dibaca" }) }),
    !items || items.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, { title: "Belum ada notifikasi", description: "Kami akan memberitahu Anda saat ada perubahan harga." }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "space-y-2", children: items.map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: `rounded-lg border p-4 ${n.read_at ? "border-[var(--color-gray-100)] bg-white" : "border-[var(--color-brand-blue)] bg-[var(--color-brand-blue)]/5"}`, children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex items-start justify-between gap-3", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "min-w-0", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { className: "font-bold", children: n.title }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { className: "mt-1 text-sm text-[var(--color-gray-700)]", children: n.body })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "shrink-0 text-xs text-[var(--color-gray-500)]", children: fmtDateTime(n.created_at) })
    ] }) }, n.id)) })
  ] });
}
export {
  NotifPage as component
};
