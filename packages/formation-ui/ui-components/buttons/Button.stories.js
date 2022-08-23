import React from 'react';
import createUseFieldArgTypes from '../storybook-utils/createUseFieldArgTypes';
import childrenPropArgTypes from '../storybook-utils/childrenPropArgTypes';
import buttonArgTypes from '../storybook-utils/buttonArgTypes';
import createUseStylesArgTypes from '../storybook-utils/createUseStylesArgTypes';
import Button from './Button';
import styles from './Button.module.scss';

export default {
    title: 'Buttons/Button',
    component: Button,
    argTypes: {
        ...childrenPropArgTypes,
        ...buttonArgTypes,
        ...createUseFieldArgTypes({isSelectable: true}),
        ...createUseStylesArgTypes(styles),
    },
};

const Template = args => (
    <Button {...args} />
);

export const DefaultStory = Template.bind({});
DefaultStory.storyName = 'Button';
DefaultStory.args = {
    children: 'Label text',
};
