import httpService from "./http.service";
const endpoint = "basket/";

const basketService = {
    get: async () => {
        const { data } = await httpService.get(endpoint);
        return data;
    },
    getItems: async (id) => {
        const { data } = await httpService.get(endpoint + id);
        return data;
    },
    update: async (content) => {
        const { data } = await httpService.put(endpoint, content);
        return data;
    },
    delete: async (id) => {
        const { data } = await httpService.delete(endpoint + id);
        return data;
    },
    deleteAll: async (id) => {
        const { data } = await httpService.delete(endpoint + `all/${id}`);
        return data;
    }
    // create: async (content) => {
    //     const { data } = await httpService.post(endpoint, content);
    //     return data;
    // }
};
export default basketService;
