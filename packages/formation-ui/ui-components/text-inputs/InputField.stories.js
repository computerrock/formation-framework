import React from 'react';
import createUseFieldArgTypes from '../storybook-utils/createUseFieldArgTypes';
import textInputArgTypes from '../storybook-utils/textInputArgTypes';
import formFieldArgTypes from '../storybook-utils/formFieldArgTypes';
import InputField from './InputField';

export default {
    title: 'Text Inputs/InputField',
    component: InputField,
    argTypes: {
        ...textInputArgTypes,
        ...formFieldArgTypes,
        ...createUseFieldArgTypes(),
    },
};

const Template = args => (
    <InputField {...args} />
);

export const DefaultStory = Template.bind({});
DefaultStory.storyName = 'InputField';
DefaultStory.args = {
    label: 'Field label',
};
