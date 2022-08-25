import React from "react";

import payments from "./payments";
import deliveries from "./deliveries";
import {
    isLessThan,
    isPhone,
    isIndex,
    isRequired,
    requiredIF
} from "../../../../utils/validator";
import TextEdit from "../../../common/form/textEdit";
import MaskEdit from "../../../common/form/maskEdit";
import PlaceIdField from "./placeIdField";
import SelectEdit from "../../../common/form/selectEdit";
import MemoEdit from "../../../common/form/memoEdit";

const methonds = {
    [isRequired]: { message: "Обязательная информация!" },
    [isPhone]: { message: "Телефоный номер введён не корректно!" },
    [isIndex]: { message: "Почтовый индекс введён не корректно!" },
    [isLessThan]: {
        message: "В строке должно быть минимум 3 символа!",
        value: 3
    },
    [requiredIF]: {
        message: "Обязательная информация!",
        inField: "",
        values: []
    }
};

const getMethods = (name, rest) => {
    if (Array.isArray(name)) {
        let result = {};
        for (let i = 0; i < name.length; i++) {
            const arrName = name[i];
            const method = methonds[arrName];
            const other = (rest && rest[i]) || {};
            result = { ...result, [arrName]: { ...method, ...other } };
        }
        return result;
    } else {
        const method = methonds[name];
        return {
            [name]: { ...method, ...rest }
        };
    }
};

export default {
    placeId: {
        title: "Место доставки",
        value: "",
        component: (attr) => <PlaceIdField {...attr} />,
        placeholder: "Например: Дом/ Работа/ К тёще... (их может быть много)",
        required: getMethods([isRequired, isLessThan])
    },
    persone: {
        title: "Контактное лицо",
        value: "",
        component: (attr) => <TextEdit {...attr} nameCase={true} />,
        placeholder: "Например: ФИО, если доставка не вам",
        required: getMethods(isRequired),
        group: "persone"
    },
    phone: {
        title: "Телефон для связи",
        value: "",
        component: (attr) => <MaskEdit {...attr} type="phone" />,
        // component: (attr) => (<TextEdit {...attr} />),
        placeholder: "Телефон для связи",
        required: getMethods([isRequired, isPhone]),
        group: "persone",
        size: 4
    },
    delivery: {
        title: "Способ доставки",
        value: deliveries.byRussianPost.value,
        component: (attr) => <SelectEdit {...attr} />,
        src: deliveries,
        required: getMethods(isRequired),
        group: "option"
    },
    payment: {
        title: "Способ оплаты",
        value: payments.payOnDelivery.value,
        component: (attr) => <SelectEdit {...attr} />,
        src: payments,
        required: getMethods(isRequired),
        group: "option"
    },
    index: {
        title: "Почтовый индекс",
        value: "",
        component: (attr) => <MaskEdit {...attr} type="index" />,
        placeholder: "Требуется, если доставка в другой город",
        required: getMethods(
            [requiredIF, isIndex],
            [
                {
                    values: [
                        deliveries.byRussianPost.value,
                        deliveries.byCompanySDEK.value
                    ],
                    inField: "delivery"
                },
                null
            ]
        ),
        group: "address",
        size: 3
    },
    address: {
        title: "Адрес доставки",
        value: "",
        component: (attr) => <TextEdit {...attr} />,
        placeholder: "Требуется, если доставка не в пункт самовывоза",
        required: getMethods(requiredIF, {
            values: [
                deliveries.byRussianPost.value,
                deliveries.byCompanySDEK.value,
                deliveries.byCourier.value
            ],
            inField: "delivery"
        }),
        group: "address"
    },
    note: {
        title: "Примечание",
        value: "",
        component: (attr) => <MemoEdit {...attr} />,
        placeholder: "Например: Домофон, другой номер телефона, ..."
    }
};
