export const isRequired = "isRequired";
export const isEmail = "isEmail";
export const isPhone = "isPhone";
export const isIndex = "isIndex";
export const isCardNumber = "isCardNumber";
export const isCapitalSymbol = "isCapitalSymbol";
export const isContainDigit = "isContainDigit";
export const isLessThan = "min";
export const requiredIF = "requiredIF";

export const validateMethods = {
    isRequired,
    isEmail,
    isPhone,
    isIndex,
    isCardNumber,
    isCapitalSymbol,
    isContainDigit,
    isLessThan,
    requiredIF
};

export function validator(testData, config) {
    const errors = {};

    function validate(validateMethod, data, config) {
        let nextCheck = false;
        let notValid;
        switch (validateMethod) {
            case requiredIF: {
                if (Array.isArray(config.values)) {
                    if (config.values.includes(testData[config.inField])) {
                        if (typeof data === "boolean") {
                            notValid = !data;
                        } else {
                            notValid = data.trim() === "";
                        }

                        if (!notValid) nextCheck = true;
                    }
                }
                break;
            }
            case isRequired: {
                if (typeof data === "boolean") {
                    notValid = !data;
                } else {
                    notValid = data.trim() === "";
                }

                break;
            }
            case isEmail: {
                const emailRegExp =
                    /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i;
                notValid = !emailRegExp.test(data);
                break;
            }
            case isPhone: {
                const phoneRegExp =
                    /^[\+]?[0-9]{1,4} [(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/g;
                notValid = !phoneRegExp.test(data);
                break;
            }
            case isCardNumber: {
                const cardRegExp = /^[0-9]{4} [0-9]{4} [0-9]{4} [0-9]{4}$/g;
                notValid = !cardRegExp.test(data);
                break;
            }
            case isIndex: {
                const rusRegExp = /^\d{6}$/g;
                const usRegExp = /^\d{5}[-\s]\d{4}$/g;
                notValid = !(rusRegExp.test(data) || usRegExp.test(data));
                break;
            }
            case isCapitalSymbol: {
                const capitalRegExp = /[A-ZА-Я]+/g;
                notValid = !capitalRegExp.test(data);
                break;
            }
            case isContainDigit: {
                const digitRegExp = /\d+/g;
                notValid = !digitRegExp.test(data);
                break;
            }
            case isLessThan: {
                notValid = data.length < config.value;
                break;
            }
            default:
                break;
        }

        return { error: notValid && config.message, nextCheck };
    }

    for (const fieldName in testData) {
        const nestedConfig = config[fieldName];

        for (const method in nestedConfig) {
            const { error, nextCheck } = validate(
                method,
                testData[fieldName],
                nestedConfig[method]
            );

            if (error && !errors[fieldName]) {
                errors[fieldName] = error;
            }

            if (method === requiredIF) {
                if (nextCheck) continue;
                else break;
            }
        }
    }

    return errors;
}
