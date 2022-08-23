import React from 'react';
import Brick from './Brick';

export default {
    title: 'Test/Brick',
    component: Brick,
    argTypes: {
        backgroundColor: {control: 'color'},
    },
};

const Template = (args) => <Brick {...args} />;

export const DefaultStory = Template.bind({});
DefaultStory.storyName = 'Brick';
DefaultStory.args = {
    primary: true,
    label: 'Brick',
    children: 'This is a brick!',
};
