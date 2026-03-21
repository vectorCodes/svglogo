import { getSupabaseServerClient } from "#/lib/supabase";
import { createServerFn } from "@tanstack/react-start";

export const signUpEarlyAccessFn = createServerFn({ method: "POST" }).handler(
  async () => {
    const supabase = getSupabaseServerClient();
    const { data } = await supabase.auth.getUser();

    if (!data.user) return;

    await supabase
      .from("early_access")
      .upsert({ id: data.user.id, status: false });
  },
);
