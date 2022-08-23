import React from 'react';
import PropTypes from 'prop-types';
import useStyles from '../useStyles';
import styles from './Stepper.module.scss';


const Stepper = props => {
    const {cx} = useStyles(props, styles);

    const {currentStep, steps} = props;

    return (
        <div className={cx('ace-c-stepper')}>
            <div className={cx('ace-c-stepper__track')} />
            <div className={cx('ace-c-stepper__track--highlight')} style={currentStep > 2 ? {width: (100 / (steps.length - 1)) * (currentStep - 2) + '%'} : {width: 0}} />
            {steps.map(step => {
                const {title, stepNumber} = step;
                return (
                    <div
                        key={stepNumber}
                        className={cx('ace-c-stepper__step')}
                    >
                        <div className={cx('ace-c-stepper__step__number', {'ace-c-stepper__step__number--highlight': stepNumber <= currentStep})}>{stepNumber}</div>
                        <div className={cx('ace-c-stepper__step__title', {'ace-c-stepper__step__title--bold': stepNumber === currentStep})}>{title}</div>
                    </div>
                );
            })}
        </div>
    );
};

Stepper.propTypes = {
    currentStep: PropTypes.number.isRequired,
    steps: PropTypes.array.isRequired,
};

export default Stepper;
