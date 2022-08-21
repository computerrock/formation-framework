import React from 'react';
import {Overlay} from '@computerrock/formation-ui';
import parseSearchQueryParams from './parseSearchQueryParams';

const renderModals = params => {
    const {modals = [], history, location, match, closeAllModals} = params;
    const {modal: activeModalIds = []} = parseSearchQueryParams(location.search);
    if (activeModalIds.length === 0) return null;

    const modalsHash = modals.reduce((modalsHash, modalConfig) => {
        modalsHash[modalConfig.id] = modalConfig;
        return modalsHash;
    }, {});

    // TODO temporary workaround for getting into locked state when app is refreshed with open modal
    if (history.action === 'POP') {
        closeAllModals();
        return [];
    }

    let isBackdropRendered = false;
    const modalElements = [];
    (Array.isArray(activeModalIds) ? activeModalIds : [activeModalIds])
        .reverse()
        .forEach(modalId => {
            const modalConfig = modalsHash[modalId];
            if (modalConfig) {
                const showModalBackdrop = modalConfig.hasBackdrop && isBackdropRendered
                    ? false : modalConfig.hasBackdrop;
                isBackdropRendered = modalConfig.hasBackdrop || isBackdropRendered;
                modalElements.push(
                    <Overlay
                        type="modal"
                        id={modalConfig.id}
                        key={modalConfig.id}
                        position={{
                            top: 0,
                            bottom: 0,
                            left: 0,
                            right: 0,
                        }}
                    >
                        {React.createElement(modalConfig.component, {
                            key: modalConfig.id,
                            hasBackdrop: showModalBackdrop,
                            history,
                            location,
                            match,
                        })}
                    </Overlay>,
                );
            }
        });

    return modalElements;
};

export default renderModals;
