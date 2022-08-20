import defMap from "./data";

export const valueOfName = (name) => {
    const value = defMap[name].value;
    if (typeof value === "string") {
        return value;
    }

    return value.value;
};

export const createGroups = (data) => {
    const result = {};
    Object.keys(data).forEach((key) => {
        if (data[key].group) {
            const group = result[data[key].group] || [];
            group.push(key);
            result[data[key].group] = group;
        } else {
            result[key] = key;
        }
    });

    return result;
};

export const validatorConfig = {};
export const defaultData = {};

export const createDefaults = () => {
    if (Object.keys(defaultData).length > 0) return;
    Object.keys(defMap).forEach((key) => {
        defaultData[key] = valueOfName(key);
        creatValidConfiguration(key);
    });
};

function addValidatorConfig(name, data) {
    if (validatorConfig[name]?.message) return;

    validatorConfig[name] = { ...data };
}

function creatValidConfiguration(name) {
    const item = defMap[name];

    if (item.required) {
        addValidatorConfig(name, item.required);
    }
}
