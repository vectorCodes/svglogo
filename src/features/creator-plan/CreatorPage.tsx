import { Button } from "@heroui/react";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import { useState } from "react";
import { useEffect, useRef } from "react";
import { ArrowLeft } from "@gravity-ui/icons";
import { GridBackground } from "#/features/editor/GridBackground";
import { LandingFooter } from "#/features/landing/LandingFooter";
import { Card, CardDesc, CardLabel, CardTitle } from "#/features/landing/BentoGrid";
import { LAUNCH_DATE, PRICE_MONTHLY_EARLY, PRICE_MONTHLY_REGULAR } from "#/data/creator-plan";
import { EmailForm } from "./EmailForm";
import { CreatorPricing } from "./CreatorPricing";

const ease = [0.22, 1, 0.36, 1] as const;

// --- Data ---

const SOCIAL_ASSETS = [
  { icon: "simple-icons:x", label: "Twitter / X Banner" },
  { icon: "lucide:globe", label: "Open Graph · 1200×630" },
  { icon: "simple-icons:linkedin", label: "LinkedIn Cover" },
  { icon: "lucide:smartphone", label: "App Store Preview" },
];

const RANDOM_ICONS = [
  "lucide:zap", "lucide:flame", "lucide:rocket", "lucide:star",
  "lucide:heart", "lucide:crown", "lucide:mountain", "lucide:leaf",
  "lucide:globe", "lucide:coffee", "lucide:gem", "lucide:bolt",
];

const RANDOM_COLORS = [
  "#6366f1", "#ec4899", "#f59e0b", "#10b981",
  "#3b82f6", "#ef4444", "#8b5cf6", "#06b6d4",
];

const COMING_FEATURES = [
  { icon: "lucide:layout-template", label: "Logo Presets", desc: "Start from curated styles" },
  { icon: "lucide:shapes", label: "Abstract Logos", desc: "Hundreds of unique shapes" },
  { icon: "lucide:cloud", label: "Sync Collections", desc: "Access your logos anywhere" },
  { icon: "lucide:sparkles", label: "Variations", desc: "Generate logo ideas instantly" },
  { icon: "lucide:type", label: "Premium Fonts", desc: "Exclusive typeface library" },
  { icon: "lucide:swatch-book", label: "Brand Palettes", desc: "Curated color systems" },
];

// --- Animated price counter ---

function AnimatedPrice({ target }: { target: number }) {
  const [display, setDisplay] = useState("8.00");
  const ref = useRef<HTMLSpanElement>(null);
  const triggered = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !triggered.current) {
          triggered.current = true;
          const start = 8;
          const duration = 900;
          const startTime = performance.now();
          const tick = (now: number) => {
            const progress = Math.min((now - startTime) / duration, 1);
            const eased = 1 - (1 - progress) ** 3;
            setDisplay((start + (target - start) * eased).toFixed(2));
            if (progress < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.5 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target]);

  return <span ref={ref}>{display}</span>;
}

// --- Bento cards ---

