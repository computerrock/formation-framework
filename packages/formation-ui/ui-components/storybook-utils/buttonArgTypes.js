/**
 * Text input argTypes for Storybook component meta
 *
 */
export default  {
    type: {
        name: 'type',
        type: {
            name: 'union',
            raw: `'submit' | 'button' | 'reset'`,
            elements: [
                {name: 'literal', value: 'submit'},
                {name: 'literal', value: 'reset'},
                {name: 'literal', value: 'button'},
            ],
        },
        defaultValue: 'button',
        description: 'Button type.',
        table: {
            type: {summary: `'submit' | 'button' | 'reset'`},
            defaultValue: {summary: 'button'},
        },
        control: {
            type: 'inline-radio',
            options: ['submit', 'button', 'reset'],
        },
    },
    onClick: {
        name: 'onClick',
        type: {
            name: 'signature',
            type: 'function',
            raw: '<raw-signature>', // TODO
            required: false,
        },
        defaultValue: undefined,
        description: 'On click callback function.',
        table: {
            type: {summary: 'function signature TODO'},
        },
        control: null,
    },
};
