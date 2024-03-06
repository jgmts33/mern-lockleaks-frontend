'use client'
// import { NextUIProvider } from "@nextui-org/react";
import { Poppins } from "next/font/google";
import "./globals.css";
import Header from "@/src/components/Header";
import Footer from "@/src/components/Footer";
import { usePathname } from 'next/navigation';
import Link from "next/link";

const poppins = Poppins({ weight: ["300", "500"], subsets: ["latin"] });

export default function RootLayout({ children }) {
  const currentPath = usePathname();

  return (
    <html lang="en">
      <body className={poppins.className + " dark"}>
        <main className="flex items-center flex-col min-h-screen">
          {/* <NextUIProvider> */}
          {
            !currentPath.includes("/auth")
              ?
              <Header />
              :
              <div className='flex items-center justify-between w-full text-large font-semibold h-[80px] px-10'>
                <p className='text-white'>Your Logo</p>
              </div>
          }
          {children}
          {
            !currentPath.includes("/auth")
              ?
              <Footer />
              :
              false
          }
          {/* </NextUIProvider> */}
        </main>
      </body>
    </html>
  );
}
