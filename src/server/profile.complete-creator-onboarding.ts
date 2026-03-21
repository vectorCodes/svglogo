import { createServerFn } from "@tanstack/react-start";
import { getSupabaseServerClient } from "#/lib/supabase";

export const completeCreatorOnboardingFn = createServerFn({ method: "POST" }).handler(
  async () => {
    const supabase = getSupabaseServerClient();
    const { data } = await supabase.auth.getUser();

    if (!data.user) return;

    await supabase
      .from("profiles")
      .update({ creator_onboarded: true })
      .eq("id", data.user.id);
  },
);
