import React from 'react';
import createUseFieldArgTypes from '../storybook-utils/createUseFieldArgTypes';
import textInputArgTypes from '../storybook-utils/textInputArgTypes';
import formFieldArgTypes from '../storybook-utils/formFieldArgTypes';
import createUseStylesArgTypes from '../storybook-utils/createUseStylesArgTypes';
import SearchBox from './SearchBox';
import Option from '../selector-inputs/Option';
import styles from './SearchBox.module.scss';
import decoratorStyles from '../storybook-utils/SearchBoxStories.module.scss';

const {errors, ...formFieldArgTypesWithoutError} = formFieldArgTypes;

export default {
    title: 'Text Inputs/SearchBox',
    component: SearchBox,
    argTypes: {
        onSearchSubmit: {
            name: 'onSearchSubmit',
            type: {
                name: 'signature',
                type: 'function',
                raw: '(value: string) => void',
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
            description: 'On search submit callback function.',
            action: 'onSearchSubmit',
            control: null,
        },
        onOptionSelected: {
            name: 'onOptionSelected',
            type: {
                name: 'signature',
                type: 'function',
                raw: '(value: string) => void',
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
        ...formFieldArgTypesWithoutError,
        ...createUseFieldArgTypes(),
        ...createUseStylesArgTypes(styles),
    },
};

const Template = args => (
    <SearchBox {...args} >
        <Option name="search-option-1" value="option1">Search Option 1</Option>
        <Option name="search-option-2" value="option2">Search Option 2</Option>
        <Option name="search-option-3" value="option3">Search Option 3</Option>
    </SearchBox>
);

export const DefaultStory = Template.bind({});
DefaultStory.storyName = 'SearchBox';
DefaultStory.args = {
    placeholder: 'Mitgliedersuche',
    isDropDownDisabled: false
};

//TODO: In the future, we will create composite component for the header, so we can remove this story
export const InHeaderStory = Template.bind({});
InHeaderStory.storyName = 'SearchBoxInHeader';
InHeaderStory.args = {
    placeholder: 'Mitgliedersuche'
}
InHeaderStory.decorators =[(Story) =>
    <div className={decoratorStyles['search-box-story__decorator-header']}>
        <div className={decoratorStyles['search-box-story__decorator-header-left']}>
            <div>EUA NOTRUF</div>
            <div>Fälle</div>
            <div>Wiedervorlagen</div>
        </div>
        <div className={decoratorStyles['search-box-story__decorator-header-right']}>
            <div>Avatar</div>
            <div>Meldungen</div>
            <Story />
        </div>
    </div>
];
