import { defineConfig, presetUno } from 'unocss'

export default defineConfig({
  content: {
    filesystem: [
      '**/*.{html,js,vue}',
    ],
  },
  presets: [
    presetUno(),
  ],
})