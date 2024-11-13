import { Outfit } from 'next/font/google';
import localFont from "next/font/local";
import { Toaster } from "@/components/ui/sonner"
import "./globals.css";

const outfit = Outfit({
  subsets: ['latin'],  
  weight: ['400', '700'], 
});

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${outfit.className} ${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
