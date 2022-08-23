import React from 'react';
import createUseFieldArgTypes from '../storybook-utils/createUseFieldArgTypes';
import RadioButton from './RadioButton';
import RadioButtonGroup from './RadioButtonGroup';

export default {
    title: 'Selector Inputs/RadioButtonGroup',
    component: RadioButtonGroup,
    argTypes: {
        ...createUseFieldArgTypes({isSelectableGroup: true}),
    },
};

export const DefaultStory = args => (
    <RadioButtonGroup {...args}>
        <RadioButton name="optionYes" value="yes">Yes</RadioButton><br />
        <RadioButton name="optionNo" value="no">No</RadioButton><br />
        <RadioButton name="optionMaybe" value="maybe">Maybe</RadioButton><br />
    </RadioButtonGroup>
);

DefaultStory.storyName = 'RadioButtonGroup';
DefaultStory.args = {
    name: 'defaultStoryGroup'
};
