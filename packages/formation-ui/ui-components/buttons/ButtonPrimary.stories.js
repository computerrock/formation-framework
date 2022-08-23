import React from 'react';
import createUseFieldArgTypes from '../storybook-utils/createUseFieldArgTypes';
import childrenPropArgTypes from '../storybook-utils/childrenPropArgTypes';
import buttonArgTypes from '../storybook-utils/buttonArgTypes';
import createUseStylesArgTypes from '../storybook-utils/createUseStylesArgTypes';
import ButtonPrimary from './ButtonPrimary';
import styles from './ButtonPrimary.module.scss';

export default {
    title: 'Buttons/ButtonPrimary',
    component: ButtonPrimary,
    argTypes: {
        ...childrenPropArgTypes,
        ...buttonArgTypes,
        ...createUseFieldArgTypes({isSelectable: true}),
        ...createUseStylesArgTypes(styles),
    },
};

const Template = args => (
    <ButtonPrimary {...args} />
);

export const DefaultStory = Template.bind({});
DefaultStory.storyName = 'ButtonPrimary';
DefaultStory.args = {
    children: 'Label text',
};
