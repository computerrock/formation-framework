/**
 * TextArea input argTypes for Storybook component meta
 *
 */

export default {
    placeholder: {
        name: 'placeholder',
        type: {name: 'string', required: false},
        description: 'Placeholder text.',
        table: {
            type: {summary: 'string'}
        },
        control: {
            type: 'text',
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
    maxLength: {
        name: 'maxLength',
        type: {name: 'string', required: false},
        description: 'Specifies the maximum number of characters allowed in the text area.',
        table: {
            type: {summary: 'string'}
        },
        control: {
            type: 'text',
        },
    },
    rows: {
        name: 'rows',
        type: {name: 'string', required: false},
        description: 'Specifies the visible number of lines in a text area.',
        table: {
            type: {summary: 'string'}
        },
        control: {
            type: 'text',
        },
    },
    cols: {
        name: 'cols',
        type: {name: 'string', required: false},
        description: 'Specifies the visible width of a text area.',
        table: {
            type: {summary: 'string'}
        },
        control: {
            type: 'text',
        },
    },
    isReadOnly: {
        name: 'isReadOnly',
        type: {name: 'boolean', required: false},
        description: 'Specifies that a text area should be read-only.',
        table: {
            type: {summary: 'boolean'}
        },
        control: {
            type: 'inline-radio',
            options: [true, false, undefined],
        },
    },
    isResizable: {
        name: 'isResizable',
        type: {name: 'boolean', required: false},
        description: 'Specifies if a text area can be resized.',
        table: {
            type: {summary: 'boolean'}
        },
        control: {
            type: 'inline-radio',
            options: [true, false],
        },
    },
}
