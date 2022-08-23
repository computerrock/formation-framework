import React from 'react';

const renderModals = params => {
    const {modals = [], activeModalIds = []} = params;
    const {history, location, match} = params;

    if (activeModalIds.length === 0) return null;

    const reversedModalIds = [...activeModalIds].reverse();
    let backdropAlreadyExists = false;
    const componentsArray = [];
    reversedModalIds.forEach(id => {
        const modalEntity = modals.find(modalEntity => modalEntity.id === id);
        if (modalEntity) {
            const showModalEntityBackdrop = modalEntity.hasBackdrop && backdropAlreadyExists
                ? false : modalEntity.hasBackdrop;
            backdropAlreadyExists = modalEntity.hasBackdrop || backdropAlreadyExists;
            componentsArray.push(React.createElement(modalEntity.component, {
                key: id,
                hasBackdrop: showModalEntityBackdrop,
                history,
                location,
                match,
            }));
        }
    });
    return componentsArray;
};

export default renderModals;
