import React from 'react';
import childrenPropArgTypes from '../storybook-utils/childrenPropArgTypes';
import createUseStylesArgTypes from '../storybook-utils/createUseStylesArgTypes';
import InteractiveIcon from './InteractiveIcon';
import {searchIcon} from './index';
import styles from './InteractiveIcon.module.scss';

export default {
    title: 'Buttons/InteractiveIcon',
    component: InteractiveIcon,
    argTypes: {
        ...childrenPropArgTypes,
        ...createUseStylesArgTypes(styles),
    },
};

const Template = args => (
    <InteractiveIcon {...args}>some text</InteractiveIcon>
);

export const DefaultStory = Template.bind({});
DefaultStory.storyName = 'InteractiveIcon';
DefaultStory.args = {
    icon: searchIcon,
};
