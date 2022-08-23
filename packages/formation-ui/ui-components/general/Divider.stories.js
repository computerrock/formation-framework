import React from 'react';
import Divider from './Divider';
import createUseStylesArgTypes from '../storybook-utils/createUseStylesArgTypes';
import childrenPropArgTypes from '../storybook-utils/childrenPropArgTypes';
import styles from './Divider.module.scss';

export default {
    title: 'General/Divider',
    component: Divider,
    argTypes: {
        ...childrenPropArgTypes,
        ...createUseStylesArgTypes(styles),
    },
};

const Template = () => <Divider />;

export const DefaultStory = Template.bind({});
DefaultStory.storyName = 'Divider';
