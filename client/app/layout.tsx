import type { Metadata } from "next";
import { Inter } from "next/font/google";
import ThemeRegistry from "@/src/components/ThemeRegistry";
import StoreProvider from "@/src/store/StoreProvider"; // <--- Import this
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "KinderConnect",
  description: "School Management System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <StoreProvider> {/* <--- Wrap Redux here */}
          <ThemeRegistry>
            {children}
          </ThemeRegistry>
        </StoreProvider>
      </body>
    </html>
  );
}