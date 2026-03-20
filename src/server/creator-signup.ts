import { createServerFn } from "@tanstack/react-start";
import { env } from "cloudflare:workers";
export const creatorSignupFn = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => data as { email: string; token: string })
  .handler(async ({ data }) => {
    const { email, token } = data;

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      throw new Error("Invalid email");
    }

    const cfEnv = env;

    if (cfEnv.TURNSTILE_SECRET) {
      const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ secret: cfEnv.TURNSTILE_SECRET, response: token }),
      });
      const result = await res.json<{ success: boolean; "error-codes"?: string[] }>();
      if (!result.success) throw new Error(`Turnstile failed: ${result["error-codes"]?.join(", ")}`);
    }

    if (!cfEnv.CREATOR_EARLY_SIGNUP) throw new Error("KV not configured");

    const key = `email:${email.toLowerCase().trim()}`;
    await cfEnv.CREATOR_EARLY_SIGNUP.put(key, JSON.stringify({ email, signedUpAt: Date.now() }));

    return { ok: true };
  });
