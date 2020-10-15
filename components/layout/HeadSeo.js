import React from 'react';
import Head from 'next/head';

const HeadSeo = ({ title }) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta
        name="description"
        content="Lite Hunt website made with MERN by @alvlinarez."
      />
      {/*<link rel="preconnect" href="http://localhost:5000" />*/}
      <link rel="preconnect" href="https://hunt.alvlinarez.dev/hunt-server" />
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css"
        integrity="sha256-l85OmPOjvil/SOvVt3HnSSjzF1TUMyT9eV0c2BzEGzU="
        crossOrigin="anonymous"
        media="normalize"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=PT+Sans:ital,wght@0,400;1,700&family=Roboto+Slab:wght@400;700&display=swap"
        rel="stylesheet"
        media="font"
      />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
};

export default HeadSeo;
