import "~/styles/globals.css";

import { type Metadata } from "next";
import { Roboto_Mono } from "next/font/google";

export const metadata: Metadata = {
  title: "Daniel Sadler",
  description: "Generated by create-t3-app",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
  openGraph: {
    images: "",
  },
};

const mono = Roboto_Mono({ subsets: ["latin"] });
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${mono.className}`}>
      <body>{children}</body>
    </html>
  );
}
