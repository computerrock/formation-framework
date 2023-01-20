import React from 'react';
import createUseFieldArgTypes from '../storybook-utils/createUseFieldArgTypes';
import textInputArgTypes from '../storybook-utils/textInputArgTypes';
import createUseStylesArgTypes from '../storybook-utils/createUseStylesArgTypes';
import formFieldArgTypes from '../storybook-utils/formFieldArgTypes';
import DateField from './DateField';
import {calendarIcon} from '../icons';
import styles from './DateField.module.scss';
import decoratorStyles from '../storybook-utils/DateFieldStories.module.scss';

export default {
    title: 'Text Inputs/DateField',
    component: DateField,
    argTypes: {
        ...textInputArgTypes,
        ...formFieldArgTypes,
        ...createUseFieldArgTypes(),
        ...createUseStylesArgTypes(styles),
    },
};

const Template = args => (
    <DateField {...args} />
);

export const DefaultStory = Template.bind({});
DefaultStory.storyName = 'DateField';
DefaultStory.args = {
    label: 'Field label',
    icon: calendarIcon,
};

DefaultStory.decorators = [(Story) =>
    <div className={decoratorStyles['date-field-story__decorator-container']}>
        <Story />
    </div>
];
