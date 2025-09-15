import { Geist, Geist_Mono } from "next/font/google";

import "@furever/ui/globals.css";
import { ThemeProvider } from "./shared/providers/ThemeProvider";
import { HttpProvider } from "./shared/providers/HttpProvider";
import { NextAuthProvider } from "./shared/providers/NextAuthProvider";

const fontSans = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
});

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${fontSans.variable} ${fontMono.variable} font-sans antialiased `}
      >
        <ThemeProvider>
          <HttpProvider>
            <NextAuthProvider>{children}</NextAuthProvider>
          </HttpProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
