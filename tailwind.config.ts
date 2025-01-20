import tailwindcssMotion from "tailwindcss-motion";

export default {
    content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue'],
    darkMode: 'class',
    theme: {
      extend: {
        colors: {

        },
        fontFamily: {

        },
        screens: {
          'sm': '33.75rem',
          'md': '48rem',
          'lg': '68.75rem',
          'xl': '87.5rem',
          '2xl': '96rem',
        },
      }
    },
    plugins: [tailwindcssMotion],
}