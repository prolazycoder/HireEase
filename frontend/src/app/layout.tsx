import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { getServerSession } from "next-auth";
import { NextAuthProvider } from "@/providers/auth-provider";
import { ThemeProvider } from "@/providers/theme-provider";
import { Navbar } from "@/components/common/Navbar";
import { authOptions } from "@/lib/auth";
import "@/styles/globals.css";
import { MUIThemeProvider } from "@/providers/mui-theme-provider";

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
            <MUIThemeProvider>
              <Navbar session={session} />
              <main className="pt-16">{children}</main>
            </MUIThemeProvider>
          </ThemeProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
}
