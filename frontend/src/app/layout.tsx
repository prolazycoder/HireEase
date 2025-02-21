import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { getServerSession } from "next-auth";
import { NextAuthProvider } from "@/providers/auth-provider";
import { ThemeProvider } from "@/providers/theme-provider";
import { Navbar } from "@/components/Navbar";
import { authOptions } from "@/lib/auth";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "HireEase - Interview Management",
  description: "Streamline your interview process",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>
        <NextAuthProvider>
          <ThemeProvider>
            <Navbar session={session} />
            <main className="pt-16">{children}</main>
          </ThemeProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
}
