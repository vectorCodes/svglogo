"use client";

import dynamic from "next/dynamic";
import { type Variants, motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { CollectionsButton } from "#/components/CollectionsButton";
import EditorPage from "#/components/EditorPage";
import FABs from "#/components/FABs";
import { ShareButton } from "#/components/ShareButton";
import UpdatesFab from "#/components/UpdatesFab";
import { MobileTopBar } from "#/components/MobileTopBar";
import type { AppNotification } from "#/lib/notifications";
import { type LogoState, useLogoStore } from "#/store/logoStore";

const OnboardingTour = dynamic(() => import("#/components/OnboardingTour"), {
  ssr: false,
});

export default function DesktopAppShell({
  notification,
  sharedLogo,
}: {
  notification: AppNotification | null;
  sharedLogo?: LogoState | null;
}) {
  const set = useLogoStore((s) => s.set);
  const initialized = useRef(false);

  useEffect(() => {
    if (sharedLogo && !initialized.current) {
      set((d) => {
        Object.assign(d, sharedLogo);
      });
      initialized.current = true;
    }
  }, [sharedLogo, set]);

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
        <OnboardingTour />
        <FABs />
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="absolute bottom-6 right-6 z-50 flex flex-col gap-2 items-end"
        >
          <motion.div variants={itemVariants}>
            <ShareButton />
          </motion.div>
          <motion.div variants={itemVariants}>
            <CollectionsButton />
          </motion.div>
        </motion.div>
        <UpdatesFab notification={notification} />
      </div>
      <EditorPage />
    </div>
  );
}
