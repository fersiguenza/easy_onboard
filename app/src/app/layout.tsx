import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

const appName = process.env.NEXT_PUBLIC_APP_NAME || "Easy Onboard";
const companyName = process.env.NEXT_PUBLIC_COMPANY_NAME || "Your Company";

export const metadata: Metadata = {
  title: `${appName} - Onboarding Tool`,
  description: `A simple and effective onboarding tool for ${companyName}. Upload markdown files, track progress, and onboard new team members efficiently.`,
  keywords: "onboarding, team, markdown, progress tracking, training",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}
