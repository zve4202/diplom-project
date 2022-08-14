export const pathes = {
    editPath: "edit",
    ordersPath: "orders"
};
export const menu = {
    name: "users",
    caption: { name: "Профиль пользователя", icon: "bi-person" },
    items: [
        { path: pathes.ordersPath, name: "ЗАКАЗЫ", icon: "bi-cash" },
        { path: pathes.editPath, name: "ИЗМЕНИТЬ ДАННЫЕ", icon: "bi-gear" }
    ],
    afterChildren: true
};
