import payments from "./payments";
import deliveries from "./deliveries";
export default {
    setId: {
        title: "Место доставки",
        value: "",
        type: "text",
        placeholder: "Например: Дом/ Работа/ К тёще... (их может быть много)",
        required: true
    },
    persone: {
        title: "Контактное лицо",
        value: "",
        type: "text",
        placeholder: "Например: ФИО, если доставка не вам",
        required: true,
        group: "persone",
        size: 8
    },
    phone: {
        title: "Телефон для связи",
        value: "",
        type: "text",
        placeholder: "Телефон для связи",
        required: [deliveries.byCourier, deliveries.pickupPoint],
        group: "persone",
        size: 4
    },
    delivery: {
        title: "Способ доставки",
        value: deliveries.russianPost,
        type: "select",
        src: deliveries,
        group: "option"
    },
    payment: {
        title: "Способ оплаты",
        value: payments.payOnDelivery,
        type: "select",
        src: payments,
        group: "option"
    },
    index: {
        title: "Почтовый индекс",
        value: "",
        type: "text",
        placeholder: "Требуется, если доставка в другой город",
        required: [deliveries.russianPost, deliveries.companySDEK],
        group: "address",
        size: 2
    },
    address: {
        title: "Адрес доставки",
        value: "",
        type: "text",
        placeholder: "Требуется, если доставка не в пункт самовывоза",
        required: [deliveries.russianPost, deliveries.companySDEK],
        group: "address",
        size: 10
    },
    note: {
        title: "Примечание",
        value: "",
        type: "textarea",
        placeholder: "Например: Домофон, другой номер телефона, ..."
    }
};
