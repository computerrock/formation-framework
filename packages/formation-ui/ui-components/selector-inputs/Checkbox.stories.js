import React from 'react';
import createUseFieldArgTypes from '../storybook-utils/createUseFieldArgTypes';
import childrenPropArgTypes from '../storybook-utils/childrenPropArgTypes';
import createUseStylesArgTypes from '../storybook-utils/createUseStylesArgTypes';
import Checkbox from './Checkbox';
import styles from './Checkbox.module.scss';

export default {
    title: 'Selector Inputs/Checkbox',
    component: Checkbox,
    argTypes: {
        ...childrenPropArgTypes,
        ...createUseFieldArgTypes({isSelectable: true}),
        ...createUseStylesArgTypes(styles),
    },
};

const Template = args => (
    <Checkbox {...args} />
);

export const DefaultStory = Template.bind({});
DefaultStory.storyName = 'Checkbox';
DefaultStory.args = {
    children: 'Label text',
};
