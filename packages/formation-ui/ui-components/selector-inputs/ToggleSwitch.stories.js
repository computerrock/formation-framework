import React from 'react';
import createUseFieldArgTypes from '../storybook-utils/createUseFieldArgTypes';
import childrenPropArgTypes from '../storybook-utils/childrenPropArgTypes';
import createUseStylesArgTypes from '../storybook-utils/createUseStylesArgTypes';
import ToggleSwitch from './ToggleSwitch';
import styles from './ToggleSwitch.module.scss';

export default {
    title: 'Selector Inputs/ToggleSwitch',
    component: ToggleSwitch,
    argTypes: {
        ...childrenPropArgTypes,
        ...createUseFieldArgTypes({isSelectable: true}),
        ...createUseStylesArgTypes(styles),
    },
};

const Template = args => (
    <ToggleSwitch {...args} />
);

export const DefaultStory = Template.bind({});
DefaultStory.storyName = 'ToggleSwitch';
DefaultStory.args = {
    children: 'Label text',
};
