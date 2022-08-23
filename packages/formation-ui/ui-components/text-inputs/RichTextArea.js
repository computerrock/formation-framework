import React, {useRef, useState, useEffect, Fragment} from 'react';
import PropTypes from 'prop-types';
import {Editor, RichUtils} from 'draft-js';
import 'draft-js/dist/Draft.css';
import {withFormContext, withFormContextPropTypes, withFormContextDefaultProps} from '../form/withFormContext';
import {Icon, warningIcon} from '../icons';
import {LabelWithIcon} from '../general';
import Divider from '../general/Divider';
import useStyles from '../useStyles';
import styles from './RichTextArea.module.scss';
import richTextAreaLocales from './richTextAreaLocales';

const RichTextArea = React.forwardRef((props, ref) => {
    const {cx} = useStyles(props, styles);
    const {placeholder, editorOptions, maxLength, errors, isDisabled, isResizable, qaIdent} = props;
    const {locale = 'de-DE'} = props; // since the app is German, default locale is de
    const {editorState, setEditorState} = props;
    const editorRef = useRef(null);
    const [warningMessage, setWarningMessage] = useState('');
    const labels = richTextAreaLocales[locale];


    useEffect(() => {
        if (editorRef && !isDisabled) editorRef.current.focus();
    }, [editorRef, isDisabled]);

    const applyInlineStyle = currentStyle => {
        setEditorState(RichUtils.toggleInlineStyle(editorState, currentStyle));
    };

    const handleTextInput = inputValue => {
        const currentContent = editorState.getCurrentContent();
        const currentContentTextLength = currentContent.getPlainText('').length;
        if (maxLength) {
            if (inputValue.length === 1 && currentContentTextLength >= maxLength) {
                return 'handled';
            }

            // in case user tries to paste too large content
            if (inputValue.length > 1
                && (currentContentTextLength >= maxLength
                    || currentContentTextLength + inputValue.length > maxLength
                )) {
                setWarningMessage(labels['warning-content-too-long']);
                return 'handled';
            }
        }

        if (warningMessage !== '') {
            setWarningMessage('');
        }
    };

    const isStyleActive = textStyle => {
        return editorState.getCurrentInlineStyle().has(textStyle);
    };

    const handleKeyCommand = (command, editorState) => {
        const newEditorState = RichUtils.handleKeyCommand(editorState, command);
        if (newEditorState) {
            setEditorState(newEditorState);
            return true;
        }
        return false;
    };

    const handleOnMouseDown = (e, style) => {
        e.preventDefault();
        if (isDisabled) return;
        applyInlineStyle(style);
    };

    const currentContent = editorState.getCurrentContent();

    return (
        <div
            ref={ref}
            className={cx('ace-c-rich-text-area', {
                'ace-c-rich-text-area--is-disabled': isDisabled,
                'ace-c-rich-text-area--has-error': errors.length,
            })}
            data-qa={qaIdent}
        >
            <div className={cx('global!ace-u-margin--bottom-8')}>
                <div>
                    {Object.values(editorOptions).map((style, idx) => (
                        <span
                            key={idx}
                            className={cx([
                                'ace-c-rich-text-area__span',
                                {'ace-c-rich-text-area__span--is-active': isStyleActive(style)},
                            ])}
                            onMouseDown={e => handleOnMouseDown(e, style)}
                        >
                            {labels[`inline-style-${style.toLowerCase()}`]}
                        </span>
                    ))}
                </div>
                <Divider />
                {warningMessage && warningMessage !== '' && (
                    <LabelWithIcon
                        label={warningMessage}
                        className={cx([
                            'ace-c-label-with-icon--icon-reverse',
                            'global!ace-u-typography--variant-caption',
                            'global!ace-u-margin--4-0',
                        ])}
                    >
                        <Icon
                            icon={warningIcon}
                            className={cx('ace-c-icon--color-warning')}
                        />
                    </LabelWithIcon>
                )}
            </div>
            <div className={cx('ace-c-rich-text-area__editor', {
                'ace-c-rich-text-area__editor--not-resizable': !isResizable && isResizable !== 'undefined',
            })}
            >
                <Editor
                    ref={editorRef}
                    placeholder={placeholder}
                    editorState={editorState}
                    onChange={setEditorState}
                    handleBeforeInput={handleTextInput}
                    handlePastedText={handleTextInput}
                    handleKeyCommand={handleKeyCommand}
                    readOnly={isDisabled}
                />
            </div>
            {maxLength && (
                <Fragment>
                    <Divider className={cx('global!ace-u-margin--top-8')} />
                    <p className={cx([
                        'global!ace-u-typography--variant-body',
                        'global!ace-u-typography--align-right',
                    ])}
                    >
                        {`${currentContent.getPlainText('').length}/${maxLength}`}
                    </p>
                </Fragment>

            )}
        </div>
    );
});

RichTextArea.displayName = 'RichTextArea';

RichTextArea.propTypes = {
    ...withFormContextPropTypes,
    isResizable: PropTypes.bool,
    editorOptions: PropTypes.object,
};

RichTextArea.defaultProps = {
    ...withFormContextDefaultProps,
    isResizable: true,
    editorOptions: {
        BOLD: 'BOLD',
        ITALIC: 'ITALIC',
        UNDERLINE: 'UNDERLINE',
    },
};

export default withFormContext({componentName: 'RichTextArea'})(RichTextArea);
