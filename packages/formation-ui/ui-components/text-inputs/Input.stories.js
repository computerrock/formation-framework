import React from 'react';
import createUseFieldArgTypes from '../storybook-utils/createUseFieldArgTypes';
import textInputArgTypes from '../storybook-utils/textInputArgTypes';
import createUseStylesArgTypes from '../storybook-utils/createUseStylesArgTypes';
import Input from './Input';
import styles from './Input.module.scss';

export default {
    title: 'Text Inputs/Input',
    component: Input,
    argTypes: {
        ...textInputArgTypes,
        ...createUseFieldArgTypes(),
        ...createUseStylesArgTypes(styles),
    },
};

const Template = args => (
    <Input {...args} />
);

export const DefaultStory = Template.bind({});
DefaultStory.storyName = 'Input';
DefaultStory.args = {};
