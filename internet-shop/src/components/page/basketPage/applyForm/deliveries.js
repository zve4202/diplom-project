export const byRussianPost = {
    value: "Russian Post",
    label: "Посылка через (ПОЧТА РОССИИ)",
    payment: "Pay On Delivery",
    deliveryPrice: 450
};
export const byCompanySDEK = {
    value: "Company SDEK",
    label: "Посылка через (СДЭК)",
    payment: "Sberbank Receipt",
    deliveryPrice: 550
};
export const byCourier = {
    value: "By Courier",
    label: "Курьером по городу",
    payment: "Cash In Hand",
    deliveryPrice: 400
};
export const onPickupPoint = {
    value: "Pickup Point",
    label: "Пункт самовывоза",
    payment: "Cash In Hand",
    deliveryPrice: 50
};

export function getDeliveryBy(value) {
    return [byRussianPost, byCompanySDEK, byCourier, onPickupPoint].find(
        (item) => item.value === value
    );
}

export default {
    byRussianPost,
    byCompanySDEK,
    byCourier,
    onPickupPoint
};
