"use client";

import { Button, Dropdown, Label } from "@heroui/react";
import { Icon } from "@iconify/react";
import { useAnimate } from "framer-motion";
import Image from "next/image";
import { useExport } from "#/hooks/useExport";
import { useLogo } from "#/hooks/useLogo";
import { trackEvent } from "#/lib/analytics";
import { getRandomLogoVisual } from "#/lib/randomizeLogo";
import { useLogoStore } from "#/store/logoStore";

export function MobileTopBar() {
  const { exportSvg, exportPng, exportIco } = useExport();
  const { set } = useLogo();
  const currentIconName = useLogoStore((s) => s.present.iconName);
  const selectedIconPrefix = useLogoStore((s) => s.selectedIconPrefix);
  const [scope, animate] = useAnimate();

  const handleAction = (key: React.Key) => {
    if (key === "svg") exportSvg();
    else if (key === "png") exportPng();
    else if (key === "ico") exportIco();
  };

  const handleRandomize = async () => {
    void animate(
      scope.current,
      { rotate: [0, 360] },
      { duration: 0.35, ease: "easeOut" },
    );
    trackEvent("randomize logo");
    const next = await getRandomLogoVisual(selectedIconPrefix, currentIconName);
    set((d) => {
      d.iconName = next.iconName;
      d.background = next.background;
      d.iconColor = next.iconColor;
    });
  };

  return (
    <div className="fixed top-0 inset-x-0 z-50 flex items-center justify-between px-4 pt-4 md:hidden">
      <Image
        src="/logo512.png"
        alt="svglogo.dev"
        width={40}
        height={40}
        className="rounded-xl"
      />
      <div className="flex items-center gap-2">
        <Button
          isIconOnly
          size="sm"
          variant="ghost"
          aria-label="Randomize"
          onPress={handleRandomize}
        >
          <span ref={scope} style={{ display: "inline-flex" }}>
            <Icon icon="lucide:dice-5" width={16} height={16} />
          </span>
        </Button>
        <Dropdown>
          <Button size="sm" variant="primary" aria-label="Export">
            Export
          </Button>
          <Dropdown.Popover placement="bottom start" className="w-52">
            <Dropdown.Menu onAction={handleAction}>
              <Dropdown.Item id="svg">
                <Label>SVG</Label>
              </Dropdown.Item>
              <Dropdown.Item id="png">
                <Label>PNG</Label>
              </Dropdown.Item>
              <Dropdown.Item id="ico">
                <Label>ICO (48px)</Label>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown.Popover>
        </Dropdown>
      </div>
    </div>
  );
}
