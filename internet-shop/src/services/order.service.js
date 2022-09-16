import httpService from "./http.service";
const endpoint = "order/";

const orderService = {
    get: async (type, userId) => {
        const { data } = await httpService.get(endpoint + `${type}/${userId}`);
        return data;
    },
    getItems: async (type, userId) => {
        const { data } = await httpService.get(
            endpoint + `items/${type}/${userId}`
        );
        return data;
    }
};
export default orderService;
