import React from 'react';
import createUseStylesArgTypes from '../storybook-utils/createUseStylesArgTypes';
import childrenPropArgTypes from '../storybook-utils/childrenPropArgTypes';
import Panel from './Panel';
import styles from './Panel.module.scss';

export default {
    title: 'Layout/Panel',
    component: Panel,
    argTypes: {
        ...childrenPropArgTypes,
        ...createUseStylesArgTypes(styles),
    },
};

const Template = args => (
    <Panel {...args} />
);

export const DefaultStory = Template.bind({});
DefaultStory.storyName = 'Panel';
DefaultStory.args = {
    children: 'Any component.',
};
