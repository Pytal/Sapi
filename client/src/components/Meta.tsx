import Head from 'next/head'

export const Meta = () => (
  <Head>
    <meta name='viewport' content='width=device-width, initial-scale=1.0, maximum-scale=1.0' />
    <link rel='shortcut icon' href='/assets/favicon.svg' type='image/svg+xml' />
    <link rel='manifest' href='/manifest.json' />
    <meta name='theme-color' content='#F97800' />
    <meta name='mobile-web-app-capable' content='yes' />
    <meta name='apple-mobile-web-app-capable' content='yes' />
    <meta name='apple-mobile-web-app-status-bar-style' content='black-translucent' />
    <link rel='apple-touch-icon' href='/assets/icon-apple-180x180.png' sizes='180x180' type='image/png' />
    <link rel='apple-touch-startup-image' href='/assets/splash-apple-1242x2208.png' />
  </Head>
)
