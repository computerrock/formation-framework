import React, {useRef, useState, useCallback, useEffect} from 'react';
import {withFormContext, withFormContextPropTypes, withFormContextDefaultProps} from '../form/withFormContext';
import useStyles from '../useStyles';
import styles from './FileDropZone.module.scss';

const FileDropZone = React.forwardRef((props, ref) => {
    const {cx} = useStyles(props, styles);
    const localDropZoneRef = useRef();
    const dropZoneRef = ref || localDropZoneRef;
    const [dragElementCount, setDragElementCount] = useState(0);
    const {onChange, isDisabled, children, qaIdent} = props;

    const handleDragIn = useCallback(event => {
        if (isDisabled) return;

        event.preventDefault();
        event.stopPropagation();

        if (event.dataTransfer.items
            && event.dataTransfer.items.length > 0) {
            setDragElementCount(prevCount => prevCount + 1);
        }
    }, [isDisabled]);

    const handleDragOut = useCallback(event => {
        if (isDisabled) return;

        event.preventDefault();
        event.stopPropagation();

        setDragElementCount(prevCount => prevCount - 1);
    }, [isDisabled]);

    const handleDragOver = useCallback(event => {
        if (isDisabled) return;

        event.preventDefault();
        event.stopPropagation();
    }, [isDisabled]);

    const handleDrop = useCallback(event => {
        if (isDisabled) return;

        event.preventDefault();
        event.stopPropagation();

        if (event.dataTransfer.files
            && event.dataTransfer.files.length > 0) {
            onChange(event.dataTransfer.files);
            setDragElementCount(0);
            event.dataTransfer.clearData();
        }
    }, [isDisabled, onChange]);

    useEffect(() => {
        const dropZoneElement = dropZoneRef.current;

        dropZoneElement.addEventListener('dragenter', handleDragIn);
        dropZoneElement.addEventListener('dragleave', handleDragOut);
        dropZoneElement.addEventListener('dragover', handleDragOver);
        dropZoneElement.addEventListener('drop', handleDrop);

        return () => {
            dropZoneElement.removeEventListener('dragenter', handleDragIn);
            dropZoneElement.removeEventListener('dragleave', handleDragOut);
            dropZoneElement.removeEventListener('dragover', handleDragOver);
            dropZoneElement.removeEventListener('drop', handleDrop);
        };
    }, [dropZoneRef, handleDragIn, handleDragOut, handleDragOver, handleDrop]);

    const isDraggingActive = dragElementCount > 0;
    return (
        <div
            ref={dropZoneRef}
            className={cx('ace-c-file-drop-zone', {
                'ace-c-file-drop-zone--is-dragging-active': isDraggingActive,
                'ace-c-file-drop-zone--is-disabled': isDisabled,
            })}
            data-qa={qaIdent}
        >
            {children}
        </div>
    );
});

FileDropZone.displayName = 'FileDropZone';

FileDropZone.propTypes = {
    ...withFormContextPropTypes,
};

FileDropZone.defaultProps = {
    ...withFormContextDefaultProps,
};

export default withFormContext({componentName: 'FileDropZone', isFileUpload: true})(FileDropZone);
