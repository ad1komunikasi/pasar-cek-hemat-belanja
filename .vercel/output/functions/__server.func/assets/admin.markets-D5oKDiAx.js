import { jsxs, Fragment, jsx } from "react/jsx-runtime";
import { useQueryClient, useQuery } from "@tanstack/react-query";
import { s as supabase } from "./client-koMOzLtV.js";
import { B as Button } from "./button-BC9oXVxV.js";
import { I as Input } from "./input-C0QjszdI.js";
import { L as Label } from "./label-JU3yqRBo.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-CZRUt5a6.js";
import { useState } from "react";
import { toast } from "sonner";
import { Trash2 } from "lucide-react";
import "@supabase/supabase-js";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "./utils-H80jjgLf.js";
import "clsx";
import "tailwind-merge";
import "@radix-ui/react-label";
import "@radix-ui/react-select";
function AdminMarkets() {
  const qc = useQueryClient();
  const {
    data
  } = useQuery({
    queryKey: ["admin-markets"],
    queryFn: async () => (await supabase.from("markets").select("*").order("name")).data ?? []
  });
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [type, setType] = useState("tradisional");
  const [hours, setHours] = useState("");
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
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("h1", { className: "mb-6 text-3xl font-black", children: "Pasar" }),
    /* @__PURE__ */ jsxs("div", { className: "grid gap-6 lg:grid-cols-[1fr_320px]", children: [
      /* @__PURE__ */ jsx("div", { className: "overflow-hidden rounded-lg border border-[var(--color-gray-100)] bg-white", children: /* @__PURE__ */ jsxs("table", { className: "w-full text-sm", children: [
        /* @__PURE__ */ jsx("thead", { className: "bg-[var(--color-gray-50)] text-left text-xs uppercase text-[var(--color-gray-500)]", children: /* @__PURE__ */ jsxs("tr", { children: [
          /* @__PURE__ */ jsx("th", { className: "px-4 py-3", children: "Nama" }),
          /* @__PURE__ */ jsx("th", { className: "px-4 py-3", children: "Kota" }),
          /* @__PURE__ */ jsx("th", { className: "px-4 py-3", children: "Tipe" }),
          /* @__PURE__ */ jsx("th", { className: "px-4 py-3", children: "Jam" }),
          /* @__PURE__ */ jsx("th", {})
        ] }) }),
        /* @__PURE__ */ jsx("tbody", { children: (data ?? []).map((m) => /* @__PURE__ */ jsxs("tr", { className: "border-t border-[var(--color-gray-100)]", children: [
          /* @__PURE__ */ jsxs("td", { className: "px-4 py-3 font-semibold", children: [
            m.name,
            /* @__PURE__ */ jsx("br", {}),
            /* @__PURE__ */ jsx("span", { className: "text-xs text-[var(--color-gray-500)]", children: m.address })
          ] }),
          /* @__PURE__ */ jsx("td", { className: "px-4 py-3", children: m.city }),
          /* @__PURE__ */ jsx("td", { className: "px-4 py-3 capitalize", children: m.type }),
          /* @__PURE__ */ jsx("td", { className: "px-4 py-3", children: m.hours ?? "—" }),
          /* @__PURE__ */ jsx("td", { className: "px-4 py-3 text-right", children: /* @__PURE__ */ jsx(Button, { size: "icon", variant: "ghost", onClick: () => remove(m.id), children: /* @__PURE__ */ jsx(Trash2, { className: "h-4 w-4 text-[var(--color-destructive)]" }) }) })
        ] }, m.id)) })
      ] }) }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-3 rounded-lg border border-[var(--color-gray-100)] bg-white p-4", children: [
        /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold", children: "Tambah Pasar" }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(Label, { children: "Nama" }),
          /* @__PURE__ */ jsx(Input, { value: name, onChange: (e) => setName(e.target.value) })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(Label, { children: "Alamat" }),
          /* @__PURE__ */ jsx(Input, { value: address, onChange: (e) => setAddress(e.target.value) })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(Label, { children: "Kota" }),
          /* @__PURE__ */ jsx(Input, { value: city, onChange: (e) => setCity(e.target.value) })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(Label, { children: "Tipe" }),
          /* @__PURE__ */ jsxs(Select, { value: type, onValueChange: (v) => setType(v), children: [
            /* @__PURE__ */ jsx(SelectTrigger, { children: /* @__PURE__ */ jsx(SelectValue, {}) }),
            /* @__PURE__ */ jsxs(SelectContent, { children: [
              /* @__PURE__ */ jsx(SelectItem, { value: "tradisional", children: "Tradisional" }),
              /* @__PURE__ */ jsx(SelectItem, { value: "modern", children: "Modern" }),
              /* @__PURE__ */ jsx(SelectItem, { value: "swalayan", children: "Swalayan" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(Label, { children: "Jam Operasional" }),
          /* @__PURE__ */ jsx(Input, { value: hours, onChange: (e) => setHours(e.target.value), placeholder: "05:00 - 17:00" })
        ] }),
        /* @__PURE__ */ jsx(Button, { onClick: create, className: "w-full", children: "Simpan" })
      ] })
    ] })
  ] });
}
export {
  AdminMarkets as component
};
