import Layout from "@/components/Layout";
import "slick-carousel/slick/slick.css";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Montserrat } from "next/font/google";
import { Provider } from "react-redux";
import { store, persistor } from "@/redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { SessionProvider } from "next-auth/react"

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

export default function App({ Component, pageProps:{session,...pageProps} }: AppProps) {
  return (
    <Provider store={store}>
      <SessionProvider session={session}>
      <PersistGate loading={"loading"} persistor={persistor}>
        <main className={`${montserrat.variable} font-sans`}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </main>
      </PersistGate>
      </SessionProvider>
    </Provider>
  );
}
