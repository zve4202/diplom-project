import {
    byRussianPost,
    byCompanySDEK,
    byCourier,
    onPickupPoint
} from "./deliveries";

export const payOnDelivery = {
    value: "Pay On Delivery",
    label: "Наложенный платеж",
    visible: [byRussianPost.value]
};
export const acquiring = {
    value: "Acquiring",
    label: "Банковской картой",
    visible: [
        byRussianPost.value,
        byCompanySDEK.value,
        byCourier.value,
        onPickupPoint.value
    ]
};
export const sberbankReceipt = {
    value: "Sberbank Receipt",
    label: "Квитанция СБЕРБАНКа",
    visible: [
        byRussianPost.value,
        byCompanySDEK.value,
        byCourier.value,
        onPickupPoint.value
    ]
};
export const cashInHand = {
    value: "Cash In Hand",
    label: "Наличными представителю",
    visible: [byCourier.value, onPickupPoint.value]
};

export default {
    payOnDelivery,
    acquiring,
    sberbankReceipt,
    cashInHand
};
