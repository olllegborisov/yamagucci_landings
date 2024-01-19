import { Head, Html, Main, NextScript } from 'next/document'
import { FC } from 'react'

/** документ */
const Document: FC = () => (
  <Html lang='ru'>
    <Head>
      {/* favicon */}
      <link
        href='/favicon/favicon.ico'
        rel='shortcut icon'
        type='image/x-icon'
      />
      <link
        href='/favicon/android-chrome-192x192.png'
        rel='icon'
        sizes='192x192'
        type='image/png'
      />
      <link
        href='/favicon/apple-touch-icon.png'
        rel='apple-touch-icon'
        sizes='180x180'
      />
      <link
        href='/favicon/favicon-32x32.png'
        rel='icon'
        sizes='32x32'
        type='image/png'
      />
      <link
        href='/favicon/favicon-16x16.png'
        rel='icon'
        sizes='16x16'
        type='image/png'
      />
      <link
        href='/favicon/site.webmanifest'
        rel='manifest'
      />
      {/* noindex */}
      <meta
        content='nositelinkssearchbox'
        key='sitelinks'
        name='google'
      />
      <meta
        content='notranslate'
        key='notranslate'
        name='google'
      />
      <meta
        content='noindex,nofollow'
        name='googlebot'
      />
      <meta
        content='noindex,nofollow'
        name='robots'
      />
    </Head>
    <body >
      <noscript>
        <div style={{ textAlign: 'center' }}>
          Для полной функциональности этого сайта необходимо включить JavaScript.
          <a
            href='https://www.enable-javascript.com/ru/'
            style={{ color: 'blue', display: 'block', textDecoration: 'underline' }}
          >
            Вот инструкции, как включить JavaScript в вашем браузере
          </a>
          .
        </div>
      </noscript>
      <Main />
      <NextScript />
    </body>
  </Html>
)

// ts-prune-ignore-next
export default Document
