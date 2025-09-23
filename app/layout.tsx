import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter, Noto_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CustomSidebar from "@/components/CustomSidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

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
      <body className={`${inter.variable} ${inter.variable} antialiased`}>
        {/*TODO: Add props to navbar (maybe) for checking which version of navbar (authenticated or default) to show. */}
        <Navbar />
        <div className="relative">
          <SidebarProvider>
            <CustomSidebar />
            <SidebarInset>
              <SidebarTrigger />
              <main>{children}</main>
            </SidebarInset>
          </SidebarProvider>
          <Footer />
        </div>
      </body>
    </html>
  );
}
