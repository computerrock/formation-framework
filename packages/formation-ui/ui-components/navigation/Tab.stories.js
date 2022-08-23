import React from 'react';
import createUseFieldArgTypes from '../storybook-utils/createUseFieldArgTypes';
import childrenPropArgTypes from '../storybook-utils/childrenPropArgTypes';
import createUseStylesArgTypes from '../storybook-utils/createUseStylesArgTypes';
import Tab from './Tab';
import styles from './Tab.module.scss';

export default {
    title: 'Navigation/Tab',
    component: Tab,
    argTypes: {
        ...childrenPropArgTypes,
        ...createUseFieldArgTypes({isSelectable: true}),
        ...createUseStylesArgTypes(styles),
    },
};

const Template = args => (
    <Tab {...args} />
);

export const DefaultStory = Template.bind({});
DefaultStory.storyName = 'Tab';
DefaultStory.args = {
    children: 'Tab title',
};
