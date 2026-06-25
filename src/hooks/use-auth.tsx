import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { User, Session } from "@supabase/supabase-js";

type Role = "customer" | "premium" | "admin" | "super_admin";
type Profile = { id: string; full_name: string | null; username: string | null; email: string | null; phone: string | null; city: string | null; avatar_url: string | null };

type AuthCtx = {
  user: User | null;
  session: Session | null;
  profile: Profile | null;
  roles: Role[];
  isAdmin: boolean;
  loading: boolean;
  refresh: () => Promise<void>;
};

const Ctx = createContext<AuthCtx>({
  user: null, session: null, profile: null, roles: [], isAdmin: false, loading: true, refresh: async () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState(true);

  async function loadExtras(uid: string, uemail?: string, umeta?: any) {
    let [{ data: p }, { data: r }] = await Promise.all([
      supabase.from("profiles").select("*").eq("id", uid).maybeSingle(),
      supabase.from("user_roles").select("role").eq("user_id", uid),
    ]);
    if (!p && uid) {
      const newProfile = {
        id: uid,
        email: uemail || null,
        full_name: umeta?.full_name || umeta?.name || null,
        avatar_url: umeta?.avatar_url || umeta?.picture || null,
      };
      const { data } = await supabase.from("profiles").upsert(newProfile).select().maybeSingle();
      if (data) p = data;
    }
    setProfile((p as Profile) ?? null);
    setRoles(((r as { role: Role }[]) ?? []).map((x) => x.role));
  }

  async function refresh() {
    const { data } = await supabase.auth.getSession();
    setSession(data.session);
    setUser(data.session?.user ?? null);
    if (data.session?.user) await loadExtras(data.session.user.id, data.session.user.email, data.session.user.user_metadata);
    else { setProfile(null); setRoles([]); }
  }

  useEffect(() => {
    let mounted = true;
    supabase.auth.getSession().then(({ data }) => {
      if (!mounted) return;
      setSession(data.session);
      setUser(data.session?.user ?? null);
      if (data.session?.user) loadExtras(data.session.user.id, data.session.user.email, data.session.user.user_metadata).finally(() => setLoading(false));
      else setLoading(false);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((event, sess) => {
      if (event !== "SIGNED_IN" && event !== "SIGNED_OUT" && event !== "USER_UPDATED") return;
      setSession(sess);
      setUser(sess?.user ?? null);
      if (sess?.user) {
        setTimeout(() => loadExtras(sess.user.id, sess.user.email, sess.user.user_metadata), 0);
      } else {
        setProfile(null);
        setRoles([]);
      }
    });
    return () => { mounted = false; sub.subscription.unsubscribe(); };
  }, []);

  const isAdmin = roles.includes("admin") || roles.includes("super_admin");
  return <Ctx.Provider value={{ user, session, profile, roles, isAdmin, loading, refresh }}>{children}</Ctx.Provider>;
}

export const useAuth = () => useContext(Ctx);
