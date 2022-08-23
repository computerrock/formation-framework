import React from 'react';
import createUseFieldArgTypes from '../storybook-utils/createUseFieldArgTypes';
import formFieldArgTypes from '../storybook-utils/formFieldArgTypes';
import TextAreaField from './TextAreaField';
import textAreaArgTypes from "../storybook-utils/textAreaArgTypes";

export default {
    title: 'Text Inputs/TextAreaField',
    component: TextAreaField,
    argTypes: {
        ...textAreaArgTypes,
        ...formFieldArgTypes,
        ...createUseFieldArgTypes(),
    },
};

const Template = args => (
    <TextAreaField {...args} />
);

export const DefaultStory = Template.bind({});
DefaultStory.storyName = 'TextAreaField';
DefaultStory.args = {
    label: 'Textarea field label'
};
