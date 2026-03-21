import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import { buildBackgroundCss } from "#/domain/logo/logo.svg-builder";
import { generateVariation } from "#/domain/logo/logo.variations";
import { useLogoState } from "#/queries/logo/use-logo-state";
import { useAuth } from "#/queries/auth/use-auth";
import { useInfiniteStore } from "#/store/infinite-store";
import { updateLogo } from "#/commands/logo/update-logo";
import { LAUNCH_DATE } from "#/data/creator-plan";
import type { LogoState } from "#/domain/logo/logo.types";

const TILE_SIZE = 140;
const GAP = 16;
const CELL = TILE_SIZE + GAP;

function useTileCache(base: LogoState) {
  const cacheRef = useRef(new Map<string, LogoState>());
  const baseRef = useRef(base);

  if (baseRef.current !== base) {
    baseRef.current = base;
    cacheRef.current.clear();
  }

  return useCallback((col: number, row: number): LogoState => {
    if (col === 0 && row === 0) return base;

    const key = `${col},${row}`;
    const cached = cacheRef.current.get(key);
    if (cached) return cached;

    const overrides = generateVariation(base, col, row);
    const variant: LogoState = {
      ...base,
      ...overrides,
      iconName: base.iconName,
      borderRadius: base.borderRadius,
      textMode: base.textMode,
      logoText: base.logoText,
      fontFamily: base.fontFamily,
    };
    cacheRef.current.set(key, variant);
    return variant;
  }, [base]);
}

export function InfiniteCanvas() {
  const present = useLogoState();
  const user = useAuth();
  const isCreator = user?.plan === "creator";
  const { panX, panY, zoom, setPan, setZoom } = useInfiniteStore();
  const containerRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef({ dragging: false, startX: 0, startY: 0, startPanX: 0, startPanY: 0, moved: false });
  const getTile = useTileCache(present);

  const [dims, setDims] = useState({ w: window.innerWidth, h: window.innerHeight });
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver((entries) => {
      const { width, height } = entries[0].contentRect;
      setDims({ w: width, h: height });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const visibleTiles = useMemo(() => {
    const { w, h } = dims;
    const scaledCell = CELL * zoom;
    const cols = Math.ceil(w / scaledCell) + 2;
    const rows = Math.ceil(h / scaledCell) + 2;

    const offsetX = panX * zoom + w / 2;
    const offsetY = panY * zoom + h / 2;

    const startCol = Math.floor(-offsetX / scaledCell) - 1;
    const startRow = Math.floor(-offsetY / scaledCell) - 1;

    const tiles: { col: number; row: number; state: LogoState }[] = [];
    for (let r = startRow; r <= startRow + rows; r++) {
      for (let c = startCol; c <= startCol + cols; c++) {
        tiles.push({ col: c, row: r, state: getTile(c, r) });
      }
    }
    return tiles;
  }, [panX, panY, zoom, getTile, dims]);

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    if (e.button !== 0) return;
    dragRef.current = { dragging: true, startX: e.clientX, startY: e.clientY, startPanX: panX, startPanY: panY, moved: false };
  }, [panX, panY]);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!dragRef.current.dragging) return;
    const dx = (e.clientX - dragRef.current.startX) / zoom;
    const dy = (e.clientY - dragRef.current.startY) / zoom;
    if (Math.abs(dx) > 3 || Math.abs(dy) > 3) dragRef.current.moved = true;
    setPan(dragRef.current.startPanX + dx, dragRef.current.startPanY + dy);
  }, [zoom, setPan]);

  const handlePointerUp = useCallback(() => {
    dragRef.current.dragging = false;
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const delta = -e.deltaY * 0.001;
      setZoom(zoom + delta);
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [zoom, setZoom]);

  const toggle = useInfiniteStore((s) => s.toggle);

  const handleSelect = useCallback((state: LogoState) => {
    updateLogo((d) => {
      d.iconColor = state.iconColor;
      d.iconBorderColor = state.iconBorderColor;
      d.iconBorderWidth = state.iconBorderWidth;
      d.iconSize = state.iconSize;
      d.iconRotation = state.iconRotation;
      d.iconOffsetX = state.iconOffsetX;
      d.iconOffsetY = state.iconOffsetY;
      d.background = state.background;
      d.borderWidth = state.borderWidth;
      d.borderColor = state.borderColor;
    });
    toggle();
  }, [toggle]);

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="absolute inset-0 cursor-grab active:cursor-grabbing overflow-hidden z-10 select-none"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      onClickCapture={(e) => { if (dragRef.current.moved) e.stopPropagation(); }}
    >
      {/* Top bar */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 pointer-events-none">
        {!isCreator && (
          <div className="rounded-lg bg-primary/10 border border-primary/20 px-3 py-1.5 text-[11px] font-medium text-primary backdrop-blur-sm">
            Try Infinite Mode free until {LAUNCH_DATE}
          </div>
        )}
        <div className="flex items-center gap-3 rounded-xl bg-surface/80 backdrop-blur-sm border border-border px-3 py-1.5 text-[10px] font-mono text-muted">
          <span>{Math.round(-panX)}, {Math.round(-panY)}</span>
          <span className="text-muted/50">·</span>
          <span>{Math.round(zoom * 100)}%</span>
        </div>
      </div>

      {/* Tile layer */}
      <div
        style={{
          transform: `translate(${panX * zoom}px, ${panY * zoom}px) scale(${zoom})`,
          transformOrigin: "0 0",
          position: "absolute",
          left: "50%",
          top: "50%",
          willChange: "transform",
        }}
      >
        {visibleTiles.map((tile) => (
          <Tile
            key={`${tile.col},${tile.row}`}
            col={tile.col}
            row={tile.row}
            state={tile.state}
            onSelect={() => handleSelect(tile.state)}
          />
        ))}
      </div>
    </motion.div>
  );
}