function PricingCard() {
  return (
    <Card className="col-span-1 md:col-span-2 p-6 flex flex-col justify-between gap-6" delay={0}>
      <div>
        <div className="inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-widest text-muted/50 border border-border rounded-full px-2.5 py-1 mb-4">
          <Icon icon="lucide:calendar" width={10} />
          Launching {LAUNCH_DATE}
        </div>
        <h1 className="text-2xl md:text-4xl font-bold leading-tight mb-2">
          Creator Plan — Early Access
        </h1>
        <p className="text-sm text-muted leading-relaxed max-w-md">
          Social media assets, logo variants, and a full brand kit — everything on top of the free editor.
        </p>
      </div>
      <div className="flex flex-wrap items-end gap-3">
        <div className="flex items-end gap-3 flex-1 min-w-0">
          <span className="text-4xl md:text-5xl font-bold leading-none tabular-nums">
            $<AnimatedPrice target={PRICE_MONTHLY_EARLY} />
          </span>
          <div className="flex flex-col pb-0.5">
            <span className="text-muted line-through text-sm">${PRICE_MONTHLY_REGULAR}</span>
            <span className="text-xs text-muted">per month · early price</span>
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onPress={() => document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth" })}
          className="text-xs text-primary gap-1 shrink-0"
        >
          View pricing
          <Icon icon="lucide:arrow-down" width={11} />
        </Button>
      </div>
    </Card>
  );
}

function FreeStaysCard() {
  return (
    <Card className="col-span-1 p-6 flex flex-col" delay={0.05}>
      <div className="mb-4 flex size-10 items-center justify-center rounded-xl bg-[var(--surface-secondary)]">
        <Icon icon="lucide:shield-check" width={20} className="text-[var(--foreground)]" />
      </div>
      <CardLabel>No catch</CardLabel>
      <CardTitle>Free editor stays free</CardTitle>
      <CardDesc>
        Everything you can do today — design, export, share — stays free with no limits, no watermarks, forever. Creator Plan is purely additive.
      </CardDesc>
      <div className="mt-4 flex items-center gap-1.5 text-xs text-emerald-500 font-medium">
        <Icon icon="lucide:check-circle-2" width={14} />
        No features removed, ever
      </div>
    </Card>
  );
}

function SocialCard() {
  return (
    <Card className="col-span-1 p-6" delay={0.08}>
      <CardLabel>Social Media Assets</CardLabel>
      <CardTitle>Ready for every platform</CardTitle>
      <CardDesc>
        Perfectly sized exports for every surface — no more manual resizing.
      </CardDesc>
      <div className="mt-5 flex flex-col gap-2">
        {SOCIAL_ASSETS.map((a) => (
          <div
            key={a.label}
            className="flex items-center gap-3 rounded-xl border border-border bg-[var(--surface-secondary)] px-3 py-2.5"
          >
            <Icon icon={a.icon} width={14} className="text-muted shrink-0" />
            <span className="text-xs text-muted">{a.label}</span>
          </div>
        ))}
      </div>
    </Card>
  );
}

function VariantsCard() {
  const [icon, setIcon] = useState("lucide:zap");
  const [color, setColor] = useState("#6366f1");

  const randomize = () => {
    setIcon(RANDOM_ICONS[Math.floor(Math.random() * RANDOM_ICONS.length)]);
    setColor(RANDOM_COLORS[Math.floor(Math.random() * RANDOM_COLORS.length)]);
  };

  const variants = [
    { label: "Light", bg: "#ffffff", fg: "#111111" },
    { label: "Dark", bg: "#111111", fg: "#ffffff" },
    { label: "Transparent", bg: "transparent", fg: color, border: true },
    { label: "Icon only", bg: color, fg: "#ffffff" },
  ];

  return (
    <Card className="col-span-1 md:col-span-2 p-6 flex flex-col" delay={0.12}>
      <CardLabel>Logo Variants</CardLabel>
      <CardTitle>One design, every version</CardTitle>
      <CardDesc>
        Light, dark, transparent, icon-only — your full brand kit generated from a single logo.
      </CardDesc>
      <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-2">
        {variants.map((v) => (
          <div key={v.label} className="flex flex-col gap-2">
            <div
              className="h-16 rounded-xl flex items-center justify-center transition-colors duration-300"
              style={{
                background: v.bg === "transparent"
                  ? "repeating-conic-gradient(var(--surface-secondary) 0% 25%, var(--surface) 0% 50%) 0 0 / 12px 12px"
                  : v.bg,
                border: v.border ? "1px solid var(--border)" : undefined,
              }}
            >
              <Icon icon={icon} width={24} style={{ color: v.fg }} />
            </div>
            <p className="text-xs text-center text-muted">{v.label}</p>
          </div>
        ))}
      </div>
      <div className="mt-auto pt-4 flex items-center justify-between">
        <p className="text-xs text-muted/50">Try it — click to see your logo in every variant</p>
        <Button variant="ghost" onPress={randomize} className="gap-1.5 text-xs text-muted" data-umami-event="creator page randomize variant">
          <Icon icon="lucide:shuffle" width={13} />
          Randomize
        </Button>
      </div>
    </Card>
  );
}

function ComingFeaturesCard() {
  return (
    <Card className="col-span-1 md:col-span-2 p-6" delay={0.15}>
      <CardLabel>What's coming</CardLabel>
      <CardTitle>Built for creators</CardTitle>
      <CardDesc>
        Everything being built for Creator Plan — shipped after launch, included in your subscription.
      </CardDesc>
      <div className="mt-5 grid grid-cols-2 sm:grid-cols-3 gap-2">
        {COMING_FEATURES.map((f) => (
          <div
            key={f.label}
            className="flex items-center gap-3 rounded-xl border border-border bg-[var(--surface-secondary)] px-3 py-2.5"
          >
            <Icon icon={f.icon} width={15} className="text-muted shrink-0" />
            <div>
              <p className="text-xs font-medium leading-tight">{f.label}</p>
              <p className="text-[10px] text-muted leading-tight mt-0.5">{f.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

function PrioritySupportCard() {
  return (
    <Card className="col-span-1 p-6 flex flex-col" delay={0.18}>
      <div className="mb-4 flex size-10 items-center justify-center rounded-xl bg-[var(--surface-secondary)]">
        <Icon icon="lucide:headphones" width={20} className="text-[var(--foreground)]" />
      </div>
      <CardLabel>Support</CardLabel>
      <CardTitle>Priority support</CardTitle>
      <CardDesc>
        Skip the queue. Creator members get direct access — feature requests, bugs, and feedback go straight to the top.
      </CardDesc>
      <div className="mt-auto pt-4 flex items-center gap-1.5 text-xs text-[#5865F2] font-medium">
        <Icon icon="simple-icons:discord" width={13} />
        Priority Discord access
      </div>
    </Card>
  );
}

// --- Page sections ---

function CreatorNav() {
  return (
    <div className="max-w-5xl mx-auto px-4 pt-8 flex items-center justify-between">
      <a href="/" className="text-sm text-muted hover:text-foreground transition-colors flex items-center gap-1.5">
        <ArrowLeft />
        SVGLogo.dev
      </a>
      <a href="/editor">
        <Button size="sm" variant="outline">Open Editor</Button>
      </a>
    </div>
  );
}

function CreatorHero() {
  return (
    <section className="flex flex-col items-center text-center px-5 md:px-12 pt-20 md:pt-28 pb-10 max-w-4xl mx-auto">
      <motion.div
        className="flex flex-col items-center gap-6 w-full"
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease }}
      >
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease }}
          className="inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-widest text-muted/50 border border-border rounded-full px-3 py-1"
        >
          <Icon icon="lucide:calendar" width={10} />
          Launching {LAUNCH_DATE}
        </motion.div>

        <motion.h1
          className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight leading-[1.08]"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease }}
        >
          Professional branding.{" "}
          <span className="bg-linear-to-r from-muted via-(--foreground)/80 to-muted bg-clip-text text-transparent">
            Studio speed.
          </span>
        </motion.h1>

        <motion.p
          className="text-lg md:text-xl text-muted max-w-2xl leading-relaxed"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease }}
        >
          Brand kits, social assets, and logo variants built for agencies, indie studios, and serious makers — shipped fast.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.32, ease }}
          className="w-full flex flex-col items-center"
        >
          <EmailForm />
        </motion.div>
      </motion.div>
    </section>
  );
}

function CreatorFeatures() {
  return (
    <section className="max-w-5xl mx-auto px-4 pb-24">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <PricingCard />
        <FreeStaysCard />
        <SocialCard />
        <VariantsCard />
        <ComingFeaturesCard />
        <PrioritySupportCard />
      </div>
    </section>
  );
}

function CreatorSignupCta() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, ease }}
      className="max-w-5xl mx-auto px-4 pb-24"
    >
      <div className="rounded-2xl border border-border bg-surface p-8 md:p-12 text-center flex flex-col items-center gap-6">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold mb-3">Lock in early access</h2>
          <p className="text-muted max-w-md mx-auto">
            Sign up before {LAUNCH_DATE} — your early price is locked in for the first year.
          </p>
        </div>
        <EmailForm />
      </div>
    </motion.section>
  );
}

// --- Page ---

export function CreatorPage() {
  return (
    <div className="relative min-h-screen">
      <GridBackground />
      <div className="relative z-10">
        <CreatorNav />
        <CreatorHero />
        <CreatorFeatures />
        <CreatorPricing />
        <CreatorSignupCta />
        <LandingFooter />
      </div>
    </div>
  );
}
