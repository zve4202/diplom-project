import httpService from "./http.service";
const roleEndpoint = "role/";

const roleService = {
    update: async (id, content) => {
        const { data } = await httpService.put(roleEndpoint + id, content);
        return data;
    },
    get: async (id) => {
        const { data } = await httpService.get(roleEndpoint + id);
        return data;
    },
    fetchAll: async () => {
        const { data } = await httpService.get(roleEndpoint);
        return data;
    },
    create: async (content) => {
        const { data } = await httpService.post(roleEndpoint, content);
        return data;
    },
    delete: async (id) => {
        const { data } = await httpService.delete(roleEndpoint + id);
        return data;
    }
};
export default roleService;
