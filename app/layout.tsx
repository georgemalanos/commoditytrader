import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Commodity Intelligence Terminal",
  description: "Private dashboard for commodity, freight, and macro briefings."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
