import React from 'react';
import PropTypes from 'prop-types';
import {withFormContextDefaultProps, withFormContextPropTypes, withFormContext} from '../form/withFormContext';
import Checkbox from './Checkbox';
import useStyles from '../useStyles';
import {Icon} from '../icons';
import styles from './CheckboxTile.module.scss';

const CheckboxTile = React.forwardRef((props, ref) => {
    const {cx, createClassNameResolver} = useStyles(props, styles);
    const {children, name, icon, ...restProps} = props;
    const {isSelected, isDisabled} = props;
    const classNameResolver = createClassNameResolver('ace-c-checkbox-tile');

    return (
        <Checkbox
            {...restProps}
            ref={ref}
            name={`${name}Checkbox`}
            isComposedIn={true}
            classNameResolver={classNameResolver}
            className={cx('ace-c-checkbox--no-chrome', {
                'ace-c-checkbox--is-selected': isSelected,
                'ace-c-checkbox--is-disabled': isDisabled,
            })}
        >
            <div className={cx('ace-c-checkbox-tile__box')}>
                <div
                    className={cx('ace-c-checkbox-tile__checkbox', {
                        'ace-c-checkbox-tile__checkbox--is-selected': isSelected,
                        'ace-c-checkbox-tile__checkbox--is-disabled': isDisabled,
                    })}
                />
                <Icon
                    icon={icon}
                    className={cx(['ace-c-checkbox-tile__icon', 'ace-c-icon--xl'])}
                />
                <p>
                    {children}
                </p>
            </div>
        </Checkbox>
    );
});

CheckboxTile.displayName = 'CheckboxTile';

CheckboxTile.propTypes = {
    ...withFormContextPropTypes,
    icon: PropTypes.object.isRequired,
};

CheckboxTile.defaultProps = {
    ...withFormContextDefaultProps,
};

export default withFormContext({componentName: 'CheckboxTile', isSelectable: true})(CheckboxTile);
