import React, {Fragment, useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import 'moment/locale/de';
import {withFormContext, withFormContextPropTypes, withFormContextDefaultProps} from '../form/withFormContext';
import useStyles from '../useStyles';
import Divider from '../general/Divider';
import InputTime from '../text-inputs/InputTime';
import ButtonGhost from '../buttons/ButtonGhost';
import ButtonGhostContent from '../buttons/ButtonGhostContent';
import arrowDown from '../assets/icons/arrow-down.svg';
import arrowUp from '../assets/icons/arrow-up.svg';
import styles from './DatePicker.module.scss';

const datePickerViews = {
    DAYS_VIEW: 'DAYS_VIEW',
    MONTHS_VIEW: 'MONTHS_VIEW',
    YEARS_VIEW: 'YEARS_VIEW',
};

const getRange = (start, end) => {
    return Array(end - start + 1).fill().map((_, idx) => start + idx);
};

const getLocaleDate = (localeName = 'de-DE', date, options) => {
    return Intl.DateTimeFormat(localeName, options).format(date);
};
const getTimestamp = date => {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();
};

const putZeroInFrontOfTimeSlot = timeSlot => (timeSlot < 10 ? '0' : '') + timeSlot;

const DatePicker = React.forwardRef((props, ref) => {
    const {cx} = useStyles(props, styles);
    const {value, onChange, defaultValue, timePlaceholder, hasTime, locale, qaIdent} = props;
    const {minDate} = props;
    const currentDayDate = new Date();
    const currentDayTimeStamp = getTimestamp(currentDayDate);
    const defaultDate = defaultValue ? new Date(defaultValue) : '';
    const daysName = moment.weekdaysMin(true);
    const months = moment.monthsShort();
    locale && moment.locale(locale);

    const [activeData, setActiveData] = useState({
        year: defaultValue ? defaultDate.getFullYear() : currentDayDate.getFullYear(),
        month: defaultValue ? defaultDate.getMonth() : currentDayDate.getMonth(),
        time: defaultValue
            ? `${putZeroInFrontOfTimeSlot(+defaultDate.getHours())}:${putZeroInFrontOfTimeSlot(+defaultDate.getMinutes())}`
            : `${putZeroInFrontOfTimeSlot(+currentDayDate.getHours())}:${putZeroInFrontOfTimeSlot(+currentDayDate.getMinutes())}`,
    });
    const [activeView, setActiveView] = useState(datePickerViews.DAYS_VIEW);
    const [rangeStartYear, setRangeStartYear] = useState(activeData.year - 11);

    useEffect(() => {
        const selected = new Date(value);
        if (isValidDate(selected)) {
            setActiveData({
                year: selected.getFullYear(),
                month: selected.getMonth(),
                time: `${putZeroInFrontOfTimeSlot(+selected.getHours())}:${putZeroInFrontOfTimeSlot(+selected.getMinutes())}`,
            });
        }
    }, [value]);

    const isValidDate = date => date instanceof Date && !isNaN(date.valueOf());

    const onTimeChangeHandler = selectedTime => {
        const timeSlotReg = /^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;
        if (timeSlotReg.test(selectedTime)) {
            const formatTimeSlot = selectedTime.split(':').map(slot => (slot.length < 2 ? `0${slot}` : slot)).join(':');
            const updatedDate = moment(`${moment(value).format('YYYY-MM-DD')}T${formatTimeSlot}`).toISOString();
            setActiveData({
                ...activeData,
                time: formatTimeSlot,
            });
            onChange(updatedDate);
        }
    };

    const onDateClickHandler = dayTimeStamp => {
        onChange(new Date(dayTimeStamp).toISOString());
    };

    const getNumberOfDays = (year, month) => {
        return 40 - new Date(year, month, 40).getDate();
    };

    // TODO this implementation needs refactoring as it is not usable for different locales
    const getOffset = () => {
        const firstDate = moment(new Date(activeData.year, activeData.month)).weekday();

        if (firstDate === 0) {
            return {
                monthFieldEndLine: 8,
                shouldMoveToSecondLine: false,
                dayOffsetLine: null,
            };
        }

        if (firstDate === 1 || firstDate === 2) {
            return {
                monthFieldEndLine: 8,
                shouldMoveToSecondLine: true,
                dayOffsetLine: firstDate + 1,
            };
        }

        return {
            monthFieldEndLine: firstDate + 1,
            shouldMoveToSecondLine: false,
            dayOffsetLine: null,
        };
    };

    const setPreviousMonth = () => {
        if (activeData.month === 0) {
            setActiveData({
                ...activeData,
                month: 11,
                year: activeData.year - 1,
            });
            return;
        }
        setActiveData({
            ...activeData,
            month: activeData.month - 1,
        });
    };

    const setNextMonth = () => {
        if (activeData.month === 11) {
            setActiveData({
                ...activeData,
                month: 0,
                year: activeData.year + 1,
            });
            return;
        }
        setActiveData({
            ...activeData,
            month: activeData.month + 1,
        });
    };

    const changeDatePickerView = () => {
        return activeView === datePickerViews.DAYS_VIEW
            ? setActiveView(datePickerViews.YEARS_VIEW) : setActiveView(datePickerViews.DAYS_VIEW);
    };

    const onYearClickHandler = year => {
        setActiveData({
            ...activeData,
            year,
        });
        setActiveView(datePickerViews.MONTHS_VIEW);
    };
    const onMonthClickHandler = month => {
        setActiveData({
            ...activeData,
            month,
        });
        setActiveView(datePickerViews.DAYS_VIEW);
    };
    const selectedTimeStamp = value
        ? getTimestamp(new Date(value)) : (defaultValue ? getTimestamp(new Date(defaultValue)) : '');
    const renderDaysArray = getRange(1, getNumberOfDays(activeData.year, activeData.month));
    const gridOffsets = getOffset();
    const renderYearsArray = getRange(rangeStartYear, rangeStartYear + 23);
    const isDisabledTimePicker = value => {
        const isoDateRegex = /(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})[+-](\d{2}):(\d{2})/;
        return !!isoDateRegex.test(value);
    };

    return (
        <div className={cx('ace-c-date-picker')} ref={ref} data-qa={qaIdent}>
            {activeView === datePickerViews.DAYS_VIEW && (
                <Fragment>
                    <div className={cx('ace-c-date-picker__header')}>
                        <ButtonGhost onClick={changeDatePickerView}>
                            <ButtonGhostContent icon={arrowDown} iconPosition="right">
                                {getLocaleDate(locale, new Date(activeData.year, activeData.month), {
                                    year: 'numeric', month: 'short',
                                })}
                            </ButtonGhostContent>
                        </ButtonGhost>
                        <div className={cx('ace-c-date-picker__header-arrow-wrapper')}>
                            <div
                                className={cx('ace-c-date-picker__header-arrow ace-c-date-picker__header-arrow--left')}
                                onClick={setPreviousMonth}
                            />
                            <div
                                className={cx('ace-c-date-picker__header-arrow ace-c-date-picker__header-arrow--right')}
                                onClick={setNextMonth}
                            />
                        </div>
                    </div>
                    <div className={cx('ace-c-date-picker__table')}>
                        <div className={cx('ace-c-date-picker__table-header')}>
                            {daysName.map(name => {
                                return (
                                    <div
                                        key={`table-header-${name}`}
                                        className={cx('ace-c-date-picker__table-header-cell')}
                                    >
                                        {name}
                                    </div>
                                );
                            })}
                        </div>
                        <div className={cx('ace-c-date-picker__date-table-body')}>
                            <div
                                className={cx('ace-c-date-picker__table-info')}
                                style={{gridColumn: `1 / ${gridOffsets.monthFieldEndLine}`}}
                            >
                                {getLocaleDate(locale, new Date(activeData.year, activeData.month), {
                                    year: 'numeric', month: 'short',
                                })}
                            </div>
                            {gridOffsets.shouldMoveToSecondLine && (
                                <div
                                    style={{
                                        gridRowStart: 2,
                                        gridColumnStart: 1,
                                        gridRowEnd: 3,
                                        gridColumnEnd: gridOffsets.dayOffsetLine,
                                    }}
                                />
                            )}
                            {renderDaysArray.map(day => {
                                const hours = activeData.time.split(':')[0];
                                const minutes = activeData.time.split(':')[1];
                                const dayTimeStamp = new Date(activeData.year, activeData.month, day).getTime();
                                const dayTimeStampWithHoursAndMinutes = new Date('' + activeData.year, '' + activeData.month, '' + day, hours, minutes).getTime();
                                const timeStamp = hasTime ? dayTimeStampWithHoursAndMinutes : dayTimeStamp;
                                const isDisabled = !!(minDate && isValidDate(new Date(minDate))
                                    && new Date(minDate).getTime() > dayTimeStamp);
                                return (
                                    <div
                                        key={`table-days-${day}`}
                                        className={cx('ace-c-date-picker__date-table-cell', {
                                            'ace-c-date-picker__date-table-cell--is-disabled': isDisabled,
                                            'ace-c-date-picker__date-table-cell--is-current-date': currentDayTimeStamp === dayTimeStamp,
                                            'ace-c-date-picker__date-table-cell--is-selected': selectedTimeStamp === dayTimeStamp,
                                        })}
                                        onClick={() => (!isDisabled ? onDateClickHandler(timeStamp) : null)}
                                    >
                                        {day}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </Fragment>
            )}
            {activeView === datePickerViews.YEARS_VIEW && (
                <Fragment>
                    <div className={cx('ace-c-date-picker__header')}>
                        <ButtonGhost onClick={changeDatePickerView}>
                            <ButtonGhostContent icon={arrowUp} iconPosition="right">
                                {`${rangeStartYear} - ${rangeStartYear + 23}`}
                            </ButtonGhostContent>
                        </ButtonGhost>
                        <div className={cx('ace-c-date-picker__header-arrow-wrapper')}>
                            <div
                                className={cx('ace-c-date-picker__header-arrow ace-c-date-picker__header-arrow--left')}
                                onClick={() => setRangeStartYear(rangeStartYear - 24)}
                            />
                            <div
                                className={cx('ace-c-date-picker__header-arrow ace-c-date-picker__header-arrow--right')}
                                onClick={() => setRangeStartYear(rangeStartYear + 24)}
                            />
                        </div>
                    </div>
                    <div className={cx('ace-c-date-picker__years-table-body')}>
                        {renderYearsArray.map(year => {
                            const isDisabled = !!(minDate && isValidDate(new Date(minDate))
                                && new Date(minDate).getFullYear() > year);
                            return (
                                <div
                                    key={`table-years-${year}`}
                                    className={cx('ace-c-date-picker__years-table-cell', {
                                        'ace-c-date-picker__years-table-cell--is-disabled': isDisabled,
                                        'ace-c-date-picker__years-table-cell--is-current': currentDayDate.getFullYear() === year,
                                        'ace-c-date-picker__years-table-cell--is-selected': activeData.year === year,
                                    })}
                                    onClick={() => (!isDisabled ? onYearClickHandler(year) : null)}
                                >
                                    {year}
                                </div>
                            );
                        })}
                    </div>
                </Fragment>
            )}
            {activeView === datePickerViews.MONTHS_VIEW && (
                <Fragment>
                    <div className={cx('ace-c-date-picker__header')}>
                        <ButtonGhost onClick={changeDatePickerView}>
                            <ButtonGhostContent icon={arrowUp} iconPosition="right">
                                {activeData.year}
                            </ButtonGhostContent>
                        </ButtonGhost>
                        <div className={cx('ace-c-date-picker__header-arrow-wrapper')}>
                            <div
                                className={cx('ace-c-date-picker__header-arrow ace-c-date-picker__header-arrow--left')}
                                onClick={() => setActiveData({
                                    ...activeData,
                                    year: activeData.year - 1,
                                })}
                            />
                            <div
                                className={cx('ace-c-date-picker__header-arrow ace-c-date-picker__header-arrow--right')}
                                onClick={() => setActiveData({
                                    ...activeData,
                                    year: activeData.year + 1,
                                })}
                            />
                        </div>
                    </div>
                    <div className={cx('ace-c-date-picker__months-table-body')}>
                        {months.map((month, idx) => {
                            const isDisabled = !!(minDate && isValidDate(new Date(minDate))
                                    && new Date(minDate).getMonth() > idx);
                            return (
                                <div
                                    key={`table-years-${month}`}
                                    className={cx('ace-c-date-picker__months-table-cell', {
                                        'ace-c-date-picker__months-table-cell--is-disabled': isDisabled,
                                        'ace-c-date-picker__months-table-cell--is-current': currentDayDate.getMonth() === idx,
                                        'ace-c-date-picker__months-table-cell--is-selected': activeData.month === idx,
                                    })}
                                    onClick={() => (!isDisabled ? onMonthClickHandler(idx) : null)}
                                >
                                    {month}
                                </div>
                            );
                        })}
                    </div>
                </Fragment>
            )}
            {hasTime
                && (
                    <Fragment>
                        <div className={cx('global!ace-u-margin--bottom-24')} />
                        <Divider />
                        <div
                            className={cx([
                                'ace-c-date-picker__input-time',
                                'global!ace-u-flex',
                                'global!ace-u-margin--top-24',
                                'global!ace-u-padding--0-24',
                            ])}
                        >
                            <InputTime
                                name="timeField"
                                value={activeData.time}
                                onChange={onTimeChangeHandler}
                                icon={arrowDown}
                                className={cx(['ace-c-input-time--small', 'global!ace-u-flex--grow-1'])}
                                isDisabled={!isDisabledTimePicker(value)}
                                placeholder={timePlaceholder}
                            />
                        </div>
                    </Fragment>
                )}
        </div>
    );
});

DatePicker.propTypes = {
    ...withFormContextPropTypes,
    minDate: PropTypes.string,
};

DatePicker.defaultProps = {
    ...withFormContextDefaultProps,
    minDate: '',
};

export default withFormContext({componentName: 'DatePicker'})(DatePicker);
