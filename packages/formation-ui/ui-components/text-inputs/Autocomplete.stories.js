import React from 'react';
import createUseFieldArgTypes from '../storybook-utils/createUseFieldArgTypes';
import textInputArgTypes from '../storybook-utils/textInputArgTypes';
import createUseStylesArgTypes from '../storybook-utils/createUseStylesArgTypes';
import Autocomplete from './Autocomplete';
import Option from '../selector-inputs/Option';
import styles from './Autocomplete.module.scss';


export default {
    title: 'Text Inputs/Autocomplete',
    component: Autocomplete,
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
        ...createUseFieldArgTypes(),
        ...createUseStylesArgTypes(styles),
    },
};

const Template = args => (
    <Autocomplete {...args} >
        <Option name="autocomplete-option-1" value="option1">Option 1</Option>
        <Option name="autocomplete-option-2" value="option2">Option 2</Option>
        <Option name="autocomplete-option-3" value="option3">Option 3</Option>
    </Autocomplete>
);

export const DefaultStory = Template.bind({});
DefaultStory.storyName = 'Autocomplete';
DefaultStory.args = {
    placeholder: 'default text',
};