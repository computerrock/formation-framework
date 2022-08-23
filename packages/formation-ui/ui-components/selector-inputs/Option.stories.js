import React from 'react';
import createUseFieldArgTypes from '../storybook-utils/createUseFieldArgTypes';
import childrenPropArgTypes from '../storybook-utils/childrenPropArgTypes';
import createUseStylesArgTypes from '../storybook-utils/createUseStylesArgTypes';
import Option from './Option';
import styles from './Option.module.scss';

export default {
    title: 'Selector Inputs/Option',
    component: Option,
    argTypes: {
        ...childrenPropArgTypes,
        ...createUseFieldArgTypes({isSelectable: true}),
        ...createUseStylesArgTypes(styles),
    },
};

const Template = args => (
    <Option {...args} />
);

export const DefaultStory = Template.bind({});
DefaultStory.storyName = 'Option';
DefaultStory.args = {
    children: 'Label text',
};
