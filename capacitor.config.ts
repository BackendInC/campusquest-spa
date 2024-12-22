import type { CapacitorConfig } from '@capacitor/cli'

const config: CapacitorConfig = {
  appId: 'campusquest.spa',
  appName: 'campusquest-spa',
  webDir: 'dist',
  server: {
    url: 'http://192.168.1.6:5173',
    cleartext: true,
  },
}

export default config
