import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/_authenticated")({
  ssr: false,
  beforeLoad: async () => {
    const hasAuthParams = typeof window !== "undefined" && (
      window.location.search.includes("code=") ||
      window.location.hash.includes("access_token=") ||
      window.location.hash.includes("refresh_token=") ||
      window.location.hash.includes("error=")
    );

    if (hasAuthParams) {
      for (let i = 0; i < 50; i++) {
        const { data } = await supabase.auth.getSession();
        if (data.session?.user) {
          return { user: data.session.user };
        }
        await new Promise((resolve) => setTimeout(resolve, 100));
      }
    }

    const { data, error } = await supabase.auth.getUser();
    if (error || !data.user) throw redirect({ to: "/auth" });

    if (typeof window !== "undefined") {
      const searchParams = new URLSearchParams(window.location.search);
      const flow = searchParams.get("flow");
      if (flow === "register" && !window.location.pathname.startsWith("/profile")) {
        throw redirect({ to: "/profile", search: { complete: "true" }, replace: true });
      }
    }

    return { user: data.user };
  },
  component: () => <Outlet />,
});
