/**
 * React children prop argTypes for Storybook component meta
 *
 * TODO custom type, table.type, control?
 */
export default  {
    children: {
        name: 'children',
        type: {name: 'string', required: false},
        description: 'React children prop.',
        table: {
            // type: {summary: 'string'},
        },
        control: {
            type: 'text',
        },
    },
};
