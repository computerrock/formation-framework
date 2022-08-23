import React from 'react';
import createUseFieldArgTypes from '../storybook-utils/createUseFieldArgTypes';
import textInputArgTypes from '../storybook-utils/textInputArgTypes';
import buttonArgTypes from '../storybook-utils/buttonArgTypes';
import formFieldArgTypes from '../storybook-utils/formFieldArgTypes';
import InputWithButtonField from './InputWithButtonField';
import Icon from '../icons/Icon';

export default {
    title: 'Text Inputs/InputWithButtonField',
    component: InputWithButtonField,
    argTypes: {
        ...textInputArgTypes,
        ...buttonArgTypes,
        ...formFieldArgTypes,
        ...createUseFieldArgTypes(),
    },
};

const Template = args => (
    <InputWithButtonField {...args}><Icon iconName="plus" size="xl" state="contrast" /></InputWithButtonField>
);

export const DefaultStory = Template.bind({});
DefaultStory.storyName = 'InputWithButtonField';
DefaultStory.args = {
    placeholder: 'default placeholder',
    label: 'default label'
};
