import Head from 'next/head';
import Layout from '../components/layout';
import "./globals.css";
import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

export default function MyApp({ Component, pageProps }) {

  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="Increase your online success with professional copyright protection" />
        <link rel="icon" href="/favicon.ico" type="image/x-icon" sizes="186x186" />
        <title>LockLeaks - Copyright Fixer</title>
      </Head>
      <NextUIProvider>
        <NextThemesProvider attribute="class" defaultTheme="dark">
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </NextThemesProvider>
      </NextUIProvider>
    </>
  )
}