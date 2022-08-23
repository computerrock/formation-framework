import React from 'react';
import createUseFieldArgTypes from '../storybook-utils/createUseFieldArgTypes';
import textInputArgTypes from '../storybook-utils/textInputArgTypes';
import buttonArgTypes from '../storybook-utils/buttonArgTypes';
import createUseStylesArgTypes from '../storybook-utils/createUseStylesArgTypes';
import InputWithButton from './InputWithButton';
import styles from './InputWithButton.module.scss';
import Icon from '../icons/Icon';

export default {
    title: 'Text Inputs/InputWithButton',
    component: InputWithButton,
    argTypes: {
        ...textInputArgTypes,
        ...buttonArgTypes,
        ...createUseFieldArgTypes(),
        ...createUseStylesArgTypes(styles),
    },
};

const Template = args => (
    <InputWithButton {...args}><Icon iconName="plus" size="xl" state="contrast" /></InputWithButton>
);

export const DefaultStory = Template.bind({});
DefaultStory.storyName = 'InputWithButton';
