import React from 'react';
import createUseFieldArgTypes from '../storybook-utils/createUseFieldArgTypes';
import textInputArgTypes from '../storybook-utils/textInputArgTypes';
import formFieldArgTypes from '../storybook-utils/formFieldArgTypes';
import createUseStylesArgTypes from '../storybook-utils/createUseStylesArgTypes';
import Option from './Option';
import SelectField from './SelectField';
import styles from './Select.module.scss';

export default {
    title: 'Selector Inputs/SelectField',
    component: SelectField,
    argTypes: {
        ...textInputArgTypes,
        ...formFieldArgTypes,
        ...createUseFieldArgTypes({isSelectableGroup: true /* TODO , isMultipleChoice: false */}),
        ...createUseStylesArgTypes(styles),
    },
};

const Template = args => (
    <SelectField {...args}>
        <Option name="optionYes" value="yes">Yes</Option>
        <Option name="optionNo" value="no">No</Option>
        <Option name="optionMaybe" value="maybe">Maybe</Option>
    </SelectField>
);

export const DefaultStory = Template.bind({});
DefaultStory.storyName = 'SelectField';
DefaultStory.args = {
    label: 'Field label',
    name: 'defaultStoryGroup',
    placeholder: 'Please select option...',
};
