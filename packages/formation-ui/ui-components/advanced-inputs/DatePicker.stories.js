import React from 'react';
import createUseFieldArgTypes from '../storybook-utils/createUseFieldArgTypes';
import textInputArgTypes from '../storybook-utils/textInputArgTypes';
import createUseStylesArgTypes from '../storybook-utils/createUseStylesArgTypes';
import DatePicker from './DatePicker';
import styles from './DatePicker.module.scss';

export default {
    title: 'Text Inputs/DatePicker',
    component: DatePicker,
    argTypes: {
        ...textInputArgTypes,
        ...createUseFieldArgTypes(),
        ...createUseStylesArgTypes(styles),
    },
};

const Template = args => (
    <DatePicker {...args} />
);

export const DefaultStory = Template.bind({});
DefaultStory.storyName = 'DatePicker';
DefaultStory.args = {};
