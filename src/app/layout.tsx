import type { Metadata, Viewport } from "next";
import { DM_Sans, Lora } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-dm-sans",
  weight: ["400", "500", "600", "700"],
});

const lora = Lora({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-lora",
  weight: ["600", "700"],
});

export const metadata: Metadata = {
  title: "Haru - Your Day, Revealed",
  description: "Personalized daily guidance combining your personality type with Eastern wisdom",
  keywords: ["MBTI", "personality", "horoscope", "saju", "daily guidance", "self-discovery"],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  viewportFit: "cover",
  themeColor: "#f5f3ef",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${dmSans.variable} ${lora.variable}`}>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Gowun+Batang:wght@700&display=swap"
          rel="stylesheet"
        />
        {/* iOS PWA / Capacitor WebView */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      </head>
      <body className="font-sans">{children}</body>
    </html>
  );
}
