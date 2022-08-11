function isOutdated(date) {
    return !date || Date.now() - date > 60 * 60 * 1000;
}

export default isOutdated;
