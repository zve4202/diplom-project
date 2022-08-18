export function validator(data, config) {
    const errors = {};
    function validate(testName, data, config) {
        let statusValidate;
        switch (testName) {
            case "isRequired": {
                if (typeof data === "boolean") {
                    statusValidate = !data;
                } else {
                    statusValidate = data.trim() === "";
                }
                break;
            }
            case "isEmail": {
                const emailRegExp = /^\S+@\S+\.\S+$/g;
                statusValidate = !emailRegExp.test(data);
                break;
            }
            case "isCapitalSymbol": {
                const capitalRegExp = /[A-ZА-Я]+/g;
                statusValidate = !capitalRegExp.test(data);
                break;
            }
            case "isContainDigit": {
                const digitRegExp = /\d+/g;
                statusValidate = !digitRegExp.test(data);
                break;
            }
            case "min": {
                statusValidate = data.length < config.value;
                break;
            }
            default:
                break;
        }
        if (statusValidate) return config.message;
    }

    for (const field in data) {
        for (const testName in config[field]) {
            const error = validate(
                testName,
                data[field],
                config[field][testName]
            );
            if (error && !errors[field]) {
                errors[field] = error;
            }
        }
    }
    return errors;
}
