import React from 'react';
import PropTypes from 'prop-types';
import {withFormContext, withFormContextPropTypes, withFormContextDefaultProps} from '../form/withFormContext';
import RadioButton from './RadioButton';
import useStyles from '../useStyles';
import styles from './RadioTile.module.scss';
import {Icon} from '../icons';

const RadioTile = React.forwardRef((props, ref) => {
    const {cx, createClassNameResolver} = useStyles(props, styles);
    const {children, name, icon, title, text, meta, ...restProps} = props;
    const {isSelected, isDisabled} = props;
    const classNameResolver = createClassNameResolver('ace-c-radio-tile');

    return (
        <RadioButton
            {...restProps}
            ref={ref}
            name={`${name}Radio`}
            isComposedIn={true}
            classNameResolver={classNameResolver}
            className={cx('ace-c-radio-button--no-chrome', {
                'ace-c-radio-button--is-selected': isSelected,
                'ace-c-radio-button--is-disabled': isDisabled,
            })}
        >
            <div className={cx('ace-c-radio-tile__wrap')}>
                <Icon
                    icon={icon}
                    className={cx(['ace-c-radio-tile__icon', 'ace-c-icon--xl'])}
                />
                <div className={cx('ace-c-radio-tile__content')}>
                    <p className={cx('ace-c-radio-tile__title')}>{title}</p>
                    <p className={cx('ace-c-radio-tile__text')}>{text}</p>
                </div>
                {meta && (
                    <p className={cx('ace-c-radio-tile__meta')}>{meta}</p>
                )}
            </div>
        </RadioButton>
    );
});

RadioTile.displayName = 'RadioTile';

RadioTile.propTypes = {
    ...withFormContextPropTypes,
    icon: PropTypes.object.isRequired,
};

RadioTile.defaultProps = {
    ...withFormContextDefaultProps,
};

export default withFormContext({isSelectable: true})(RadioTile);
