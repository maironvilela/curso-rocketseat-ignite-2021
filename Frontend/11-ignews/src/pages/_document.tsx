import Document, { Head, Html, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
  favIcon = 'https://www.pngrepo.com/png/24760/512/open.png';
  render() {
    return (
      <Html>
        <Head>
          <link rel="shortcut icon" href={this.favIcon} />

          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700;900&display=swap"
            rel="stylesheet"
          />
        </Head>

        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
