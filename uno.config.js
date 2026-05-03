import { defineConfig } from "unocss";
import presetIcons from "@unocss/preset-icons";
import presetWind3 from "@unocss/preset-wind3";
import presetWebFonts from "@unocss/preset-web-fonts";

export default defineConfig({
  content: {
    filesystem: ["**/*.{html,js,vue}"],
  },
  presets: [
    presetWind3(),
    presetIcons(),
    presetWebFonts({ provider: "bunny", fonts: { name: "Actor" } }),
  ],
});
