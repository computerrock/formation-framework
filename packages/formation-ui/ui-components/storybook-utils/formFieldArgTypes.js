/**
 * Form field argTypes for Storybook component meta
 *
 */
export default {
    label: {
        name: 'label',
        type: {name: 'string', required: false},
        description: 'Form field label text.',
        table: {
            type: {summary: 'string'},
        },
        control: {
            type: 'text',
        },
    },
    errors: {
        name: 'errors',
        type: {
            name: 'Array',
            elements: [
                {name: 'string'},
            ],
            required: false,
        },
        defaultValue: [],
        description: 'Form field validation errors.',
        table: {
            type: {summary: 'Array<string>'},
        },
        control: {
            type: 'object',
        },
    },
};
