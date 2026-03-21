import { useUpgradeModalStore } from "#/store/upgrade-modal-store";
import { useCheckoutStore } from "#/store/checkout-store";
import { useAuth } from "#/queries/auth/use-auth";
import { CreatorPlanModal } from "./CreatorPlanModal";
import { CheckoutModal } from "./CheckoutModal";
import { CreatorWelcomeModal } from "./CreatorWelcomeModal";

export function GlobalUpgradeModal() {
  const user = useAuth();
  const isOpen = useUpgradeModalStore((s) => s.isOpen);
  const close = useUpgradeModalStore((s) => s.close);

  const checkoutOpen = useCheckoutStore((s) => s.isOpen);
  const closeCheckout = useCheckoutStore((s) => s.close);

  const needsCreatorOnboarding = user?.plan === "creator" && !user.creatorOnboarded;

  return (
    <>
      <CreatorPlanModal isOpen={isOpen} onClose={close} />
      <CheckoutModal isOpen={checkoutOpen} onClose={closeCheckout} />
      <CreatorWelcomeModal isOpen={!!needsCreatorOnboarding} onClose={() => {}} />
    </>
  );
}
