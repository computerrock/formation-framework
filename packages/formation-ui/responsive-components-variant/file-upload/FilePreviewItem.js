import React from 'react';
import PropTypes from 'prop-types';
import styles from './FilePreviewItem.module.scss';
import useStyles from '../useStyles';
import {deleteIcon, Icon} from '../icons';

const FilePreviewItem = props => {
    const {cx} = useStyles(props, styles);
    const {icon, id, children, deleteFile} = props;
    return (
        <div className={cx('ace-c-file-preview-item')}>
            <Icon icon={icon} className={cx(['ace-c-icon--24', 'ace-c-icon--color-highlight', 'ace-c-file-preview-item__icon'])} />
            <p className={cx('ace-c-file-preview-item__title')}>{children}</p>
            <Icon icon={deleteIcon} onClick={() => deleteFile({id})} className={cx(['ace-c-icon--24', 'ace-c-file-preview-item__remove'])} />
        </div>
    );
};

FilePreviewItem.propTypes = {
    deleteFile: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired,
    icon: PropTypes.object.isRequired,
};

export default FilePreviewItem;
