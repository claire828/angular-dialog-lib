const { resolve } = require('path');

/** @type { import('@storybook/angular-vite').StorybookConfig } */
module.exports = {
  stories: ['../src/**/*.@(mdx|stories.@(js|jsx|ts|tsx))'],
  addons: ['@storybook/addon-essentials', '@chromatic-com/storybook'],

  framework: {
    name: '@storybook/angular',
    options: {
      enableIvy: true,
      strictInjectionParameters: true,
      strictTemplates: true,
    },
  },

  core: {
    builder: '@storybook/builder-vite',
    disableTelemetry: true,
  },

  async viteFinal(config) {
    const { mergeConfig } = await import('vite');

    return mergeConfig(config, {
      logLevel: 'info',
      optimizeDeps: {
        include: [
          'storybook-dark-mode',
          '@angular/core',
          '@angular/common',
          '@angular/platform-browser',
          '@angular/platform-browser-dynamic',
          '@angular/forms',
          'zone.js', // Ensure Zone.js is included
        ],
      },
      resolve: {
        alias: {
          '@': '/src',
        },
      },
      define: {
        STORYBOOK_ANGULAR_OPTIONS: JSON.stringify({
          enableIvy: true,
          strictInjectionParameters: true,
          strictTemplates: true,
        }),
      },
    });
  },

  docs: {
    autodocs: true,
  },
};
