import httpService from "./http.service";
const endpoint = "label/";

const LabelService = {
    update: async (id, content) => {
        const { data } = await httpService.put(endpoint + id, content);
        return data;
    },
    get: async (id) => {
        const { data } = await httpService.get(endpoint + id);
        return data;
    },
    fetchAll: async () => {
        const { data } = await httpService.get(endpoint);
        return data;
    },
    create: async (content) => {
        const { data } = await httpService.post(endpoint, content);
        return data;
    },
    delete: async (id) => {
        const { data } = await httpService.delete(endpoint + id);
        return data;
    }
};
export default LabelService;
