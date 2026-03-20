import { Button, Tooltip } from "@heroui/react";
import { Icon } from "@iconify/react";
import { motion, type Variants } from "framer-motion";
import { useState } from "react";
import { trackEvent } from "#/lib/analytics";
import { useChangelogStatus } from "#/queries/changelog/use-changelog-status";
import { InfoModal } from "./InfoModal";
import { CreatorPlanButton } from "../creator-plan/CreatorPlanButton";

const X_URL = "https://x.com/monawwarx";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.08 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, x: -24 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: "spring", stiffness: 260, damping: 20 },
  },
};

export function FABs() {
  const [isOpen, setIsOpen] = useState(false);
  const [defaultTab, setDefaultTab] = useState<string | undefined>();
  const [highlightLatest, setHighlightLatest] = useState(false);
  const { hasNew, markSeen } = useChangelogStatus();

  function openInfo() {
    const wasNew = hasNew;
    setDefaultTab(wasNew ? "changelog" : undefined);
    setHighlightLatest(wasNew);
    if (wasNew) markSeen();
    setIsOpen(true);
    trackEvent("open info", {
      tab: wasNew ? "changelog" : "about",
      has_new: wasNew,
    });
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="pointer-events-auto absolute bottom-4 left-4 z-20 flex flex-col items-start gap-2"
    >
      <motion.div variants={itemVariants}>
        <Tooltip delay={0}>
          <Tooltip.Trigger>
            <a href={X_URL} target="_blank" rel="noreferrer" data-umami-event="click x link">
              <Button variant="ghost" isIconOnly aria-label="Follow on X">
                <Icon icon="simple-icons:x" width={12} height={12} />
              </Button>
            </a>
          </Tooltip.Trigger>
          <Tooltip.Content placement="left">
            <p>Follow on X</p>
          </Tooltip.Content>
        </Tooltip>
      </motion.div>

      <motion.div variants={itemVariants}>
        <Tooltip delay={0}>
          <Tooltip.Trigger>
            <Button
              aria-label="Show info"
              onPress={openInfo}
              isIconOnly
              variant="ghost"
              className="relative"
            >
              <Icon icon="lucide:info" width={28} height={28} />
              {hasNew && (
                <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500" />
              )}
            </Button>
          </Tooltip.Trigger>
          <Tooltip.Content placement="left">
            <p>About</p>
          </Tooltip.Content>
        </Tooltip>
      </motion.div>

      <InfoModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        defaultTab={defaultTab}
        highlightLatest={highlightLatest}
      />
    </motion.div>
  );
}
