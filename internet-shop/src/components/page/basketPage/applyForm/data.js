import payments from "./payments";
import deliveries from "./deliveries";
export default {
    setId: {
        title: "Место доставки",
        value: "",
        component: "text|select",
        placeholder: "Например: Дом/ Работа/ К тёще... (их может быть много)",
        required: true
    },
    persone: {
        title: "Контактное лицо",
        value: "",
        component: "TextField",
        placeholder: "Например: ФИО, если доставка не вам",
        required: true,
        group: "persone"
    },
    phone: {
        title: "Телефон для связи",
        value: "",
        component: "TextField",
        placeholder: "Телефон для связи",
        required: [deliveries.byCourier, deliveries.pickupPoint],
        group: "persone",
        size: 4
    },
    delivery: {
        title: "Способ доставки",
        value: deliveries.russianPost.value,
        component: "SelectField",
        src: deliveries,
        group: "option"
    },
    payment: {
        title: "Способ оплаты",
        value: payments.payOnDelivery.value,
        component: "SelectField",
        src: payments,
        group: "option"
    },
    index: {
        title: "Почтовый индекс",
        value: "",
        component: "TextField",
        placeholder: "Требуется, если доставка в другой город",
        required: [deliveries.russianPost.value, deliveries.companySDEK.value],
        group: "address",
        size: 2
    },
    address: {
        title: "Адрес доставки",
        value: "",
        component: "TextField",
        placeholder: "Требуется, если доставка не в пункт самовывоза",
        required: [deliveries.russianPost.value, deliveries.companySDEK.value],
        group: "address"
    },
    note: {
        title: "Примечание",
        value: "",
        component: "textarea",
        placeholder: "Например: Домофон, другой номер телефона, ..."
    }
};
