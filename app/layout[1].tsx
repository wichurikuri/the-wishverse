import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "THE WISHVERSE — An Interactive AU",
  description: "A mysterious fantasy interactive story inspired by the NCT WISH discography.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
