import httpService from "./http.service";
const categoryEndpoint = "category/";

const categoryService = {
    update: async (id, content) => {
        const { data } = await httpService.put(categoryEndpoint + id, content);
        return data;
    },
    get: async (id) => {
        const { data } = await httpService.get(categoryEndpoint + id);
        return data;
    },
    fetchAll: async () => {
        const { data } = await httpService.get(categoryEndpoint);
        return data;
    },
    create: async (content) => {
        const { data } = await httpService.post(categoryEndpoint, content);
        return data;
    },
    delete: async (id) => {
        const { data } = await httpService.delete(categoryEndpoint + id);
        return data;
    }
};
export default categoryService;
