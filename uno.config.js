import { defineConfig } from "unocss";
import presetIcons from "@unocss/preset-icons";
import presetMini from "@unocss/preset-mini";
import presetWebFonts from "@unocss/preset-web-fonts";

export default defineConfig({
  content: {
    filesystem: ["**/*.{html,js,vue}"],
  },
  presets: [
    presetMini(),
    presetIcons(),
    presetWebFonts({ provider: "bunny", fonts: { name: "Bebas Neue" } }),
  ],
});
