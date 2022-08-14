function isOutdated(date, minute = 60) {
    return !date || Date.now() - date > minute * 60 * 1000;
}

export default isOutdated;
