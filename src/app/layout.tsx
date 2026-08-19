import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Better Design Internal Tools",
  description: "Reusable internal tool flows built with Better Design MCP.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
