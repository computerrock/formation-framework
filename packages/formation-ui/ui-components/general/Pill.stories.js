import React from 'react';
import createUseStylesArgTypes from '../storybook-utils/createUseStylesArgTypes';
import childrenPropArgTypes from '../storybook-utils/childrenPropArgTypes';
import Pill from './Pill';
import styles from './Pill.module.scss';

export default {
    title: 'General/Pill',
    component: Pill,
    argTypes: {
        ...childrenPropArgTypes,
        type: {
            name: 'type',
            type: {
                name: 'union',
                raw: `'positive' | 'negative' | 'pending'`,
                elements: [
                    {name: 'literal', value: 'positive'},
                    {name: 'literal', value: 'negative'},
                    {name: 'literal', value: 'pending'},
                ],
            },
            defaultValue: 'pending',
            description: 'Pill type.',
            table: {
                type: {summary: `'positive' | 'negative' | 'pending'`},
            },
            control: {
                type: 'inline-radio',
                options: ['positive', 'negative', 'pending'],
            },
        },
        ...createUseStylesArgTypes(styles),
    },
};

const Template = args => (
    <Pill {...args} />
);

export const DefaultStory = Template.bind({});
DefaultStory.storyName = 'Pill';
DefaultStory.args = {
    children: 'label'
};
