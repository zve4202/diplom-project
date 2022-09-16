export const pathes = {
    orderPath: "orders",
    userPath: "users",
    productPath: "products"
};
export const menu = {
    name: "admin",
    caption: { name: "Admin", icon: "bi-award" },
    items: [
        {
            path: pathes.orderPath,
            name: "ЗАКАЗЫ",
            icon: "bi-cart4"
        },
        {
            path: pathes.userPath,
            name: "ПОЛЬЗОВАТЕЛИ",
            icon: "bi-people-fill"
        },
        {
            path: pathes.productPath,
            name: "ТОВАРЫ",
            icon: "bi-cart-plus-fill"
        }
    ]
};
