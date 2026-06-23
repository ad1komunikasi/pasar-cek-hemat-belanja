import {
  AppShell,
  EmptyState,
  PageHeader
} from "./chunk-XZNSYGQD.mjs";
import {
  fmtDateTime
} from "./chunk-HQLZASKI.mjs";
import "./chunk-KJB73ZNG.mjs";
import {
  useAuth
} from "./chunk-UC4BMYGH.mjs";
import "./chunk-KIHGSOXA.mjs";
import {
  useQuery,
  useQueryClient
} from "./chunk-76F7W2CF.mjs";
import {
  Button
} from "./chunk-4AYWSIRD.mjs";
import "./chunk-QH35MXVZ.mjs";
import "./chunk-HSWPCUUH.mjs";
import {
  supabase
} from "./chunk-7GEO44MB.mjs";
import "./chunk-G46AXIAP.mjs";
import "./chunk-TV3ZUI3R.mjs";
import "./chunk-RE5W7UZM.mjs";
import {
  require_jsx_runtime,
  require_react
} from "./chunk-MLKSHREV.mjs";
import {
  __toESM
} from "./chunk-KVSJYO5R.mjs";

// dist/server/assets/notifications-BYOgIVNH.js
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
