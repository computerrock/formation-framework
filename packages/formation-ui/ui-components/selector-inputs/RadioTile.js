import React from 'react';
import PropTypes from 'prop-types';
import {withFormContext, withFormContextPropTypes, withFormContextDefaultProps} from '../form/withFormContext';
import {Icon} from '../icons';
import RadioButton from './RadioButton';
import useStyles from '../useStyles';
import styles from './RadioTile.module.scss';

const RadioTile = React.forwardRef((props, ref) => {
    const {cx, createClassNameResolver} = useStyles(props, styles);
    const {children, name, icon, ...restProps} = props;
    const {type, isSelected, isDisabled} = props;
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
            <div
                className={cx('ace-c-radio-tile__wrap', {
                    'ace-c-radio-tile__wrap--is-negative': type === 'negative',
                    'ace-c-radio-tile__wrap--is-positive': type === 'positive',
                    'ace-c-radio-tile__wrap--is-selected': isSelected,
                })}
            >
                <Icon
                    icon={icon}
                    className={cx(['ace-c-radio-tile__icon', 'ace-c-icon--xl'])}
                />
                <p>
                    {children}
                </p>
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

export default withFormContext({componentName: 'RadioTile', isSelectable: true})(RadioTile);
