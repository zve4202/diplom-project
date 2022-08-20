import React from "react";

import payments from "./payments";
import deliveries from "./deliveries";
import { isRequired, requiredIF } from "../../../../utils/validator";
import TextEdit from "../../../common/form/textEdit";
import MaskEdit from "../../../common/form/maskEdit";
import PlaceIdField from "./placeIdField";
import SelectEdit from "../../../common/form/selectEdit";
import MemoEdit from "../../../common/form/memoEdit";

const methonds = {
    [isRequired]: { message: "Обязательно для заполнения" },
    [requiredIF]: {
        message: "Обязательно для заполнения",
        inField: "",
        values: []
    }
};

const getMethod = (name, rest) => {
    const method = methonds[name];
    return {
        [name]: { ...method, ...rest }
    };
};

export default {
    placeId: {
        title: "Место доставки",
        value: "",
        component: (attr) => <PlaceIdField {...attr} />,
        placeholder: "Например: Дом/ Работа/ К тёще... (их может быть много)",
        required: getMethod(isRequired)
    },
    persone: {
        title: "Контактное лицо",
        value: "",
        component: (attr) => <TextEdit {...attr} nameCase={true} />,
        placeholder: "Например: ФИО, если доставка не вам",
        required: getMethod(isRequired),
        group: "persone"
    },
    phone: {
        title: "Телефон для связи",
        value: "",
        component: (attr) => <MaskEdit {...attr} type="phone" />,
        // component: (attr) => (<TextEdit {...attr} />),
        placeholder: "Телефон для связи",
        required: getMethod(isRequired),
        group: "persone",
        size: 4
    },
    delivery: {
        title: "Способ доставки",
        value: deliveries.russianPost.value,
        component: (attr) => <SelectEdit {...attr} />,
        src: deliveries,
        group: "option"
    },
    payment: {
        title: "Способ оплаты",
        value: payments.payOnDelivery.value,
        component: (attr) => <SelectEdit {...attr} />,
        src: payments,
        group: "option"
    },
    index: {
        title: "Почтовый индекс",
        value: "",
        component: (attr) => <MaskEdit {...attr} type="index" />,
        placeholder: "Требуется, если доставка в другой город",
        required: getMethod(requiredIF, {
            values: [
                deliveries.russianPost.value,
                deliveries.companySDEK.value
            ],
            inField: "delivery"
        }),
        group: "address",
        size: 3
    },
    address: {
        title: "Адрес доставки",
        value: "",
        component: (attr) => <TextEdit {...attr} />,
        placeholder: "Требуется, если доставка не в пункт самовывоза",
        required: getMethod(requiredIF, {
            values: [
                deliveries.russianPost.value,
                deliveries.companySDEK.value,
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
