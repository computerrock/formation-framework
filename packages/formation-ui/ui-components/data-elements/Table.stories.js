import React from 'react';
import createUseStylesArgTypes from '../storybook-utils/createUseStylesArgTypes';
import Table from './Table';
import TableCaption from './TableCaption';
import TableHead from './TableHead';
import TableBody from './TableBody';
import TableRow from './TableRow';
import TableCell from './TableCell';
import styles from './Table.module.scss';

export default {
    title: 'General/Table',
    component: Table,
    argTypes: {
        ...createUseStylesArgTypes(styles),
    },
};

const Template = (args) => {
    return (
        <Table {...args}>
            <TableCaption className="ace-c-table__caption--side-top">
                Table caption
            </TableCaption>
            <TableHead>
                <TableRow>
                    <TableCell>No.</TableCell>
                    <TableCell>some</TableCell>
                    <TableCell>header</TableCell>
                    <TableCell>here</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                <TableRow>
                    <TableCell>1.</TableCell>
                    <TableCell>some</TableCell>
                    <TableCell>data</TableCell>
                    <TableCell>here</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>2.</TableCell>
                    <TableCell>some</TableCell>
                    <TableCell>data</TableCell>
                    <TableCell>here</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>3.</TableCell>
                    <TableCell>some</TableCell>
                    <TableCell>data</TableCell>
                    <TableCell>here</TableCell>
                </TableRow>
            </TableBody>
        </Table>
    );
}

export const DefaultStory = Template.bind({});
DefaultStory.storyName = 'Table';
DefaultStory.args = {};
