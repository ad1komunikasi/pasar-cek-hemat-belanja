import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell, PageHeader, EmptyState, Section } from "@/components/app-shell";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/favorites")({
  head: () => ({ meta: [{ title: "Favorit — PasarCek" }] }),
  component: FavoritesPage,
});

function FavoritesPage() {
  const { user } = useAuth();
  const qc = useQueryClient();

  const { data: products } = useQuery({
    queryKey: ["fav-products", user?.id],
    queryFn: async () => (await supabase.from("favorites_products").select("id, product:products(id,name,category,unit)").eq("user_id", user!.id)).data ?? [],
  });
  const { data: markets } = useQuery({
    queryKey: ["fav-markets", user?.id],
    queryFn: async () => (await supabase.from("favorites_markets").select("id, market:markets(id,name,city,address)").eq("user_id", user!.id)).data ?? [],
  });

  async function unfavProduct(id: string) {
    await supabase.from("favorites_products").delete().eq("id", id);
    qc.invalidateQueries({ queryKey: ["fav-products"] });
    toast.success("Dihapus dari favorit");
  }
  async function unfavMarket(id: string) {
    await supabase.from("favorites_markets").delete().eq("id", id);
    qc.invalidateQueries({ queryKey: ["fav-markets"] });
  }

  return (
    <AppShell>
      <PageHeader title="Favorit" description="Produk dan pasar yang Anda pantau." />
      <Section title="Produk Favorit">
        {(!products || products.length === 0) ? (
          <EmptyState title="Belum ada produk favorit." description="Tandai produk dari halaman Harga." action={<Button asChild><Link to="/prices">Lihat Harga</Link></Button>} />
        ) : (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((r: any) => (
              <div key={r.id} className="flex items-center justify-between rounded-lg border border-[var(--color-gray-100)] bg-white p-4">
                <div><p className="font-semibold">{r.product.name}</p><p className="text-xs text-[var(--color-gray-500)]">{r.product.category}</p></div>
                <Button size="icon" variant="ghost" onClick={() => unfavProduct(r.id)}><Heart className="h-4 w-4 fill-[var(--color-destructive)] text-[var(--color-destructive)]" /></Button>
              </div>
            ))}
          </div>
        )}
      </Section>
      <Section title="Pasar Favorit">
        {(!markets || markets.length === 0) ? (
          <EmptyState title="Belum ada pasar favorit." description="Tambah dari halaman Pasar." action={<Button asChild><Link to="/markets">Cari Pasar</Link></Button>} />
        ) : (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {markets.map((r: any) => (
              <div key={r.id} className="flex items-center justify-between rounded-lg border border-[var(--color-gray-100)] bg-white p-4">
                <div><p className="font-semibold">{r.market.name}</p><p className="text-xs text-[var(--color-gray-500)]">{r.market.city}</p></div>
                <Button size="icon" variant="ghost" onClick={() => unfavMarket(r.id)}><Heart className="h-4 w-4 fill-[var(--color-destructive)] text-[var(--color-destructive)]" /></Button>
              </div>
            ))}
          </div>
        )}
      </Section>
    </AppShell>
  );
}
