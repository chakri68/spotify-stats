import "../styles/globals.css";
import "../styles/sass/mystyles.scss";
import Script from "next/script";
import Head from "next/head";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="apple-mobile-web-app-title" content="Spotify Stats" />
        <meta name="application-name" content="Spotify Stats" />
        <meta name="msapplication-TileColor" content="#337180" />
        <meta name="theme-color" content="#337180"></meta>
      </Head>
      <Component {...pageProps} />
      <Script src="/scripts/ext.js" />
    </>
  );
}

export default MyApp;
