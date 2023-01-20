import React from 'react';
import childrenPropArgTypes from '../storybook-utils/childrenPropArgTypes';
import createUseStylesArgTypes from '../storybook-utils/createUseStylesArgTypes';
import Icon from './Icon';
import {searchIcon} from './index';
import styles from './Icon.module.scss';

export default {
    title: 'Buttons/Icon',
    component: Icon,
    argTypes: {
        ...childrenPropArgTypes,
        ...createUseStylesArgTypes(styles),
    },
};

const Template = args => (
    <Icon {...args}/>
);

export const DefaultStory = Template.bind({});
DefaultStory.storyName = 'Icon';
DefaultStory.args = {
    icon: searchIcon,
};
