import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter, Noto_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ReactQueryProvider } from "@/lib/providers";
import { Toaster } from "@/components/ui/sonner";

const notoSans = Noto_Sans({
  variable: "--font-noto-sans",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Therassist",
  description: "AI Therapy Assistance",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Manrope:wght@200;300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={`${inter.variable}  ${inter.variable} antialiased`}>
        <ReactQueryProvider>
          {/*TODO: Add props to navbar (maybe) for checking which version of navbar (authenticated or default) to show. */}
          <Navbar />
          <div className="relative flex h-auto min-h-screen w-full flex-col bg-white">
            {children}
          </div>
          <Footer />
          <Toaster />
        </ReactQueryProvider>
      </body>
    </html>
  );
}
