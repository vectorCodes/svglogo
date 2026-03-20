import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import {
  EARLY_ACCESS_DISCOUNT,
  LAUNCH_DATE,
  PRICE_ONE_TIME,
  PRICE_ONE_TIME_EARLY,
} from "#/data/creator-plan";
import { ArrowRight } from "@gravity-ui/icons";

const ease = [0.22, 1, 0.36, 1] as const;

const FEATURES: { label: string; free: boolean; creator: boolean }[] = [
  { label: "SVG, PNG, ICO export", free: true, creator: true },
  { label: "300,000+ icons", free: true, creator: true },
  { label: "Multi-stop gradients", free: true, creator: true },
  { label: "Share with a link", free: true, creator: true },
  { label: "Sync Collections", free: true, creator: true },
  { label: "Unlimited advanved export", free: true, creator: true },
  { label: "Brand kit download", free: false, creator: true },
  { label: "Premium fonts & icon sets", free: false, creator: true },
  { label: "Abstract logo generator", free: false, creator: true },
  { label: "Transparent background", free: false, creator: true },
  { label: "Infinite logo variations", free: false, creator: true },
  { label: "Multiple brand presets", free: false, creator: true },
  { label: "Multiple animated logo", free: false, creator: true },
  { label: "Multiple logo effects", free: false, creator: true },
  { label: "Curated color palette", free: false, creator: true },
  { label: "Social media assets export", free: false, creator: true },
  { label: "App Storae & home screen previews", free: false, creator: true },
  { label: "Logo variants (light/dark/transparent)", free: false, creator: true },
  { label: "Priority support + Discord", free: false, creator: true },
];

export function CreatorPricing() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, ease }}
      id="pricing"
      className="max-w-5xl mx-auto px-4 pb-24 scroll-mt-8"
    >
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold mb-3">Simple pricing</h2>
        <p className="text-muted">One-time purchase — pay once, own it forever.</p>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-border">
      <div className="w-[640px] md:w-full bg-surface">
        {/* Header row */}
        <div className="grid grid-cols-3 border-b border-border">
          <div className="p-5 col-span-1">
                <p className="text-sm font-medium text-muted">Features</p>
                <p className="text-xs md:hidden text-muted/60 pt-4">Scroll to the right <ArrowRight className="w-3 h-3 inline" /> </p>
            </div>
          {/* Free */}
          <div className="p-5 border-l border-border flex flex-col gap-1">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-muted/50">Free</p>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-bold">$0</span>
              <span className="text-xs text-muted">forever</span>
            </div>
          </div>
          {/* Creator */}
          <div className="p-5 border-l border-primary/20 bg-primary/[0.03] flex flex-col gap-1 relative">
            <div className="absolute top-3 right-3">
              <span className="text-[10px] font-semibold text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                {EARLY_ACCESS_DISCOUNT * 100}% off
              </span>
            </div>
            <p className="text-[10px] font-semibold uppercase tracking-widest text-muted/50">Creator</p>
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl font-bold tabular-nums">${PRICE_ONE_TIME_EARLY}</span>
              <span className="text-xs text-muted line-through">${PRICE_ONE_TIME}</span>
              <span className="text-xs text-muted">one-time</span>
            </div>
          </div>
        </div>

        {/* Feature rows */}
        {FEATURES.map((f, i) => (
          <div
            key={f.label}
            className={`grid grid-cols-3 ${i < FEATURES.length - 1 ? "border-b border-border" : ""}`}
          >
            <div className="px-5 py-3 flex items-center">
              <span className="text-sm text-muted">{f.label}</span>
            </div>
            <div className="px-5 py-3 border-l border-border flex items-center justify-center">
              {f.free
                ? <Icon icon="lucide:check" width={16} className="text-emerald-500" />
                : <Icon icon="lucide:x" width={14} className="text-muted/30" />
              }
            </div>
            <div className="px-5 py-3 border-l border-primary/20 bg-primary/[0.03] flex items-center justify-center">
              {f.creator
                ? <Icon icon="lucide:check" width={16} className="text-primary" />
                : <Icon icon="lucide:x" width={14} className="text-muted/30" />
              }
            </div>
          </div>
        ))}
      </div>
      </div>

      <p className="text-center text-xs text-muted/60 mt-4">
        Launching {LAUNCH_DATE} · Early access price — pay once, use forever
      </p>
    </motion.section>
  );
}
