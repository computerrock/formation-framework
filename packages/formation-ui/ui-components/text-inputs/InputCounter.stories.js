import React from 'react';
import createUseFieldArgTypes from '../storybook-utils/createUseFieldArgTypes';
import createUseStylesArgTypes from '../storybook-utils/createUseStylesArgTypes';
import formFieldArgTypes from '../storybook-utils/formFieldArgTypes';
import InputCounter from './InputCounter';
import styles from './InputCounter.module.scss';

const {errors, ...formFieldArgTypesWithoutError} = formFieldArgTypes;

export default {
    title: 'Text Inputs/InputCounter',
    component: InputCounter,
    argTypes: {
        ...formFieldArgTypesWithoutError,
        ...createUseFieldArgTypes(),
        ...createUseStylesArgTypes(styles),
    },
};

export const DefaultStory = args => (
    <InputCounter {...args} />
);

DefaultStory.storyName = 'InputCounter';
DefaultStory.args = {
    name: 'inputCounterAdults',
    label: 'Erwachsene',
    defaultValue: '1'

};
