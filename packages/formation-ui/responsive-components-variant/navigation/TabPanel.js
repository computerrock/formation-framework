import {useContext} from 'react';
import PropTypes from 'prop-types';
import TabSetContext from './TabSetContext';

const TabPanel = props => {
    const {children, for: forTab} = props;
    const {activeTab} = useContext(TabSetContext);

    return activeTab === forTab ? children : null;
};

TabPanel.propTypes = {
    for: PropTypes.string.isRequired,
};

export default TabPanel;
