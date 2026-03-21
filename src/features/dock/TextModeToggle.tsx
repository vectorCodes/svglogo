import { Button, Switch, Tooltip } from "@heroui/react";
import { Icon } from "@iconify/react";
import { AnimatePresence, motion } from "framer-motion";
import { updateLogo } from "#/commands/logo/update-logo";
import { trackEvent } from "#/lib/analytics";
import { useLogoStore } from "#/store/logo-store";
import { useInfiniteStore } from "#/store/infinite-store";

export function TextModeToggle() {
  const textMode = useLogoStore((s) => s.present.textMode);
  const infiniteEnabled = useInfiniteStore((s) => s.enabled);
  const toggleInfinite = useInfiniteStore((s) => s.toggle);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
      className="hidden md:block fixed bottom-[4.5rem] left-1/2 z-50 -translate-x-1/2 md:bottom-[4.75rem]"
    >
      <div className="flex flex-col items-center gap-1.5">
        <AnimatePresence>
          {infiniteEnabled && (
            <motion.span
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 6 }}
              transition={{ duration: 0.2 }}
              className="text-[10px] font-medium text-muted tracking-wide uppercase select-none"
            >
              Infinite Mode
            </motion.span>
          )}
        </AnimatePresence>
      <div className="flex items-center gap-3 rounded-xl border border-border bg-surface/90 px-2.5 py-1.5 shadow-lg backdrop-blur-xl">
        <div className="flex items-center gap-2">
          <Switch
            size="sm"
            isSelected={textMode}
            onChange={(checked) => {
              updateLogo((d) => { d.textMode = checked; });
              trackEvent("text mode toggle", { enabled: checked });
            }}
          >
            <Switch.Control>
              <Switch.Thumb />
            </Switch.Control>
          </Switch>
          <span className="text-xs text-muted select-none">Text</span>
        </div>
        <div className="h-4 w-px bg-border" />
        <Tooltip>
          <Tooltip.Trigger tabIndex={-1}>
            <Button
              isIconOnly
              variant={infiniteEnabled ? "primary" : "ghost"}
              size="sm"
              aria-label="Infinite mode"
              onPress={() => {
                toggleInfinite();
                trackEvent("infinite mode toggle", { enabled: !infiniteEnabled });
              }}
              className="size-7"
              data-umami-event="infinite mode toggle"
            >
              <Icon icon="lucide:grid-3x3" width={14} height={14} />
            </Button>
          </Tooltip.Trigger>
          <Tooltip.Content>
            <p className="text-xs">{infiniteEnabled ? "Exit infinite mode" : "Infinite mode"}</p>
          </Tooltip.Content>
        </Tooltip>
      </div>
      </div>
    </motion.div>
  );
}
