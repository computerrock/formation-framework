import React from 'react';
import createUseFieldArgTypes from '../storybook-utils/createUseFieldArgTypes';
import createUseStylesArgTypes from '../storybook-utils/createUseStylesArgTypes';
import ComplexField from './ComplexField';
import styles from './ComplexField.module.scss';

export default {
    title: 'Test/ComplexField',
    component: ComplexField,
    argTypes: {
        ...createUseFieldArgTypes({isSelectable: true}),
        ...createUseStylesArgTypes(styles),
    },
};

const Template = args => (
    <ComplexField {...args} />
);

export const DefaultStory = Template.bind({});
DefaultStory.storyName = 'ComplexField';
DefaultStory.args = {
    value: 'some value',
};
