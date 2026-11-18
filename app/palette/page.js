"use client";

import { useMemo, useState } from "react";

function clamp(value) {
  return Math.max(0, Math.min(255, Math.round(value)));
}

function hslToHex(h, s, l) {
  const sat = s / 100;
  const light = l / 100;
  const c = (1 - Math.abs(2 * light - 1)) * sat;
  const hp = h / 60;
  const x = c * (1 - Math.abs((hp % 2) - 1));
  let r = 0;
  let g = 0;
  let b = 0;
  if (hp < 1) [r, g, b] = [c, x, 0];
  else if (hp < 2) [r, g, b] = [x, c, 0];
  else if (hp < 3) [r, g, b] = [0, c, x];
  else if (hp < 4) [r, g, b] = [0, x, c];
  else if (hp < 5) [r, g, b] = [x, 0, c];
  else [r, g, b] = [c, 0, x];
  const m = light - c / 2;
  const hex = [r, g, b]
    .map((channel) => clamp((channel + m) * 255).toString(16).padStart(2, "0"))
    .join("");
  return `#${hex}`;
}

export default function PalettePage() {
  const [hue, setHue] = useState(18);
  const [sat, setSat] = useState(78);
  const [light, setLight] = useState(52);
  const [copied, setCopied] = useState("");

  const colors = useMemo(() => {
    const main = hslToHex(hue, sat, light);
    return [
      { name: "主色", hex: main },
      { name: "邻近", hex: hslToHex((hue + 28) % 360, sat, light) },
      { name: "互补", hex: hslToHex((hue + 180) % 360, sat, Math.min(light, 62)) },
      { name: "深色", hex: hslToHex(hue, Math.min(sat + 8, 100), Math.max(light - 24, 12)) },
    ];
  }, [hue, sat, light]);

  async function copy(hex) {
    try {
      await navigator.clipboard.writeText(hex);
      setCopied(hex);
    } catch {
      setCopied("");
    }
  }

  return (
    <section className="stack">
      <div className="page-head">
        <p className="kicker">01 调色板</p>
        <h1>拖一下，颜色就出来。</h1>
      </div>
      <div className="panel stack">
        <div
          className="preview"
          style={{ background: colors[0].hex }}
        >
          <strong>{colors[0].hex}</strong>
        </div>
        <label className="slider">
          色相 {hue}
          <input
            type="range"
            min="0"
            max="360"
            value={hue}
            onChange={(event) => setHue(Number(event.target.value))}
          />
        </label>
        <label className="slider">
          饱和度 {sat}
          <input
            type="range"
            min="0"
            max="100"
            value={sat}
            onChange={(event) => setSat(Number(event.target.value))}
          />
        </label>
        <label className="slider">
          明度 {light}
          <input
            type="range"
            min="8"
            max="92"
            value={light}
            onChange={(event) => setLight(Number(event.target.value))}
          />
        </label>
        <div className="swatches">
          {colors.map((color) => (
            <button
              className="swatch-card"
              key={color.name}
              style={{ background: color.hex }}
              onClick={() => copy(color.hex)}
              type="button"
            >
              <small>
                {color.name} {color.hex}
                {copied === color.hex ? " 已复制" : ""}
              </small>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
