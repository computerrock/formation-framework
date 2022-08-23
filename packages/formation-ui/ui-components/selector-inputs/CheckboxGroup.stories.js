import React from 'react';
import createUseFieldArgTypes from '../storybook-utils/createUseFieldArgTypes';
import Checkbox from './Checkbox';
import CheckboxGroup from './CheckboxGroup';

export default {
    title: 'Selector Inputs/CheckboxGroup',
    component: CheckboxGroup,
    argTypes: {
        ...createUseFieldArgTypes({isSelectableGroup: true}),
    },
};

export const DefaultStory = args => (
    <CheckboxGroup {...args}>
        <Checkbox name="checkboxOption1" value="1">1. option</Checkbox><br />
        <Checkbox name="checkboxOption2" value="2">2. option</Checkbox><br />
        <Checkbox name="checkboxOption3" value="3">3. option</Checkbox><br />
    </CheckboxGroup>
);

DefaultStory.storyName = 'CheckboxGroup';
DefaultStory.args = {
    name: 'defaultStoryGroup'
};
