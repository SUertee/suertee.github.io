// app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "Harry Xu | Portfolio",
  description:
    "Personal portfolio website of Harry Xu, a software developer focusing on Java, web, and AI.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-black text-neutral-50 antialiased">
        <Providers>
          <Navbar />
          <main className="mx-auto max-w-6xl px-4 pt-20">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
