import Head from 'next/head';
import Script from 'next/script';
import Layout from '@/components/layout/index.jsx';
import "./globals.css";
import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import StoreProvider from "@/lib/StoreProvider.jsx";

export default function MyApp({ Component, pageProps }) {

  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="Increase your online success with professional copyright protection" />
        <link rel="icon" href="/favicon.ico" type="image/x-icon" sizes="186x186" />
        <title>Lock Leaks</title>
      </Head>
      <Script src="https://accounts.google.com/gsi/client" async defer></Script>
      <NextUIProvider>
        <NextThemesProvider attribute="class" defaultTheme="dark">
          <StoreProvider>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </StoreProvider>
        </NextThemesProvider>
      </NextUIProvider>
    </>
  )
}