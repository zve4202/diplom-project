export const isRequired = "isRequired";
export const isEmail = "isEmail";
export const isCapitalSymbol = "isCapitalSymbol";
export const isContainDigit = "isContainDigit";
export const isLessThan = "min";
export const requiredIF = "requiredIF";

export const validateMethods = {
    isRequired,
    isEmail,
    isCapitalSymbol,
    isContainDigit,
    isLessThan,
    requiredIF
};
export function validator(testData, config) {
    const errors = {};
    console.log("needValidate validateMethod config, data:", config, testData);

    function validate(validateMethod, data, config) {
        let needValidate;
        switch (validateMethod) {
            case requiredIF: {
                if (Array.isArray(config.values)) {
                    if (config.values.includes(testData[config.inField])) {
                        if (typeof data === "boolean") {
                            needValidate = !data;
                        } else {
                            needValidate = data.trim() === "";
                        }
                    }
                }
                console.log(
                    "needValidate validateMethod config, data:",
                    needValidate,
                    validateMethod,
                    config,
                    data
                );
                break;
            }
            case isRequired: {
                if (typeof data === "boolean") {
                    needValidate = !data;
                } else {
                    needValidate = data.trim() === "";
                    console.log(
                        "needValidate validateMethod config, data:",
                        needValidate,
                        validateMethod,
                        config,
                        data
                    );
                }

                break;
            }
            case isEmail: {
                const emailRegExp =
                    /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i;
                needValidate = !emailRegExp.test(data);
                break;
            }
            case isCapitalSymbol: {
                const capitalRegExp = /[A-ZА-Я]+/g;
                needValidate = !capitalRegExp.test(data);
                break;
            }
            case isContainDigit: {
                const digitRegExp = /\d+/g;
                needValidate = !digitRegExp.test(data);
                break;
            }
            case isLessThan: {
                needValidate = data.length < config.value;
                break;
            }
            default:
                break;
        }
        if (needValidate) return config.message;
    }

    for (const fieldName in testData) {
        for (const validateMethod in config[fieldName]) {
            const error = validate(
                validateMethod,
                testData[fieldName],
                config[fieldName][validateMethod]
            );
            if (error && !errors[fieldName]) {
                errors[fieldName] = error;
            }
        }
    }

    return errors;
}
