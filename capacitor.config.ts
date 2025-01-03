import type { CapacitorConfig } from '@capacitor/cli'

const config: CapacitorConfig = {
  appId: 'campusquest.spa',
  appName: 'campusquest-spa',
  webDir: 'dist',
  server: {
    url: 'http://localhost:5173/',
    cleartext: true,
  },
}

export default config
