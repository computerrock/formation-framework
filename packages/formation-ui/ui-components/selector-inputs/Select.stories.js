import React from 'react';
import createUseFieldArgTypes from '../storybook-utils/createUseFieldArgTypes';
import textInputArgTypes from '../storybook-utils/textInputArgTypes';
import createUseStylesArgTypes from '../storybook-utils/createUseStylesArgTypes';
import Option from './Option';
import Select from './Select';
import styles from './Select.module.scss';

export default {
    title: 'Selector Inputs/Select',
    component: Select,
    argTypes: {
        ...textInputArgTypes,
        ...createUseFieldArgTypes({isSelectableGroup: true /* TODO , isMultipleChoice: false */}),
        ...createUseStylesArgTypes(styles),
    },
};

export const DefaultStory = args => (
    <Select {...args}>
        <Option name="optionYes" value="yes">Yes</Option>
        <Option name="optionNo" value="no">No</Option>
        <Option name="optionMaybe" value="maybe">Maybe</Option>
    </Select>
);

DefaultStory.storyName = 'Select';
DefaultStory.args = {
    name: 'defaultStoryGroup',
    placeholder: 'Please select option...'
};

export const SmallVariantStory = args => (
    <Select {...args}>
        <Option name="optionYes" value="yes" className="ace-c-option--small">Yes</Option>
        <Option name="optionNo" value="no" className="ace-c-option--small">No</Option>
        <Option name="optionMaybe" value="maybe" className="ace-c-option--small">Maybe</Option>
    </Select>
);

SmallVariantStory.storyName = 'Select (small variant)';
SmallVariantStory.args = {
    name: 'smallVariantGroup',
    placeholder: 'Please select option...',
    className: 'ace-c-select--small',
};
