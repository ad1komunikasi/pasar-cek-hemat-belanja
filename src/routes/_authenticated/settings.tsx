import { createFileRoute } from "@tanstack/react-router";
import { AppShell, PageHeader } from "@/components/app-shell";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { toast } from "sonner";
import { useSettings } from "@/hooks/use-settings-context";

export const Route = createFileRoute("/_authenticated/settings")({
  head: () => ({ meta: [{ title: "Pengaturan — PasarCek" }] }),
  component: SettingsPage,
});

function SettingsPage() {
  const [password, setPassword] = useState("");
  const { theme, setTheme, lang, setLang, t } = useSettings();

  async function changePw() {
    if (password.length < 6) {
      return toast.error(
        lang === "id" ? "Password minimal 6 karakter" : "Password must be at least 6 characters",
      );
    }
    const { error } = await supabase.auth.updateUser({ password });
    if (error) return toast.error(error.message);
    setPassword("");
    toast.success(lang === "id" ? "Password diperbarui" : "Password updated successfully");
  }

  return (
    <AppShell>
      <PageHeader title={t("settings.title")} description={t("settings.subtitle")} />
      <div className="max-w-xl space-y-6">
        {/* Preference Settings Section */}
        <div className="rounded-lg border border-[var(--color-gray-100)] bg-card p-6 shadow-sm">
          <h3 className="text-lg font-bold text-[var(--color-ink)] mb-1">
            {lang === "id" ? "Pengaturan Tampilan & Bahasa" : "Display & Language Settings"}
          </h3>
          <p className="text-xs text-[var(--color-gray-500)] mb-4">
            {lang === "id"
              ? "Atur kenyamanan navigasi dan tampilan aplikasi Anda."
              : "Set your navigation convenience and application display mode."}
          </p>

          <div className="space-y-4">
            {/* Language Selection */}
            <div className="space-y-2">
              <Label className="text-sm font-semibold">{t("settings.langSection")}</Label>
              <p className="text-xs text-[var(--color-gray-500)]">{t("settings.langDesc")}</p>
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant={lang === "id" ? "default" : "outline"}
                  onClick={() => setLang("id")}
                  className="w-full sm:w-auto font-semibold cursor-pointer"
                >
                  Bahasa Indonesia
                </Button>
                <Button
                  type="button"
                  variant={lang === "en" ? "default" : "outline"}
                  onClick={() => setLang("en")}
                  className="w-full sm:w-auto font-semibold cursor-pointer"
                >
                  English
                </Button>
              </div>
            </div>

            <hr className="border-[var(--color-gray-100)] my-2" />

            {/* Theme Selection */}
            <div className="space-y-2">
              <Label className="text-sm font-semibold">{t("settings.themeSection")}</Label>
              <p className="text-xs text-[var(--color-gray-500)]">{t("settings.themeDesc")}</p>
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant={theme === "light" ? "default" : "outline"}
                  onClick={() => setTheme("light")}
                  className="w-full sm:w-auto font-semibold cursor-pointer"
                >
                  {t("common.lightMode")}
                </Button>
                <Button
                  type="button"
                  variant={theme === "dark" ? "default" : "outline"}
                  onClick={() => setTheme("dark")}
                  className="w-full sm:w-auto font-semibold cursor-pointer"
                >
                  {t("common.darkMode")}
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Change Password Section */}
        <div className="rounded-lg border border-[var(--color-gray-100)] bg-card p-6 shadow-sm">
          <h3 className="text-lg font-bold text-[var(--color-ink)]">{t("settings.security")}</h3>
          <div className="mt-3 space-y-3">
            <Label>{lang === "id" ? "Password baru" : "New password"}</Label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              minLength={6}
              className="bg-[var(--color-gray-50)] border-[var(--color-gray-100)]"
            />
            <Button onClick={changePw} className="font-semibold cursor-pointer">
              {lang === "id" ? "Perbarui Password" : "Update Password"}
            </Button>
          </div>
        </div>

        {/* Account Deletion Section */}
        <div className="rounded-lg border border-[var(--color-destructive)] bg-card p-6 shadow-sm">
          <h3 className="text-lg font-bold text-[var(--color-destructive)]">
            {t("settings.deleteAcc")}
          </h3>
          <p className="mt-2 text-sm text-[var(--color-gray-500)]">{t("settings.deleteAccDesc")}</p>
        </div>
      </div>
    </AppShell>
  );
}
