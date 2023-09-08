import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DND Scheduler",
  description: "Plan your next DND session.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`flex min-h-screen min-w-[385px] w-full h-full flex-col items-center justify-center bg-brand-purple-dark text-white ${inter.className}`}
      >
        {children}
      </body>
    </html>
  );
}
