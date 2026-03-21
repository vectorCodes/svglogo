import { Icon } from "@iconify/react";
import { LogoThumbnail } from "../LogoThumbnail";

const SYSTEM_APPS = [
  { name: "FaceTime", color: "#34C759", icon: "cbi:iosfacetime" },
  { name: "Safari", color: "transparent", icon: "logos:safari" },
  { name: "Telegram", color: "transparent", icon: "logos:telegram" },
];

const DOCK_APPS = [
  { color: "#34C759", icon: "ri:phone-fill" },
  { color: "transparent", icon: "logos:whatsapp-icon" },
  { color: "transparent", icon: "skill-icons:instagram" },
  { color: "transparent", icon: "logos:spotify-icon" },
];

export function IOSHomeScreenMockup() {
  return (
    <div className="overflow-hidden rounded-2xl bg-gradient-to-b from-[#1c1c2e] to-[#2c2c3e] px-5 pt-4 pb-3 shadow-sm">
      {/* App grid — single row */}
      <div className="grid grid-cols-4 gap-x-4 px-1">
        <div className="flex flex-col items-center gap-1">
          <LogoThumbnail size={52} shape="squircle" />
          <span className="text-[8px] text-white/70 truncate max-w-[52px]">Your App</span>
        </div>
        {SYSTEM_APPS.map((app) => (
          <div key={app.name} className="flex flex-col items-center gap-1">
            <div
              className="size-[52px] rounded-[22%] flex items-center justify-center overflow-hidden"
              style={{ backgroundColor: app.color !== "transparent" ? app.color : undefined }}
            >
              <Icon icon={app.icon} width={app.color === "transparent" ? 52 : 28} height={app.color === "transparent" ? 52 : 28} className={app.color !== "transparent" ? "text-white" : ""} />
            </div>
            <span className="text-[8px] text-white/70">{app.name}</span>
          </div>
        ))}
      </div>

      {/* Dock */}
      <div className="mt-3 rounded-2xl bg-white/10 backdrop-blur-lg px-4 py-2.5">
        <div className="grid grid-cols-4 gap-4">
          {DOCK_APPS.map((app, i) => (
            <div key={i} className="flex items-center justify-center">
              <div
                className="size-[48px] rounded-[22%] flex items-center justify-center overflow-hidden"
                style={{ backgroundColor: app.color !== "transparent" ? app.color : undefined }}
              >
                <Icon icon={app.icon} width={app.color === "transparent" ? 48 : 22} height={app.color === "transparent" ? 48 : 22} className={app.color !== "transparent" ? "text-white" : ""} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Home indicator */}
      <div className="flex justify-center mt-2">
        <div className="w-28 h-1 rounded-full bg-white/30" />
      </div>
    </div>
  );
}
