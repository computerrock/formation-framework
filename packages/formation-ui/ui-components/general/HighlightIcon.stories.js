import React from 'react';
import createUseStylesArgTypes from '../storybook-utils/createUseStylesArgTypes';
import HighlightCircle from './HighlightCircle';
import vehicleIcon from '../assets/icons/vehicle.svg';
import styles from './HighlightCircle.module.scss';
import Icon from "../icons/Icon";

export default {
    title: 'General/HighlightCircle',
    component: HighlightCircle,
    argTypes: {
        ...createUseStylesArgTypes(styles),
    },
};

const Template = args => (
    <HighlightCircle {...args} >
        <Icon icon={vehicleIcon}/>
    </HighlightCircle>
);

export const DefaultStory = Template.bind({});
DefaultStory.storyName = "HighlightCircle";
