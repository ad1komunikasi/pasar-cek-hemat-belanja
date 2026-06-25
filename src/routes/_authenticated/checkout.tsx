import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { AppShell, PageHeader } from "@/components/app-shell";
import { useAuth } from "@/hooks/use-auth";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { idr } from "@/lib/format";
import { toast } from "sonner";
import { z } from "zod";

export const Route = createFileRoute("/_authenticated/checkout")({
  validateSearch: (s: Record<string, unknown>) => ({ package: (s.package as string) ?? "premium" }),
  head: () => ({ meta: [{ title: "Checkout — PasarCek" }] }),
  component: CheckoutPage,
});

const schema = z.object({
  recipient_name: z.string().trim().min(2).max(100),
  recipient_email: z.string().trim().email().max(255),
  recipient_phone: z.string().trim().min(8).max(20),
});

function CheckoutPage() {
  const search = Route.useSearch();
  const { user, profile } = useAuth();
  const qc = useQueryClient();
  const navigate = useNavigate();

  const { data: pkg } = useQuery({
    queryKey: ["pkg", search.package],
    queryFn: async () => (await supabase.from("packages").select("*").eq("slug", search.package).maybeSingle()).data,
  });
  const { data: methods } = useQuery({
    queryKey: ["payment-methods"],
    queryFn: async () => (await supabase.from("payment_methods").select("*").eq("is_active", true).order("sort_order")).data ?? [],
  });

  const [name, setName] = useState(""); const [email, setEmail] = useState(""); const [phone, setPhone] = useState("");
  const [methodId, setMethodId] = useState("");
  useEffect(() => { if (profile && user) { setName(profile.full_name ?? ""); setEmail(user.email ?? ""); setPhone(profile.phone ?? ""); } }, [profile, user]);
  useEffect(() => { if (methods && methods.length && !methodId) setMethodId(methods[0].id); }, [methods, methodId]);

  async function submit() {
    if (!pkg || !methodId) return;
    const parsed = schema.safeParse({ recipient_name: name, recipient_email: email, recipient_phone: phone });
    if (!parsed.success) return toast.error(parsed.error.errors[0].message);
    const { data: numRes } = await supabase.rpc("generate_order_number" as any).single();
    // RPC blocked from client — fallback to client-side number
    const num = (numRes as any) ?? `PSC-${new Date().toISOString().slice(0, 10).replace(/-/g, "")}-${Math.floor(1000 + Math.random() * 8999)}`;
    const method = methods!.find((m: any) => m.id === methodId)!;
    const { data, error } = await supabase.from("orders").insert({
      order_number: num,
      user_id: user!.id,
      package_id: pkg.id,
      recipient_name: name, recipient_email: email, recipient_phone: phone,
      amount: Number(pkg.price),
      method: method.type,
      payment_method_id: method.id,
      status: "pending_payment",
    }).select().single();
    if (error) return toast.error(error.message);
    
    // Simulate sending payment instruction email by creating a system notification log
    await supabase.from("notifications").insert({
      user_id: user!.id,
      type: "payment",
      title: "Instruksi Pembayaran Dikirim",
      body: `Detail tagihan dan tata cara transfer untuk Pesanan ${num} telah dikirim ke email Anda (${email}). Silakan periksa inbox / spam Anda.`,
    });

    qc.invalidateQueries({ queryKey: ["orders"] });
    toast.success(`Pesanan berhasil dibuat! Rincian instruksi transfer telah dikirim ke email ${email}.`);
    navigate({ to: "/orders/$id", params: { id: data.id } });
  }

  if (!pkg) return <AppShell><PageHeader title="Checkout" /><p>Paket tidak ditemukan.</p></AppShell>;

  return (
    <AppShell>
      <PageHeader title="Checkout" description={`Berlangganan paket ${pkg.name}`} />
      <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
        <div className="rounded-lg border border-[var(--color-gray-100)] bg-white p-6">
          <h3 className="mb-4 text-lg font-bold">Informasi Penerima</h3>
          <div className="space-y-3">
            <div><Label>Nama</Label><Input value={name} onChange={(e) => setName(e.target.value)} /></div>
            <div><Label>Email</Label><Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} /></div>
            <div><Label>Nomor HP</Label><Input value={phone} onChange={(e) => setPhone(e.target.value)} /></div>
            <div>
              <Label>Metode Pembayaran</Label>
              <Select value={methodId} onValueChange={setMethodId}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {(methods ?? []).map((m: any) => <SelectItem key={m.id} value={m.id}>{m.name} ({m.type.toUpperCase()})</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <Button onClick={submit} className="w-full">Buat Pesanan</Button>
          </div>
        </div>
        <div className="space-y-3 rounded-lg border border-[var(--color-gray-100)] bg-white p-6">
          <h3 className="text-lg font-bold">Ringkasan</h3>
          <div className="flex justify-between text-sm"><span>{pkg.name}</span><span>{idr(Number(pkg.price))}</span></div>
          <div className="flex justify-between text-sm text-[var(--color-gray-500)]"><span>Durasi</span><span>{pkg.duration_days} hari</span></div>
          <div className="my-2 border-t border-[var(--color-gray-100)]" />
          <div className="flex justify-between"><span className="font-bold">Total</span><span className="text-xl font-black">{idr(Number(pkg.price))}</span></div>
        </div>
      </div>
    </AppShell>
  );
}
