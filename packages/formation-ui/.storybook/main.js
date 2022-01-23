module.exports = {
    'stories': [
        '../src/**/*.stories.mdx',
        '../src/**/*.stories.@(js|jsx|mjs)',
    ],
    'addons': [
        '@computerrock/storybook-preset-react-app',
        '@storybook/addon-essentials',
        '@storybook/addon-links',
    ],
    'core': {
        'builder': 'webpack5',
    },
};
