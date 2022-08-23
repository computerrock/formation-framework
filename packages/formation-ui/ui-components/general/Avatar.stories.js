import React from 'react';
import createUseStylesArgTypes from '../storybook-utils/createUseStylesArgTypes';
import Avatar from './Avatar';
import styles from './Avatar.module.scss';

export default {
    title: 'General/Avatar',
    component: Avatar,
    argTypes: {
        alt: {
            name: 'alt',
            type: {name: 'string', required: true},
            description: 'User initials.',
            table: {
                type: {summary: 'string'},
            },
            control: {
                type: 'text',
            },
        },
        src: {
            name: 'src',
            type: {name: 'string', required: false},
            description: 'Avatar source URI.',
            table: {
                type: {summary: 'string'},
            },
            control: {
                type: 'text',
            },
        },
        ...createUseStylesArgTypes(styles),
    },
};

const Template = args => (
    <Avatar {...args} />
);

export const DefaultStory = Template.bind({});
DefaultStory.storyName = 'Avatar';
DefaultStory.args = {
    alt: 'CR',
};
