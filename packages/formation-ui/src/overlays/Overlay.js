import React, {Fragment, useRef, useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import useStyles from '../useStyles';
import styles from './Overlay.module.scss';
import * as positions from './positions';

const Overlay = props => {
    const {children, id, type, position} = props;
    const {cx} = useStyles(props, styles);
    const containerRef = useRef(document.getElementById(`#overlay-${id}`) || document.createElement('div'));
    const [isContainerMounted] = useState(!!containerRef.current.parentElement);
    const containerClassName = cx('ace-c-overlay', `ace-c-overlay--${type}`);

    useEffect(() => {
        const containerElement = containerRef.current;

        if (!isContainerMounted) {
            containerElement.setAttribute('id', `overlay-${id}`);
            containerElement.className = containerClassName;

            // map given position value for the key, or reset it to null
            ['top', 'right', 'bottom', 'left'].forEach(positionKey => {
                containerElement.style[positionKey] = typeof position[positionKey] === 'number'
                    ? `${position[positionKey]}px` : null;
            });

            document.body.appendChild(containerElement);
        }

        return () => {
            if (containerElement.parentElement) {
                containerElement.parentElement.removeChild(containerElement);
            }
        };
    }, [id, position, isContainerMounted, containerClassName]);

    return (
        <Fragment>
            {ReactDOM.createPortal(
                children,
                containerRef.current,
            )}
        </Fragment>
    );
};

Overlay.propTypes = {
    id: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['modal', 'drop-down', 'tooltip']).isRequired,
    position: PropTypes.shape({
        top: PropTypes.number,
        bottom: PropTypes.number,
        left: PropTypes.number,
    }),
};

Overlay.defaultProps = {
    position: positions.DEFAULT_POSITION,
};

export default Overlay;
