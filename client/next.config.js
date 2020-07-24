const withPlugins = require('next-compose-plugins')
const withCSS = require('@pytal/next-css')
const withPWA = require('next-pwa')
const defaultCache = require('next-pwa/cache')

module.exports = withPlugins(
  [
    withCSS,
    [
      withPWA, {
        pwa: {
          dest: 'public',
          disable: process.env.NODE_ENV === 'development',
          // don't cache index page to resolve auth state mismatch
          runtimeCaching: [
            { urlPattern: '/', handler: 'NetworkOnly' },
            ...defaultCache
          ]
        }
      }
    ]
  ], {
    target: 'serverless',
    typescript: { ignoreDevErrors: true },
    poweredByHeader: false,
    devIndicators: { buildActivity: true, autoPrerender: false },
    reactStrictMode: false,
    experimental: { reactRefresh: true, modern: true },
    webpack: ( config, { dev } ) => {
      config.module.rules.push({
        test: /.tsx?$/,
        use: [{
          loader: 'linaria/loader',
          options: {
            displayName: dev,
            cacheDirectory: '.linaria',
            extension: '.css'
          }
        }]
      })
      return config
    }
  }
)
