import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/payment/callback")({
  validateSearch: (search: Record<string, unknown>) => ({
    status: typeof search.status === "string" ? search.status : undefined,
  }),
  beforeLoad: async ({ search }) => {
    if (search.status === "success") {
      throw redirect({ to: "/editor", search: { upgraded: "1" } });
    }
    throw redirect({ to: "/editor" });
  },
});
