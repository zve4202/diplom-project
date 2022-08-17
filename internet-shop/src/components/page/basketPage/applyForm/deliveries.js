import payments from "./payments";
export default {
    russianPost: {
        value: "Russian Post",
        label: "Посылка через (ПОЧТА РОССИИ)",
        payment: payments.payOnDelivery
    },
    companySDEK: {
        value: "Company SDEK",
        label: "Посылка через (СДЭК)",
        payment: payments.sberbankReceipt
    },
    byCourier: {
        value: "By Courier",
        label: "Курьером по городу",
        payment: payments.cashInHand
    },
    pickupPoint: {
        value: "Pickup Point",
        label: "Пункт самовывоза",
        payment: payments.cashInHand
    }
};
