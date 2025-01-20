import { defineEcConfig } from 'astro-expressive-code'
import { pluginColorChips } from 'expressive-code-color-chips'
import { pluginLineNumbers } from '@expressive-code/plugin-line-numbers'
import { pluginCollapsibleSections } from '@expressive-code/plugin-collapsible-sections'

export default defineEcConfig({
  plugins: [
    pluginLineNumbers(),
    pluginCollapsibleSections(),
    pluginColorChips()
  ],
  frames: {
    showCopyToClipboardButton: true
  },
  themes: ['github-light-default', 'dark-plus'],
  defaultProps: {
    wrap: true,
    preserveIndent: true,
    collapseStyle: 'collapsible-auto',
    overridesByLang: {
      'bash,ps,sh': { preserveIndent: false, wrap: false }
    }
  },
  emitExternalStylesheet: true,
  styleOverrides: {
    borderRadius: '0.375rem',
    codeLineHeight: '1.8',
    codePaddingBlock: '1.2rem',
    codePaddingInline: '1.5rem',
    codeBackground: 'var(--background)',
    uiFontFamily: "'Fira Code', monospace",
    uiFontSize: '0.76rem',
    uiPaddingBlock: '0.312rem',
    borderColor: ({ theme }) => 'transparent',
    inlineButtonForeground: ({ resolveSetting }) =>
      'var(--noticeoklchrelativelight)',
    textMarkers: {
      backgroundOpacity: '40%',
      borderLuminance: '40%'
    },
    frames: {
      //tab
      editorActiveTabBorderColor: ({ resolveSetting }) =>
        resolveSetting('borderColor'),
      editorActiveTabBackground: ({ resolveSetting }) =>
        resolveSetting('codeBackground'),
      editorActiveTabIndicatorBottomColor: ({ resolveSetting }) =>
        'transparent',
      editorTabBarBorderBottomColor: ({ resolveSetting }) =>
        resolveSetting('borderColor'),
      editorTabBarBackground: ({ theme }) => 'var(--code-background)',
      editorActiveTabIndicatorTopColor: ({ theme }) => 'var(--accent)',
      editorTabBarBorderColor: ({ resolveSetting }) => 'var(--code-background)',
      editorActiveTabIndicatorHeight: ({ resolveSetting }) => '0.123rem',
      editorTabsMarginBlockStart: 4,
      editorTabsMarginInlineStart: 4,
      //frame
      editorBackground: ({ resolveSetting }) =>
        resolveSetting('codeBackground'),
      shadowColor: ({ theme, resolveSetting }) => 'transparent',
      frameBoxShadowCssValue: ({ resolveSetting }) =>
        `0 0 0.38rem ${resolveSetting('frames.shadowColor')}`,
      //button
      inlineButtonBackgroundActiveOpacity: 0.3,
      inlineButtonBackgroundHoverOrFocusOpacity: 0.2,
      tooltipSuccessBackground: ({ theme }) => 'var(--accent)'
    }
  },
  useDarkModeMediaQuery: false,
  themeCssSelector: theme => '.dark',
  minSyntaxHighlightingColorContrast: 5.8,
  shiki: {
    bundledLangs: ['astro', 'sass', 'js', 'ts', 'tsx', 'jsx', 'css']
  },
})
