import React from 'react';
import createUseFieldArgTypes from '../storybook-utils/createUseFieldArgTypes';
import childrenPropArgTypes from '../storybook-utils/childrenPropArgTypes';
import createUseStylesArgTypes from '../storybook-utils/createUseStylesArgTypes';
import CheckboxTile from './CheckboxTile';
import {vehicleIcon} from "../assets/icons";
import styles from './CheckboxTile.module.scss';

export default {
    title: 'Selector Inputs/CheckboxTile',
    component: CheckboxTile,
    argTypes: {
        ...childrenPropArgTypes,
        ...createUseFieldArgTypes({isSelectable: true}),
        ...createUseStylesArgTypes(styles),
    },
};

const Template = args => (
    <CheckboxTile {...args} />
);

export const DefaultStory = Template.bind({});
DefaultStory.storyName = 'CheckboxTile';
DefaultStory.args = {
    children: 'Label text',
    icon: vehicleIcon,
};
