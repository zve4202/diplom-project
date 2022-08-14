export const pathes = {
    userPath: "users",
    productPath: "products"
};
export const menu = {
    name: "admin",
    caption: { name: "Admin", icon: "bi-award" },
    items: [
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
