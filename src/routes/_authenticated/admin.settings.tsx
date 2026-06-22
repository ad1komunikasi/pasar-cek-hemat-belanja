import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/admin/settings")({
  component: () => (
    <>
      <h1 className="mb-6 text-3xl font-black">Pengaturan</h1>
      <div className="rounded-lg border border-[var(--color-gray-100)] bg-white p-6">
        <p className="text-sm text-[var(--color-gray-500)]">Pengaturan global aplikasi akan tersedia di iterasi berikutnya.</p>
      </div>
    </>
  ),
});
