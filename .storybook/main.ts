import type { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
  stories: [
    "../stories/**/*.mdx",
    // "../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)",
    "../bpmn-integration-elements/src/**/*.stories.@(js|jsx|ts|tsx)",
    "../bpmn-integration-components/**/**/*.stories.@(js|jsx|ts|tsx)",
    "../bpmn-integration-layouts/**/**/*.stories.@(js|jsx|ts|tsx)",
  ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-onboarding",
    "@storybook/addon-interactions",
    "@storybook/preset-scss",
    //"@storybook/addon-toolbars"
    "storybook-addon-themes",
  ],
  core: {
    builder: '@storybook/builder-vite', // 👈 The builder enabled here.
  },
  typescript: { 
    reactDocgen: 'react-docgen', // 👈 react-docgen configured here.
  },
  framework: {
    name: "@storybook/react-vite",
    options: {
      legacyRootApi: true,
    },
  },
  docs: {
    autodocs: "tag",
  },
  staticDirs: [
    {
      from : "./assets", to : "/assets"
    },
    {
      from: "./public", to: "/"
    }
  ],
  logLevel: 'debug',
};
export default config;
