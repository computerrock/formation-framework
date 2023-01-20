import React from 'react';
import childrenPropArgTypes from '../storybook-utils/childrenPropArgTypes';
import NoResultsBlock from './NoResultsBlock';
import Icon from '../icons/Icon';
import {searchIcon} from '../icons'

export default {
    title: 'General/NoResultsBlock',
    component: NoResultsBlock,
    argTypes: {
        ...childrenPropArgTypes,
    },
};

const Template = args => (
    <NoResultsBlock {...args} />
);

export const DefaultStory = Template.bind({});
DefaultStory.storyName = 'NoResultsBlock';
DefaultStory.args = {
    children: 'Any component',
    message: 'No results message',
    description: 'No results description',
    icon: <Icon icon={searchIcon} className="ace-c-icon--xxl"/>
};
