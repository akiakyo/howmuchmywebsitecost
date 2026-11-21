import { ImageResponse } from "next/og";

export const dynamic = "force-static";
export const size ={ width: 180, height: 180 };
export const contentType = "image/png";

// home-screen icon: the same window + equals mark, light on dark (iOS rounds the corners)
export default function AppleIcon() {
  const ink = "#f5f5f4";
  const bg = "#0c0c0d";
  const bar = { width: 45, height: 13, borderRadius: 7, background: bg };
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", background: bg, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ width: 112, height: 112, display: "flex", flexDirection: "column" }}>
          <div style={{ height: 31, background: ink, borderRadius: "28px 28px 0 0" }} />
          <div
            style={{
              marginTop: 11,
              height: 70,
              background: ink,
              borderRadius: "0 0 28px 28px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              paddingTop: 18,
              gap: 11,
            }}
          >
            <div style={bar} />
            <div style={bar} />
          </div>
        </div>
      </div>
    ),
    size
  );
}
