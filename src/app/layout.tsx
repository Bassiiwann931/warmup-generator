import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Email Warmup Strategy Generator",
  description:
    "AI-powered email warmup strategy generator for email deliverability professionals",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-sans">{children}</body>
    </html>
  );
}
