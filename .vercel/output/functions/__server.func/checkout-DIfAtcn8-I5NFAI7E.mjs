import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "./chunk-QUJLIHBG.mjs";
import {
  AppShell,
  PageHeader
} from "./chunk-XZNSYGQD.mjs";
import {
  idr
} from "./chunk-HQLZASKI.mjs";
import "./chunk-KJB73ZNG.mjs";
import {
  external_exports
} from "./chunk-225ORRUB.mjs";
import "./chunk-SCES3O22.mjs";
import {
  Route$d,
  useAuth
} from "./chunk-UC4BMYGH.mjs";
import {
  Label
} from "./chunk-5MVIPTMN.mjs";
import "./chunk-XAC4VDGA.mjs";
import {
  toast
} from "./chunk-KIHGSOXA.mjs";
import {
  Input
} from "./chunk-5KSQNLU6.mjs";
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
import {
  useNavigate
} from "./chunk-TV3ZUI3R.mjs";
import "./chunk-RE5W7UZM.mjs";
import {
  require_jsx_runtime,
  require_react
} from "./chunk-MLKSHREV.mjs";
import {
  __toESM
} from "./chunk-KVSJYO5R.mjs";

// dist/server/assets/checkout-DIfAtcn8.js
var import_jsx_runtime = __toESM(require_jsx_runtime(), 1);
var import_react = __toESM(require_react(), 1);
var schema = external_exports.object({
  recipient_name: external_exports.string().trim().min(2).max(100),
  recipient_email: external_exports.string().trim().email().max(255),
  recipient_phone: external_exports.string().trim().min(8).max(20)
});
function CheckoutPage() {
  const search = Route$d.useSearch();
  const {
    user,
    profile
  } = useAuth();
  const qc = useQueryClient();
  const navigate = useNavigate();
  const {
    data: pkg
  } = useQuery({
    queryKey: ["pkg", search.package],
    queryFn: async () => (await supabase.from("packages").select("*").eq("slug", search.package).maybeSingle()).data
  });
  const {
    data: methods
  } = useQuery({
    queryKey: ["payment-methods"],
    queryFn: async () => (await supabase.from("payment_methods").select("*").eq("is_active", true).order("sort_order")).data ?? []
  });
  const [name, setName] = (0, import_react.useState)("");
  const [email, setEmail] = (0, import_react.useState)("");
  const [phone, setPhone] = (0, import_react.useState)("");
  const [methodId, setMethodId] = (0, import_react.useState)("");
  (0, import_react.useEffect)(() => {
    if (profile && user) {
      setName(profile.full_name ?? "");
      setEmail(user.email ?? "");
      setPhone(profile.phone ?? "");
    }
  }, [profile, user]);
  (0, import_react.useEffect)(() => {
    if (methods && methods.length && !methodId) setMethodId(methods[0].id);
  }, [methods, methodId]);
  async function submit() {
    if (!pkg || !methodId) return;
    const parsed = schema.safeParse({
      recipient_name: name,
      recipient_email: email,
      recipient_phone: phone
    });
    if (!parsed.success) return toast.error(parsed.error.errors[0].message);
    const {
      data: numRes
    } = await supabase.rpc("generate_order_number").single();
    const num = numRes ?? `PSC-${(/* @__PURE__ */ new Date()).toISOString().slice(0, 10).replace(/-/g, "")}-${Math.floor(1e3 + Math.random() * 8999)}`;
    const method = methods.find((m) => m.id === methodId);
    const {
      data,
      error
    } = await supabase.from("orders").insert({
      order_number: num,
      user_id: user.id,
      package_id: pkg.id,
      recipient_name: name,
      recipient_email: email,
      recipient_phone: phone,
      amount: Number(pkg.price),
      method: method.type,
      payment_method_id: method.id,
      status: "pending_payment"
    }).select().single();
    if (error) return toast.error(error.message);
    qc.invalidateQueries({
      queryKey: ["orders"]
    });
    toast.success("Pesanan dibuat. Silakan lakukan pembayaran.");
    navigate({
      to: "/orders/$id",
      params: {
        id: data.id
      }
    });
  }
  if (!pkg) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, { title: "Checkout" }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Paket tidak ditemukan." })
  ] });
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, { title: "Checkout", description: `Berlangganan paket ${pkg.name}` }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "grid gap-6 lg:grid-cols-[1fr_360px]", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "rounded-lg border border-[var(--color-gray-100)] bg-white p-6", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { className: "mb-4 text-lg font-bold", children: "Informasi Penerima" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "space-y-3", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Nama" }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, { value: name, onChange: (e) => setName(e.target.value) })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Email" }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, { type: "email", value: email, onChange: (e) => setEmail(e.target.value) })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Nomor HP" }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, { value: phone, onChange: (e) => setPhone(e.target.value) })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Metode Pembayaran" }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, { value: methodId, onValueChange: setMethodId, children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {}) }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: (methods ?? []).map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectItem, { value: m.id, children: [
                m.name,
                " (",
                m.type.toUpperCase(),
                ")"
              ] }, m.id)) })
            ] })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, { onClick: submit, className: "w-full", children: "Buat Pesanan" })
        ] })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "space-y-3 rounded-lg border border-[var(--color-gray-100)] bg-white p-6", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { className: "text-lg font-bold", children: "Ringkasan" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex justify-between text-sm", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: pkg.name }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: idr(Number(pkg.price)) })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex justify-between text-sm text-[var(--color-gray-500)]", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Durasi" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
            pkg.duration_days,
            " hari"
          ] })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "my-2 border-t border-[var(--color-gray-100)]" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex justify-between", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "font-bold", children: "Total" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "text-xl font-black", children: idr(Number(pkg.price)) })
        ] })
      ] })
    ] })
  ] });
}
export {
  CheckoutPage as component
};
