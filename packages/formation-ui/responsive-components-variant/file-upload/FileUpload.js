import React, {useEffect, useRef, useState, useCallback} from 'react';
import uuid from 'uuid/v1';
import PropTypes from 'prop-types';
import useStyles from '../useStyles';
import styles from './FileUpload.module.scss';
import Circle from '../general/Circle';
import {addIcon, fileIcon, Icon, imageIcon, infoIcon, uploadIcon} from '../icons';
import {ButtonGhost, ButtonGhostContent, ButtonIcon} from '../buttons';
import {isAllowedMIMEType, isPdfMIMEType, lowercaseExtension} from '../../utils/files';
import FilePreviewItem from './FilePreviewItem';


const validationMessages = {
    MAX_FILES: 'Sie können maximal 10 Dateien hochladen.',
    INVALID_EXTENSION: 'Dieser Dateityp wird nicht unterstützt. Gültige Formate sind: PDF, PNG, JPEG, HEIF.',
    FILE_SIZE_LIMIT: 'Die Datei überschreitet die maximal erlaubte Größe von 20MB',
};

const FileUpload = props => {
    const {cx} = useStyles(props, styles);
    const {error, setError, uploadFile, deleteFile, files} = props;
    const {maxAllowedFiles, allowedMimeTypes} = props;
    const [dragCounter, setDragCounter] = useState(0);
    const fileReader = useRef(null);
    const filesToRead = useRef(null);
    const currentFileIndex = useRef(null);
    const fileInput = useRef(null);
    const fileInputMobile = useRef(null);

    const readFiles = useCallback(() => {
        const {files} = props;
        if (!filesToRead.current || !filesToRead.current.length) {
            return;
        }
        if (currentFileIndex.current === filesToRead.current.length) {
            if (fileInput) fileInput.current.value = '';
            if (fileInputMobile) fileInputMobile.current.value = '';
            return;
        }
        if (Object.keys(files).length + filesToRead.current.length > maxAllowedFiles) {
            setError(validationMessages.MAX_FILES);
            return;
        }
        const currentFile = filesToRead.current[currentFileIndex.current];
        const {type} = currentFile;
        if (currentFile.size / 1000000 > 20) {
            setError(validationMessages.FILE_SIZE_LIMIT);
        } else if (isAllowedMIMEType(allowedMimeTypes, type)) {
            fileReader.current.readAsDataURL(currentFile);
        } else {
            setError(validationMessages.INVALID_EXTENSION);
            currentFileIndex.current += 1;
            readFiles();
        }
    }, [setError, props, maxAllowedFiles, allowedMimeTypes]);

    const handleFileInputChange = e => {
        e.preventDefault();
        currentFileIndex.current = 0;
        filesToRead.current = e.target.files;
        setError('');
        readFiles();
    };

    const onDragEnter = () => {
        setDragCounter(prevCounter => prevCounter + 1);
    };

    const onDragLeave = () => {
        setDragCounter(prevCounter => prevCounter - 1);
    };

    useEffect(() => {
        fileReader.current = new FileReader();
        fileReader.current.onloadend = () => {
            const {
                name: fileName,
                type,
            } = filesToRead.current[currentFileIndex.current];
            const file = {
                recognitionId: uuid(),
                fileName: lowercaseExtension(fileName),
                file: filesToRead.current[currentFileIndex.current],
                fileUrl: isPdfMIMEType(type)
                    ? fileIcon : URL.createObjectURL(filesToRead.current[currentFileIndex.current]),
                contentType: type,
            };
            uploadFile(file);
            currentFileIndex.current += 1;
            readFiles();
        };
    }, [readFiles, uploadFile]);
    const isDraggingOver = dragCounter > 0;
    return (
        <div className={cx('ace-c-file-upload')}>
            <div className={cx('ace-c-file-upload__wrapper', {
                'ace-c-file-upload__wrapper--is-dragging-over': isDraggingOver,
            })}
            >
                {!!error && (
                    <div className={cx('ace-c-file-upload__error-block')}>
                        <Icon icon={infoIcon} className={cx(['ace-c-icon--24', 'ace-c-icon--color-primary', 'ace-c-file-upload__error-block__icon'])} />
                        <p className={cx('ace-c-file-upload__error-block__description')}>{error}</p>
                    </div>
                )}
                <div className={cx('ace-c-file-upload__drop-overlay', {
                    'ace-c-file-upload__drop-overlay--is-dragging-over': isDraggingOver,
                })}
                >
                    <h5 className="ace-h5">Drop Files here</h5>
                </div>
                <div
                    className={cx('ace-c-file-upload__container', {
                        'ace-c-file-upload__container--is-dragging-over': isDraggingOver,
                    })}
                    onDragEnter={onDragEnter}
                    onDragLeave={onDragLeave}
                    onDrop={onDragLeave}
                    droppable="true"
                >
                    <Circle
                        className={cx([
                            'ace-c-circle--medium',
                            'global!ace-u-margin--bottom-8',
                        ])}
                    >
                        <Icon
                            icon={uploadIcon}
                            className={cx([
                                'ace-c-icon--48',
                                'ace-c-icon--color-highlight',
                                'ace-c-icon--no-margin',
                            ])}
                        />
                    </Circle>
                    <p className={cx('ace-c-file-upload__title')}>Datei reinziehen</p>
                    <p className={cx('ace-c-file-upload__description')}>Gültige Formate: PDF, PNG, JPEG</p>
                    <div className={cx('ace-c-file-upload__input-container')}>
                        <ButtonGhost>
                            <ButtonGhostContent icon={addIcon} iconPosition="left">Oder dokumente durchsuchen</ButtonGhostContent>
                        </ButtonGhost>
                        <label
                            className={cx('ace-c-file-upload__label', {
                                'ace-c-file-upload__label--is-dragging-over': isDraggingOver,
                            })}
                            htmlFor="file-upload"
                        />
                    </div>
                    <input
                        type="file"
                        id="file-upload"
                        ref={fileInput}
                        className={cx('ace-c-file-upload__input', {
                            'ace-c-file-upload__input--is-dragging-over': isDraggingOver,
                        })}
                        onChange={handleFileInputChange}
                        multiple
                    />
                </div>
            </div>
            <div
                className={cx('ace-c-file-upload__container--mobile')}
            >
                <p className={cx('ace-c-file-upload__container--mobile__text', {
                    'ace-c-file-upload__container--mobile__text--error': !!error,
                })}
                >DATEI AusWÄHLEN
                </p>
                <div className={cx('ace-c-file-upload__input-container')}>
                    <ButtonIcon className={cx('ace-c-file-upload__container--mobile__icon')} icon={addIcon} />
                    <label className={cx('ace-c-file-upload__label')} htmlFor="file-upload" />
                    <input
                        type="file"
                        id="file-upload"
                        ref={fileInputMobile}
                        className={cx('ace-c-file-upload__input')}
                        onChange={handleFileInputChange}
                        multiple
                    />
                </div>
            </div>
            {!!Object.values(files).length && (
                <div className={cx('ace-c-file-upload__files')}>
                    <p className={cx('ace-c-file-upload__files__title')}>Hinzugefügte Dokumente:</p>
                    {Object.values(files).map(({id, fileName, type}) => {
                        return (
                            <FilePreviewItem
                                key={id}
                                deleteFile={deleteFile}
                                id={id}
                                icon={isPdfMIMEType(type) ? fileIcon : imageIcon}
                            >
                                {fileName}
                            </FilePreviewItem>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

FileUpload.propTypes = {
    uploadFile: PropTypes.func.isRequired,
    deleteFile: PropTypes.func.isRequired,
    files: PropTypes.object.isRequired,
    error: PropTypes.string,
    setError: PropTypes.func,
    maxAllowedFiles: PropTypes.number,
    allowedMimeTypes: PropTypes.object.isRequired,
};

FileUpload.defaultProps = {
    error: '',
    setError: () => {},
    maxAllowedFiles: 10,
};

export default FileUpload;
