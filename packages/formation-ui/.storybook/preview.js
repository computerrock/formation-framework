import '../src/index.module.scss';

export const parameters = {
    actions: {argTypesRegex: '^on[A-Z].*'},
    controls: {
        matchers: {
            color: /(background|color)$/i,
            date: /Date$/,
        },
        expanded: true,
    },
    viewMode: 'docs',
    previewTabs: {
        'storybook/docs/panel': {index: -1},
    },
    options: {
        storySort: {
            order: [
                'Overlays',
            ],
        },
    },
    docs: {
        transformSource: src => {
            // removes library wide HOCs applied to component from 'Show Code' docs feature
            src = src.replace(/withStyles\((.*?)\)/g, '$1');
            src = src.replace(/withFormContext\((.*?)\)/g, '$1');
            src = src.replace(/withDropDownProvider\((.*?)\)/g, '$1');

            return src;
        },
    },
};
