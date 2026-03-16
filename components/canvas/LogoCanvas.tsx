import { useEffect, useRef, useState } from "react";
import {
  buildBackgroundCss,
  buildCanvasSvgSync,
  fetchIconSvgs,
  type IconSvgCache,
} from "#/lib/canvasUtils";
import { useLogoStore } from "#/store/logoStore";

export function LogoCanvas() {
  const present = useLogoStore((s) => s.present);
  const [svg, setSvg] = useState<string>("");
  const cacheRef = useRef<IconSvgCache | null>(null);

  const bgStyle = buildBackgroundCss(present.background);

  // Fetch icon SVGs only when the icon identity fields change
  useEffect(() => {
    let cancelled = false;

    fetchIconSvgs(present).then((cache) => {
      if (cancelled) return;
      cacheRef.current = cache;
      setSvg(buildCanvasSvgSync(present, cache, 512));
    });

    return () => {
      cancelled = true;
    };
  }, [present.iconName, present.iconColor, present.iconBorderColor, present.iconBorderWidth]);

  // Rebuild synchronously from cache when only layout/transform props change
  useEffect(() => {
    if (!cacheRef.current) return;
    setSvg(buildCanvasSvgSync(present, cacheRef.current, 512));
  }, [
    present.iconSize,
    present.iconRotation,
    present.background,
    present.borderRadius,
    present.borderWidth,
    present.borderColor,
  ]);

  return (
    <div
      className="relative shrink-0 shadow-2xl shadow-black/50"
      data-tour="canvas"
      style={{
        width: 512,
        height: 512,
        borderRadius: present.borderRadius,
        overflow: "hidden",
        ...bgStyle,
        ...(present.borderWidth > 0
          ? {
              boxShadow: `inset 0 0 0 ${present.borderWidth}px ${present.borderColor}, 0 32px 64px rgba(0,0,0,0.5)`,
            }
          : { boxShadow: "0 32px 64px rgba(0,0,0,0.5)" }),
      }}
      // biome-ignore lint/security/noDangerouslySetInnerHtml: we need this for rendering the SVG
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}
