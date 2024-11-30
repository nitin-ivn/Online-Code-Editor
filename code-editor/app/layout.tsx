import type { Metadata } from "next";
import { ThemeProvider } from "@/context/ThemeContext";
import localFont from "next/font/local";
import "./globals.css";
import Sidebar from "./Sidebar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          <Sidebar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
