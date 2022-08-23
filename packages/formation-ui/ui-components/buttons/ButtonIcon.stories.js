import React from 'react';
import createUseFieldArgTypes from '../storybook-utils/createUseFieldArgTypes';
import childrenPropArgTypes from '../storybook-utils/childrenPropArgTypes';
import buttonArgTypes from '../storybook-utils/buttonArgTypes';
import createUseStylesArgTypes from '../storybook-utils/createUseStylesArgTypes';
import ButtonIcon from './ButtonIcon';
import styles from './ButtonIcon.module.scss';
import checkmarkIcon from '../assets/icons/checkmark.svg';

export default {
    title: 'Buttons/ButtonIcon',
    component: ButtonIcon,
    argTypes: {
        ...childrenPropArgTypes,
        ...buttonArgTypes,
        ...createUseFieldArgTypes({isSelectable: true}),
        ...createUseStylesArgTypes(styles),
    },
};

const Template = args => (
    <ButtonIcon {...args} />
);

export const DefaultStory = Template.bind({});
DefaultStory.storyName = 'ButtonIcon';
DefaultStory.args = {
    icon: checkmarkIcon,
};
