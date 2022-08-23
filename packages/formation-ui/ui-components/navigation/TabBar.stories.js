import React from 'react';
import createUseFieldArgTypes from '../storybook-utils/createUseFieldArgTypes';
import Tab from './Tab';
import TabBar from './TabBar';

export default {
    title: 'Navigation/TabBar',
    component: TabBar,
    argTypes: {
        ...createUseFieldArgTypes({isSelectableGroup: true}),
    },
};

export const DefaultStory = args => (
    <TabBar {...args}>
        <Tab name="tabs-tab1" value="tab1">First</Tab>
        <Tab name="tabs-tab2" value="tab2">Second</Tab>
        <Tab name="tabs-tab3" value="tab3">Third</Tab>
    </TabBar>
);

DefaultStory.storyName = 'TabBar';
DefaultStory.args = {
    name: 'tabs',
    defaultValue: 'tab3',
};
