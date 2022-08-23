import React from 'react';
import childrenPropArgTypes from '../storybook-utils/childrenPropArgTypes';
import createUseStylesArgTypes from '../storybook-utils/createUseStylesArgTypes';
import InteractiveIcon from './InteractiveIcon';
import {searchIcon} from './index';
import styles from './InteractiveIcon.module.scss';

export default {
    title: 'Icons/InteractiveIcon',
    component: InteractiveIcon,
    argTypes: {
        ...childrenPropArgTypes,
        ...createUseStylesArgTypes(styles),
    },
};

const Template = args => (
    <InteractiveIcon {...args} />
);

export const DefaultStory = Template.bind({});
DefaultStory.storyName = 'interactiveIcon';
DefaultStory.args = {
    icon: searchIcon,
    label: 'some text',
};
