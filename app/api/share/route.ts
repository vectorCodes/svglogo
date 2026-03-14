import { nanoid } from "nanoid";
import { fetchIconSvg } from "#/lib/iconifyCache";
import { getIconOutlineOffsets } from "#/lib/iconOutline";
import { redis } from "#/lib/redis";
import { NextResponse } from "next/server";
import type { LogoState } from "#/store/logoStore";

export async function POST(req: Request) {
  try {
    const { logoState } = await req.json() as { logoState: LogoState };

    if (!logoState) {
      return NextResponse.json({ error: "No logo state provided" }, { status: 400 });
    }

    const [prefix, name] = logoState.iconName.split(":");
    const size = 420;
    const iconPx = Math.round((logoState.iconSize / 100) * size);
    const scaledIconBorderWidth = (logoState.iconBorderWidth / 512) * size;
    const iconOutlineOffsets = getIconOutlineOffsets(scaledIconBorderWidth);

    // Generate a unique 6-character ID
    const id = nanoid(6);

    // Save state and pre-warm icon SVG cache in parallel
    await Promise.all([
      redis.set(`share:${id}`, JSON.stringify(logoState), "EX", 60 * 60 * 24 * 30),
      fetchIconSvg(prefix, name, logoState.iconColor, iconPx),
      iconOutlineOffsets.length > 0
        ? fetchIconSvg(prefix, name, logoState.iconBorderColor, iconPx)
        : Promise.resolve(""),
    ]);

    return NextResponse.json({ id });
  } catch (error) {
    console.error("Failed to generate share link:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
