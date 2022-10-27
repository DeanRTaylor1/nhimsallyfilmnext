import "../styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import Layout from "../Components/Layout/Layout";

export default function App({ Component, pageProps, ...appProps }: AppProps) {
  const getContent = () => {
    if (appProps.router.pathname.includes(`/admin`))
      return <Component {...pageProps} />;

    return (
      <Layout>
        <Head>
          <title>NhimSallyFilm</title>
          <meta name="description" content="Film By @NhimSally.Film" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Component {...pageProps} />
      </Layout>
    );
  };
  return getContent();
}
