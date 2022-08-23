import React from 'react';
import createUseStylesArgTypes from '../storybook-utils/createUseStylesArgTypes';
import childrenPropArgTypes from '../storybook-utils/childrenPropArgTypes';
import ScreenTitle from './ScreenTitle';
import styles from './ScreenTitle.module.scss';

export default {
    title: 'Layout/ScreenTitle',
    component: ScreenTitle,
    argTypes: {
        ...childrenPropArgTypes,
        ...createUseStylesArgTypes(styles),
    },
};

const Template = args => (
    <ScreenTitle {...args} />
);

export const DefaultStory = Template.bind({});
DefaultStory.storyName = 'ScreenTitle';
DefaultStory.args = {
    children: 'Screen title',
};
