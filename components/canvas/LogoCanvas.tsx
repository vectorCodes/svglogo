import { Icon } from "@iconify/react";
import { buildBackgroundCss } from "#/lib/canvasUtils";
import { useLogoStore } from "#/store/logoStore";

export function LogoCanvas() {
  const {
    iconName,
    iconColor,
    iconBorderColor,
    iconBorderWidth,
    iconSize,
    background,
    borderRadius,
    borderWidth,
    borderColor,
  } = useLogoStore((s) => s.present);

  const bgStyle = buildBackgroundCss(background);
  const safeIconSize = Number.isFinite(iconSize)
    ? Math.min(90, Math.max(10, iconSize))
    : 60;
  const safeIconBorderWidth = Number.isFinite(iconBorderWidth)
    ? Math.min(24, Math.max(0, iconBorderWidth))
    : 0;
  const iconPx = Math.round((safeIconSize / 100) * 512);

  return (
    <div
      className="relative shrink-0 shadow-2xl shadow-black/50"
      style={{
        width: 512,
        height: 512,
        borderRadius,
        overflow: "hidden",
        ...bgStyle,
        ...(borderWidth > 0
          ? {
              boxShadow: `inset 0 0 0 ${borderWidth}px ${borderColor}, 0 32px 64px rgba(0,0,0,0.5)`,
            }
          : { boxShadow: "0 32px 64px rgba(0,0,0,0.5)" }),
      }}
    >
      {/* SVG filter definition — feMorphology dilate is a single GPU pass,
			    far cheaper than chaining dozens of drop-shadow() filters. */}
      {safeIconBorderWidth > 0 && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          style={{ position: "absolute", width: 0, height: 0 }}
          aria-hidden="true"
        >
          <defs>
            <filter
              id="icon-outline-f"
              x="-50%"
              y="-50%"
              width="200%"
              height="200%"
            >
              <feMorphology
                in="SourceAlpha"
                result="border"
                operator="dilate"
                radius={safeIconBorderWidth}
              />
              <feFlood floodColor={iconBorderColor} result="color" />
              <feComposite
                in="color"
                in2="border"
                operator="in"
                result="coloredBorder"
              />
              <feMerge>
                <feMergeNode in="coloredBorder" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
        </svg>
      )}
      <div className="relative flex h-full w-full items-center justify-center">
        <Icon
          icon={iconName}
          width={iconPx}
          height={iconPx}
          color={iconColor}
          style={{
            display: "block",
            flexShrink: 0,
            filter:
              safeIconBorderWidth > 0 ? "url(#icon-outline-f)" : undefined,
          }}
        />
      </div>
    </div>
  );
}
