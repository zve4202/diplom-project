import httpService from "./http.service";
const endpoint = "order/";

const orderService = {
    get: async (type) => {
        const { data } = await httpService.get(endpoint + type);
        return data;
    },
    getItems: async (type) => {
        const { data } = await httpService.get(endpoint + `items/${type}`);
        return data;
    }
};
export default orderService;
