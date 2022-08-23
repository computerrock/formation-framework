import React from 'react';
import createUseStylesArgTypes from '../storybook-utils/createUseStylesArgTypes';
import childrenPropArgTypes from '../storybook-utils/childrenPropArgTypes';
import Badge from './Badge';
import styles from './Badge.module.scss';

export default {
    title: 'General/Badge',
    component: Badge,
    argTypes: {
        ...childrenPropArgTypes,
        status: {
            name: 'status',
            type: {
                name: 'union',
                raw: `'silver' | 'gold' | 'platinum' | 'default'`,
                elements: [
                    {name: 'literal', value: 'default'},
                    {name: 'literal', value: 'silver'},
                    {name: 'literal', value: 'gold'},
                    {name: 'literal', value: 'platinum'},
                ],
            },
            description: 'Badge status.',
            table: {
                type: {summary: `'default' | 'silver' | 'gold' | 'platinum'`},
            },
            control: {
                type: 'inline-radio',
                options: ['default', 'silver', 'gold', 'platinum'],
            },
        },
        ...createUseStylesArgTypes(styles),
    },
};

const Template = args => (
    <Badge {...args} />
);

export const DefaultStory = Template.bind({});
DefaultStory.storyName = 'Badge';
DefaultStory.args = {
    children: 'label'
};