const Tile = ({ col, row, state, onSelect }: {
  col: number;
  row: number;
  state: LogoState;
  onSelect: () => void;
}) => {
  const bgStyle = buildBackgroundCss(state.background);
  const radius = Math.min(state.borderRadius, TILE_SIZE / 2);
  const x = col * CELL - TILE_SIZE / 2;
  const y = row * CELL - TILE_SIZE / 2;

  return (
    <button
      type="button"
      onClick={(e) => { e.stopPropagation(); onSelect(); }}
      data-umami-event="infinite mode tile select"
      className="absolute transition-transform duration-150 hover:scale-105"
      style={{
        left: x,
        top: y,
        width: TILE_SIZE,
        height: TILE_SIZE,
        borderRadius: radius,
        overflow: "hidden",
        ...bgStyle,
        ...(state.borderWidth > 0
          ? { boxShadow: `inset 0 0 0 ${Math.max(1, state.borderWidth * (TILE_SIZE / 512))}px ${state.borderColor}` }
          : {}),
      }}
    >
      <TileIcon state={state} />
    </button>
  );
};

const TileIcon = ({ state }: { state: LogoState }) => {
  const iconSize = Math.round((state.iconSize / 100) * TILE_SIZE * 0.85);

  if (state.textMode) {
    const fontSize = iconSize * 0.65;
    return (
      <div className="w-full h-full flex items-center justify-center">
        <span
          style={{
            fontFamily: `'${state.fontFamily}', sans-serif`,
            fontSize,
            color: state.iconColor,
            lineHeight: 1,
          }}
        >
          {state.logoText || "Aa"}
        </span>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex items-center justify-center">
      <Icon
        icon={state.iconName}
        width={iconSize}
        height={iconSize}
        style={{
          color: state.iconColor,
          transform: state.iconRotation ? `rotate(${state.iconRotation}deg)` : undefined,
        }}
        className="pointer-events-none"
      />
    </div>
  );
};
