import React from 'react';
import createUseFieldArgTypes from '../storybook-utils/createUseFieldArgTypes';
import createUseStylesArgTypes from '../storybook-utils/createUseStylesArgTypes';
import YoDawgDown from './YoDawgDown';
import styles from './YoDawgDown.module.scss';

export default {
    title: 'Test/YoDawgDown',
    component: YoDawgDown,
    argTypes: {
        ...createUseFieldArgTypes({isSelectable: true}),
        ...createUseStylesArgTypes(styles),
    },
};

const Template = args => (
    <YoDawgDown {...args} />
);

export const DefaultStory = Template.bind({});
DefaultStory.storyName = 'YoDawgDown';
DefaultStory.args = {};
