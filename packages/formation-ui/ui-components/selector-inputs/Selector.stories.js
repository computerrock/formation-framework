import React from 'react';
import createUseFieldArgTypes from '../storybook-utils/createUseFieldArgTypes';
import childrenPropArgTypes from '../storybook-utils/childrenPropArgTypes';
import createUseStylesArgTypes from '../storybook-utils/createUseStylesArgTypes';
import Selector from './Selector';
import styles from './Selector.module.scss';

export default {
    title: 'Selector Inputs/Selector',
    component: Selector,
    argTypes: {
        ...childrenPropArgTypes,
        ...createUseFieldArgTypes({isSelectable: true}),
        ...createUseStylesArgTypes(styles),
    },
};

const Template = args => (
    <Selector {...args} />
);

export const DefaultStory = Template.bind({});
DefaultStory.storyName = 'Selector';
DefaultStory.args = {
    children: 'Any child component',
};
