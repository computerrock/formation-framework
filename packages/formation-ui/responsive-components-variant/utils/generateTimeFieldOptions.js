const generateTimeFieldOptions = () => {
    const options = [];
    for (let hours = 0; hours < 24; hours += 1) {
        const hoursString = hours < 10 ? `0${hours}` : hours;
        for (let minutes = 0; minutes < 60; minutes += 5) {
            const minutesString = minutes < 10 ? `0${minutes}` : minutes;
            options.push(`${hoursString}:${minutesString}`);
        }
    }
    return options;
};

export default generateTimeFieldOptions;
