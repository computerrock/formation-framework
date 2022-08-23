/**
 * Text input argTypes for Storybook component meta
 *
 */
export default  {
    placeholder: {
        name: 'placeholder',
        type: {name: 'string', required: false},
        description: 'Placeholder text.',
        table: {
            type: {summary: 'string'},
        },
        control: {
            type: 'text',
        },
    },
    isAutoCompleteOff: {
        name: 'isAutoCompleteOff',
        type: {
            name: 'boolean',
        },
        description: `Is field's autocomplete off.`,
        table: {
            type: {summary: 'boolean'},
            defaultValue: {summary: 'false'},
        },
        control: {
            type: 'inline-radio',
            options: [true, false, undefined],
        },
    },
    // TODO move to form validation related configuration
    isRequired: {
        name: 'isRequired',
        type: {
            name: 'boolean',
        },
        description: 'Is field required.',
        table: {
            type: {summary: 'boolean'},
            defaultValue: {summary: 'false'},
        },
        control: {
            type: 'inline-radio',
            options: [true, false, undefined],
        },
    },
};
