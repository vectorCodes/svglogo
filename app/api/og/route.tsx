import { readFileSync } from "node:fs";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { fetchIconSvg } from "#/lib/iconifyCache";
import { getIconOutlineOffsets } from "#/lib/iconOutline";
import { redis } from "#/lib/redis";
import type { LogoState } from "#/store/logoStore";

const appLogoDataUri = `data:image/png;base64,${readFileSync(
  join(process.cwd(), "public/logo192.png"),
).toString("base64")}`;


export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("s");

    if (!id) {
      return new Response("No ID provided", { status: 400 });
    }

    const data = await redis.get(`share:${id}`);
    if (!data) {
      return new Response("Not Found", { status: 404 });
    }

    const logo = JSON.parse(data) as LogoState;

    // Build background CSS
    const bgStyle: any = {};
    if (logo.background.type === "solid") {
      bgStyle.backgroundColor = logo.background.color;
    } else {
      const { direction, stops } = logo.background;
      bgStyle.backgroundImage = `linear-gradient(${direction}deg, ${stops[0].color}, ${stops[1].color})`;
    }

    // Icon handling: Fetch the icon SVG from Iconify API
    const [prefix, name] = logo.iconName.split(":");
    const size = 420; // Size of the logo card in the OG image
    const iconPx = Math.round((logo.iconSize / 100) * size);

    // Scale border width to the OG card size (original is based on 512px)
    const scaledIconBorderWidth = (logo.iconBorderWidth / 512) * size;
    const iconOutlineOffsets = getIconOutlineOffsets(scaledIconBorderWidth);

    const [iconSvg, borderSvg] = await Promise.all([
      fetchIconSvg(prefix, name, logo.iconColor, iconPx),
      iconOutlineOffsets.length > 0
        ? fetchIconSvg(prefix, name, logo.iconBorderColor, iconPx)
        : Promise.resolve(""),
    ]);

    const iconDataUri = `data:image/svg+xml;base64,${Buffer.from(iconSvg).toString("base64")}`;
    const borderDataUri = borderSvg
      ? `data:image/svg+xml;base64,${Buffer.from(borderSvg).toString("base64")}`
      : "";

    return new ImageResponse(
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#f8fafc",
          backgroundImage: "linear-gradient(to bottom, #f8fafc, #eef2ff)",
        }}
      >
        {/* Main Content Area */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            flex: 1,
            marginTop: "40px",
          }}
        >
          {/* White Floating Card */}
          <div
            style={{
              display: "flex",
              backgroundColor: "#ffffff",
              padding: "32px",
              borderRadius: "48px",
              boxShadow: "0 40px 80px rgba(0,0,0,0.08)",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/* User's Logo Card */}
            <div
              style={{
                display: "flex",
                width: `${size}px`,
                height: `${size}px`,
                borderRadius: `${(logo.borderRadius / 512) * size}px`,
                border:
                  logo.borderWidth > 0
                    ? `${(logo.borderWidth / 512) * size}px solid ${logo.borderColor}`
                    : "none",
                ...bgStyle,
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
              }}
            >
              {/* Border/Outline Layers */}
              {borderDataUri &&
                iconOutlineOffsets.map((offset, i) => (
                  /** biome-ignore lint/performance/noImgElement: need this for og */
                  <img
                    key={`${offset.x}-${offset.y}-${i}`}
                    alt=""
                    src={borderDataUri}
                    style={{
                      position: "absolute",
                      width: `${iconPx}px`,
                      height: `${iconPx}px`,
                      left: `${(size - iconPx) / 2 + offset.x}px`,
                      top: `${(size - iconPx) / 2 + offset.y}px`,
                    }}
                  />
                ))}
              {/* Main Icon */}
              {/** biome-ignore lint/performance/noImgElement: need this for og */}
              <img
                alt="Logo Icon"
                src={iconDataUri}
                style={{
                  position: "absolute",
                  width: `${iconPx}px`,
                  height: `${iconPx}px`,
                  left: `${(size - iconPx) / 2}px`,
                  top: `${(size - iconPx) / 2}px`,
                }}
              />
            </div>
          </div>

          {/* Branding Area (Integrated below the card) */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginTop: "48px",
              gap: "16px",
            }}
          >
            {/** biome-ignore lint/performance/noImgElement: need this for og */}
            <img
              src={appLogoDataUri}
              alt="SVGLogo.dev"
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "12px",
              }}
            />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div
                style={{
                  fontSize: "24px",
                  fontWeight: "bold",
                  color: "#111111",
                }}
              >
                Made with SVGLogo.dev
              </div>
              <div
                style={{
                  fontSize: "16px",
                  color: "#64748b",
                  marginTop: "2px",
                }}
              >
                Create professional logos in seconds
              </div>
            </div>
          </div>
        </div>
      </div>,
      {
        width: 1200,
        height: 675,
        headers: {
          "Cache-Control": "public, max-age=2592000, immutable",
        },
      },
    );
  } catch (e: any) {
    console.error(e.message);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
