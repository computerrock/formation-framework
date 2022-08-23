/**
 * useStyles hook argTypes for Storybook component meta
 */
const createUseStylesArgTypes = styles => {
    let availableModifiers = '';
    if (styles) {
        Object.keys(styles).forEach(className => {
            if (className.includes('--')) {
                const safeClassName = className.replace('__', '⎽⎽'); // fixes Storybook <em></em> auto-conversion
                availableModifiers += `<code style="margin: 3px 0;">${safeClassName}</code><br />`;
            }
        });
        availableModifiers = availableModifiers
            ? `<br />BEM modifier classes:<br />${availableModifiers}`
            : '';
    }

    return {
        className: {
            name: 'className',
            type: {
                name: 'union',
                raw: 'string | Array<string>',
                elements: [
                    {name: 'string'},
                    {
                        name: 'Array',
                        elements: [
                            {name: 'string'},
                        ],
                    },
                ],
                required: false,
            },
            description: `Specify a CSS class for component. ${availableModifiers}`,
            table: {
                type: {summary: 'string | Array<string>'},
            },
            control: {
                type: 'text',
            },
        },
        classNameResolver: {
            name: 'classNameResolver',
            type: {
                name: 'signature',
                type: 'function',
                raw: '<raw-signature>', // TODO
                required: false,
            },
            description: 'Custom className resolver for `cx()` function.',
            table: {
                type: {summary: 'function signature TODO'},
            },
            control: null,
        },
    };
}

export default createUseStylesArgTypes;
