import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'co.kinsider.haru',
  appName: 'Haru',
  webDir: 'out',
  server: {
    url: 'https://haruapp.vercel.app', // live Vercel URL — no static export needed
    cleartext: false,
  },
  ios: {
    contentInset: 'always', // respects safe areas
  },
  plugins: {
    PushNotifications: {
      presentationOptions: ['badge', 'sound', 'alert'],
    },
  },
};

export default config;
