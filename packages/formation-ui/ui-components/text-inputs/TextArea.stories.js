import React from 'react';
import createUseFieldArgTypes from '../storybook-utils/createUseFieldArgTypes';
import textInputArgTypes from '../storybook-utils/textInputArgTypes';
import textAreaArgTypes from '../storybook-utils/textAreaArgTypes';
import createUseStylesArgTypes from '../storybook-utils/createUseStylesArgTypes';
import TextArea from './TextArea';
import styles from './TextArea.module.scss';

export default {
    title: 'Text Inputs/TextArea',
    component: TextArea,
    argTypes: {
        ...textAreaArgTypes,
        ...createUseFieldArgTypes(),
        ...createUseStylesArgTypes(styles),
    },
};

const Template = args => (
    <TextArea {...args} />
);

export const DefaultStory = Template.bind({});
DefaultStory.storyName = 'TextArea';
DefaultStory.args = {};
