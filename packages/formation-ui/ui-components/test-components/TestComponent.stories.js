import React from 'react';
import createUseFieldArgTypes from '../storybook-utils/createUseFieldArgTypes';
import childrenPropArgTypes from '../storybook-utils/childrenPropArgTypes';
import createUseStylesArgTypes from '../storybook-utils/createUseStylesArgTypes';
import TestComponent from './TestComponent';
import styles from './TestComponent.module.scss';

export default {
    title: 'Test/TestComponent',
    component: TestComponent,
    argTypes: {
        ...childrenPropArgTypes,
        ...createUseFieldArgTypes({isSelectable: true}),
        ...createUseStylesArgTypes(styles),
    },
};

const Template = args => (
    <TestComponent {...args} />
);

export const DefaultStory = Template.bind({});
DefaultStory.storyName = 'TestComponent';
DefaultStory.args = {
    children: 'Test text',
};
