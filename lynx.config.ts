import { defineConfig } from '@lynx-js/rspeedy'

import { pluginQRCode } from '@lynx-js/qrcode-rsbuild-plugin'
import { pluginReactLynx } from '@lynx-js/react-rsbuild-plugin'

// Update entry points to match your project's structure
export default defineConfig({
  environments: {
    lynx: {
      source: {
        entry: {
          main: './src/index.tsx',
          envelope: './src/redenvelope/envelope.tsx',
        },
      },
    },
  },
  output: {
    filename: '[name].lynx.bundle',
  },
  plugins: [
    pluginQRCode({
      schema(url) {
        // We use `?fullscreen=true` to open the page in LynxExplorer in full screen mode
        return `${url}?fullscreen=true`
      },
    }),
    pluginReactLynx(),
  ],
})
