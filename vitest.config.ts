import { defineConfig, UserConfig} from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'happy-dom',
    globals: true,
    browser: {
      provider: 'playwright', // or 'webdriverio'
      enabled: true,
      instances: [
        { browser: 'chromium' },
      ],
    },
    // browser: {
    //   provider: 'playwright',
    //   enabled: true,
    //   headless: true,
    // },
    parallel: true,
  }
} as UserConfig);
