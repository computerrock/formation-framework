import React from 'react';
import createUseFieldArgTypes from '../storybook-utils/createUseFieldArgTypes';
import childrenPropArgTypes from '../storybook-utils/childrenPropArgTypes';
import createUseStylesArgTypes from '../storybook-utils/createUseStylesArgTypes';
import RadioTile from './RadioTile';
import {vehicleIcon} from '../assets/icons';
import styles from './RadioTile.module.scss';

export default {
    title: 'Selector Inputs/RadioTile',
    component: RadioTile,
    argTypes: {
        ...childrenPropArgTypes,
        ...createUseFieldArgTypes({isSelectable: true}),
        ...createUseStylesArgTypes(styles),
    },
};

const Template = args => (
    <RadioTile {...args} />
);

export const DefaultStory = Template.bind({});
DefaultStory.storyName = 'RadioTile';
DefaultStory.args = {
    children: 'Label text',
    icon: vehicleIcon
};
