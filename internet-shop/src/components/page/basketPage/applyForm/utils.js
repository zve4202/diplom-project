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
