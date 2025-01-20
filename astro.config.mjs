// @ts-check
import { defineConfig, sharpImageService } from 'astro/config'
import sitemap from '@astrojs/sitemap'
import react from '@astrojs/react'
import compressor from "astro-compressor"
import mdx from '@astrojs/mdx'
import astroExpressiveCode from "astro-expressive-code"

const ReactCompilerConfig = {
  target: '19' // '17' | '18' | '19'
};

// https://astro.build/config
export default defineConfig({
    // site: '',
    // @ts-ignore
    integrations: [sitemap(),
    compressor({ gzip: true, brotli: false }),
    astroExpressiveCode(),
    mdx(),
    react({
      babel: {
        plugins: [
          ["babel-plugin-react-compiler", ReactCompilerConfig],
        ],
      },
    }),
  ],
    image: {
      service: sharpImageService()
    },
    vite: {
      optimizeDeps: {
        include: ['react-compiler-runtime'],
      },
    },
    experimental: {
      responsiveImages: true,
      svg: true,
    },
    prefetch: {
      prefetchAll: true
    },
    markdown: {
      shikiConfig: {
        theme: 'dracula',
        themes: {
          light: 'github-light-default',
          dark: 'dark-plus',
        },
        defaultColor: false,
        wrap: true,
        transformers: [],
      },
      syntaxHighlight: "shiki"
    }
  })
