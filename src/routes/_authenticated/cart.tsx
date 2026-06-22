import { createFileRoute, Link } from "@tanstack/react-router";
import { createFileRoute as _ } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/cart")({
  head: () => ({ meta: [{ title: "Keranjang — PasarCek" }] }),
  component: () => {
    return (
      <div className="p-10 text-center">
        <p>Keranjang belanja menggunakan <Link to="/smart-basket" className="font-bold text-[var(--color-brand-blue)] underline">Smart Basket</Link>.</p>
      </div>
    );
  },
});
