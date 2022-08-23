import React from 'react';
import createUseFieldArgTypes from '../storybook-utils/createUseFieldArgTypes';
import childrenPropArgTypes from '../storybook-utils/childrenPropArgTypes';
import createUseStylesArgTypes from '../storybook-utils/createUseStylesArgTypes';
import RadioButton from './RadioButton';
import styles from './RadioButton.module.scss';

export default {
    title: 'Selector Inputs/RadioButton',
    component: RadioButton,
    argTypes: {
        ...childrenPropArgTypes,
        ...createUseFieldArgTypes({isSelectable: true}),
        ...createUseStylesArgTypes(styles),
    },
};

const Template = args => (
    <RadioButton {...args} />
);

export const DefaultStory = Template.bind({});
DefaultStory.storyName = 'RadioButton';
DefaultStory.args = {
    children: 'Label text',
};
