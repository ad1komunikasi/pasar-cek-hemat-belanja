import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { a as useQueryClient, u as useQuery } from "../_libs/tanstack__react-query.mjs";
import { s as supabase } from "./client-koMOzLtV.mjs";
import { B as Button } from "./button-BC9oXVxV.mjs";
import { I as Input } from "./input-C0QjszdI.mjs";
import { L as Label } from "./label-JU3yqRBo.mjs";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-CZRUt5a6.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { v as Trash2 } from "../_libs/lucide-react.mjs";
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
import "../_libs/clsx.mjs";
import "./utils-H80jjgLf.mjs";
import "../_libs/tailwind-merge.mjs";
import "../_libs/radix-ui__react-label.mjs";
import "../_libs/radix-ui__react-primitive.mjs";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/radix-ui__react-select.mjs";
import "../_libs/radix-ui__number.mjs";
import "../_libs/radix-ui__primitive.mjs";
import "../_libs/radix-ui__react-collection.mjs";
import "../_libs/radix-ui__react-context.mjs";
import "../_libs/radix-ui__react-direction.mjs";
import "../_libs/@radix-ui/react-dismissable-layer+[...].mjs";
import "../_libs/@radix-ui/react-use-callback-ref+[...].mjs";
import "../_libs/@radix-ui/react-use-escape-keydown+[...].mjs";
import "../_libs/radix-ui__react-focus-guards.mjs";
import "../_libs/radix-ui__react-focus-scope.mjs";
import "../_libs/radix-ui__react-id.mjs";
import "../_libs/@radix-ui/react-use-layout-effect+[...].mjs";
import "../_libs/radix-ui__react-popper.mjs";
import "../_libs/floating-ui__react-dom.mjs";
import "../_libs/floating-ui__dom.mjs";
import "../_libs/floating-ui__core.mjs";
import "../_libs/floating-ui__utils.mjs";
import "../_libs/radix-ui__react-arrow.mjs";
import "../_libs/radix-ui__react-use-size.mjs";
import "../_libs/radix-ui__react-portal.mjs";
import "../_libs/radix-ui__react-presence.mjs";
import "../_libs/@radix-ui/react-use-controllable-state+[...].mjs";
import "../_libs/radix-ui__react-use-previous.mjs";
import "../_libs/@radix-ui/react-visually-hidden+[...].mjs";
import "../_libs/aria-hidden.mjs";
import "../_libs/react-remove-scroll.mjs";
import "../_libs/react-remove-scroll-bar.mjs";
import "../_libs/react-style-singleton.mjs";
import "../_libs/get-nonce.mjs";
import "../_libs/use-sidecar.mjs";
import "../_libs/use-callback-ref.mjs";
function AdminMarkets() {
  const qc = useQueryClient();
  const {
    data
  } = useQuery({
    queryKey: ["admin-markets"],
    queryFn: async () => (await supabase.from("markets").select("*").order("name")).data ?? []
  });
  const [name, setName] = reactExports.useState("");
  const [address, setAddress] = reactExports.useState("");
  const [city, setCity] = reactExports.useState("");
  const [type, setType] = reactExports.useState("tradisional");
  const [hours, setHours] = reactExports.useState("");
  async function create() {
    if (!name || !address || !city) return toast.error("Lengkapi data");
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    const {
      error
    } = await supabase.from("markets").insert({
      name,
      slug,
      address,
      city,
      type,
      hours,
      province: "DKI Jakarta"
    });
    if (error) return toast.error(error.message);
    toast.success("Pasar ditambahkan");
    setName("");
    setAddress("");
    setCity("");
    setHours("");
    qc.invalidateQueries({
      queryKey: ["admin-markets"]
    });
  }
  async function remove(id) {
    await supabase.from("markets").delete().eq("id", id);
    qc.invalidateQueries({
      queryKey: ["admin-markets"]
    });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mb-6 text-3xl font-black", children: "Pasar" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-6 lg:grid-cols-[1fr_320px]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-hidden rounded-lg border border-[var(--color-gray-100)] bg-white", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "bg-[var(--color-gray-50)] text-left text-xs uppercase text-[var(--color-gray-500)]", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3", children: "Nama" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3", children: "Kota" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3", children: "Tipe" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3", children: "Jam" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", {})
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: (data ?? []).map((m) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-t border-[var(--color-gray-100)]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-3 font-semibold", children: [
            m.name,
            /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-[var(--color-gray-500)]", children: m.address })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: m.city }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 capitalize", children: m.type }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: m.hours ?? "—" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "icon", variant: "ghost", onClick: () => remove(m.id), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4 text-[var(--color-destructive)]" }) }) })
        ] }, m.id)) })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3 rounded-lg border border-[var(--color-gray-100)] bg-white p-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-bold", children: "Tambah Pasar" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Nama" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: name, onChange: (e) => setName(e.target.value) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Alamat" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: address, onChange: (e) => setAddress(e.target.value) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Kota" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: city, onChange: (e) => setCity(e.target.value) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Tipe" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: type, onValueChange: (v) => setType(v), children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "tradisional", children: "Tradisional" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "modern", children: "Modern" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "swalayan", children: "Swalayan" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Jam Operasional" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: hours, onChange: (e) => setHours(e.target.value), placeholder: "05:00 - 17:00" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: create, className: "w-full", children: "Simpan" })
      ] })
    ] })
  ] });
}
export {
  AdminMarkets as component
};
