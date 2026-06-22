import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { A as AppShell, P as PageHeader, E as EmptyState } from "./app-shell-DNK_0Qfv.mjs";
import { a as useQueryClient, u as useQuery } from "../_libs/tanstack__react-query.mjs";
import { s as supabase } from "./client-B2Ztv5jM.mjs";
import { u as useAuth } from "./router-fTkOEsEW.mjs";
import { f as fmtDateTime } from "./format-C1KpzYiq.mjs";
import { B as Button } from "./button-BC9oXVxV.mjs";
import "../_libs/sonner.mjs";
import "../_libs/tanstack__react-router.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
import "./utils-H80jjgLf.mjs";
import "../_libs/clsx.mjs";
import "../_libs/tailwind-merge.mjs";
import "../_libs/lucide-react.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/class-variance-authority.mjs";
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
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(AppShell, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(PageHeader, { title: "Notifikasi", description: "Pemberitahuan tentang harga, pesanan, dan langganan Anda.", action: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", onClick: markAll, children: "Tandai semua dibaca" }) }),
    !items || items.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(EmptyState, { title: "Belum ada notifikasi", description: "Kami akan memberitahu Anda saat ada perubahan harga." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: items.map((n) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `rounded-lg border p-4 ${n.read_at ? "border-[var(--color-gray-100)] bg-white" : "border-[var(--color-brand-blue)] bg-[var(--color-brand-blue)]/5"}`, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold", children: n.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-[var(--color-gray-700)]", children: n.body })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "shrink-0 text-xs text-[var(--color-gray-500)]", children: fmtDateTime(n.created_at) })
    ] }) }, n.id)) })
  ] });
}
export {
  NotifPage as component
};
