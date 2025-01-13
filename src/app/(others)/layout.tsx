import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import LeftSideBar from "@/components/LeftSideBar";
import RightSideBar from "@/components/RightSideBar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
    <body
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <div className='flex justify-between max-w-6xl mx-auto'>
        <div className='hidden sm:inline border-r h-screen sticky top-0'>
          <LeftSideBar />
        </div>
        <div className='w-2xl flex-1'>{children}</div>
        <div className='lg:flex-col p-3 h-screen border-l hidden lg:flex w-[24rem]'>
          <RightSideBar />
        </div>
      </div>
    </body>
  </html>
  );
}
