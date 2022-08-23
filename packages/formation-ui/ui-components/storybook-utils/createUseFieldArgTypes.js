/**
 * Creates useField hook (withFieldProps HOC) argTypes for Storybook component meta
 *
 * @param {FieldOptions} fieldOptions
 */
const createUseFieldArgTypes = (fieldOptions = {}) => {
    const {isSelectable, isSelectableGroup, isMultipleChoice} = fieldOptions;
    const fieldHasMultipleChoiceOption = typeof isMultipleChoice === 'boolean' && !isMultipleChoice;

    return {
        name: {
            name: 'name',
            type: {name: 'string', required: false},
            description: 'Field name.',
            table: {
                type: {summary: 'string'},
            },
            control: {
                type: 'text',
            },
        },
        ...(isSelectable && {
            isSelected: {
                name: 'isSelected',
                type: {
                    name: 'union',
                    raw: 'boolean | void',
                    elements: [
                        {name: 'boolean'},
                        {name: 'void'},
                    ],
                },
                defaultValue: undefined,
                description: 'Selected state (controlled).',
                table: {
                    type: {summary: 'boolean'},
                    defaultValue: {summary: 'undefined'},
                },
                control: {
                    type: 'inline-radio',
                    options: [true, false, undefined],
                },
            },
            defaultIsSelected: {
                name: 'defaultIsSelected',
                type: {name: 'boolean', required: false},
                defaultValue: undefined,
                description: 'Default selected state (uncontrolled).',
                table: {
                    type: {summary: 'boolean'},
                    defaultValue: {summary: 'undefined'},
                },
                control: {
                    type: 'inline-radio',
                    options: [true, false, undefined],
                },
            },
        }),
        value: {
            name: 'value',
            type: {name: 'any', required: false},
            ...(isSelectable ? {
                description: 'Field value.',
                table: {
                    type: {summary: 'any'},
                },
            } : {
                description: 'Field value (controlled).',
                table: {
                    type: {summary: 'any'},
                    defaultValue: {summary: 'undefined'},
                },
            }),
            control: {
                type: 'text',
            },
        },
        ...(!isSelectable && {
            defaultValue: {
                name: 'defaultValue',
                type: {name: 'any', required: false},
                description: 'Default value (uncontrolled).',
                table: {
                    type: {summary: 'any'},
                    defaultValue: {summary: 'undefined'},
                },
                control: {
                    type: 'text',
                },
            },
        }),
        isDisabled: {
            name: 'isDisabled',
            type: {
                name: 'boolean',
            },
            description: 'Is field in disabled state.',
            table: {
                type: {summary: 'boolean'},
                defaultValue: {summary: 'false'},
            },
            control: {
                type: 'inline-radio',
                options: [true, false, undefined],
            },
        },
        ...(isSelectableGroup && fieldHasMultipleChoiceOption && {
            isMultipleChoice: {
                name: 'isMultipleChoice',
                type: {
                    name: 'boolean',
                },
                defaultValue: false,
                description: 'Is field multiple choice group.',
                table: {
                    type: {summary: 'boolean'},
                    defaultValue: {summary: 'false'},
                },
                control: {
                    type: 'inline-radio',
                    options: [true, false, undefined],
                },
            },
        }),
        isComposedIn: {
            name: 'isComposedIn',
            type: {
                name: 'boolean',
            },
            description: 'Is field composed in other field.',
            table: {
                type: {summary: 'boolean'},
                defaultValue: {summary: 'false'},
            },
            control: null,
        },
        onChange: {
            name: 'onChange',
            type: {
                name: 'signature',
                type: 'function',
                raw: '<raw-signature>', // TODO
                required: false,
            },
            defaultValue: undefined,
            description: 'On value change callback function.',
            table: {
                type: {summary: 'function signature TODO'},
            },
            control: null,
        },
    };
};

export default createUseFieldArgTypes;
