import { type Variants, motion } from "framer-motion";
import { useEffect, useRef } from "react";
import type { LogoState } from "#/domain/logo/logo.types";
import { loadLogoFromState } from "#/commands/logo/load-logo";
import { CollectionsButton } from "#/features/collections/CollectionsButton";
import { CreatorPlanButton } from "#/features/creator-plan/CreatorPlanButton";
import { ShareButton } from "#/features/share/ShareButton";
import { EditorPage } from "./EditorPage";
import { FABs } from "./FABs";
import { MobileTopBar } from "./MobileTopBar";
import { OnboardingTour } from "./OnboardingTour";

export function AppShell({
  sharedLogo,
}: {
  sharedLogo?: LogoState | null;
}) {
  const initialized = useRef(false);

  useEffect(() => {
    if (sharedLogo && !initialized.current) {
      loadLogoFromState(sharedLogo);
      initialized.current = true;
    }
  }, [sharedLogo]);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20,
      },
    },
  };

  return (
    <div className="block">
      <MobileTopBar />

      <div className="hidden md:block">
        <FABs />
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="absolute bottom-4 right-4 z-50 flex flex-col gap-2 items-end"
        >
          <motion.div variants={itemVariants}>
            <ShareButton />
          </motion.div>
          <motion.div variants={itemVariants}>
            <CollectionsButton />
          </motion.div>
          <motion.div variants={itemVariants}>
            <CreatorPlanButton />
          </motion.div>
        </motion.div>
      </div>
      <OnboardingTour />
      <EditorPage />
    </div>
  );
}
