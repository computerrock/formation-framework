import React from 'react';
import createUseFieldArgTypes from '../storybook-utils/createUseFieldArgTypes';
import textInputArgTypes from '../storybook-utils/textInputArgTypes';
import AutocompleteField from './AutocompleteField';
import formFieldArgTypes from '../storybook-utils/formFieldArgTypes';
import Option from '../selector-inputs/Option';



export default {
    title: 'Text Inputs/AutocompleteField',
    component: AutocompleteField,
    argTypes: {   
        onOptionSelected: {
            name: 'onOptionSelected',
            type: {
                name: 'signature',
                type: 'function',
                raw: '(value: string) => void',
                required: true,
                signature: {
                    arguments: [
                        {
                            name: "value",
                            type: {
                                name: "string"
                            }
                        }
                    ],
                    return: {
                        name: "void"
                    }
                }
            },
            description: 'On option select callback function.',
            action: 'onOptionSelected',
            control: null,
        },
        ...textInputArgTypes,
        ...formFieldArgTypes,
        ...createUseFieldArgTypes(),
    },
};

const Template = args => (
    <AutocompleteField {...args} >
        <Option name="autocomplete-option-1" value="option1">Option 1</Option>
        <Option name="autocomplete-option-2" value="option2">Option 2</Option>
        <Option name="autocomplete-option-3" value="option3">Option 3</Option>
    </AutocompleteField>
);

export const DefaultStory = Template.bind({});
DefaultStory.storyName = 'AutocompleteField';
DefaultStory.args = {
    placeholder: 'default placeholder',
    label: 'default label'
};