let timer;
export default (fn, ms) => {
    return function () {
        const fnCall = () => fn.apply(this, arguments);
        clearTimeout(timer);
        timer = setTimeout(fnCall, ms);
    };
};
