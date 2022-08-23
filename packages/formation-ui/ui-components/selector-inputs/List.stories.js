import React from 'react';
import createUseFieldArgTypes from '../storybook-utils/createUseFieldArgTypes';
import createUseStylesArgTypes from '../storybook-utils/createUseStylesArgTypes';
import Option from './Option';
import List from './List';
import styles from './List.module.scss';

export default {
    title: 'Selector Inputs/List',
    component: List,
    argTypes: {
        ...createUseFieldArgTypes({isSelectableGroup: true, isMultipleChoice: false}),
        ...createUseStylesArgTypes(styles),
    },
};

export const DefaultStory = args => (
    <List {...args}>
        <Option name="optionYes" value="yes">Yes</Option>
        <Option name="optionNo" value="no">No</Option>
        <Option name="optionMaybe" value="maybe">Maybe</Option>
    </List>
);

DefaultStory.storyName = 'List';
DefaultStory.args = {
    name: 'defaultStoryGroup'
};
