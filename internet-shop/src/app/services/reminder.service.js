import httpService from "./http.service";
const endPoint = "reminder/";

const reminderService = {
    update: async (id, content) => {
        const { data } = await httpService.put(endPoint + id, content);
        return data;
    },
    get: async (id) => {
        const { data } = await httpService.get(endPoint + id);
        return data;
    },
    fetchAll: async () => {
        const { data } = await httpService.get(endPoint);
        return data;
    },
    create: async (content) => {
        const { data } = await httpService.post(endPoint, content);
        return data;
    },
    delete: async (id) => {
        const { data } = await httpService.delete(endPoint + id);
        return data;
    },
    deleteAll: async (id) => {
        const { data } = await httpService.delete(endPoint);
        return data;
    }
};
export default reminderService;
