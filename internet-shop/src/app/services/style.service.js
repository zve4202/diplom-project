import httpService from "./http.service";
const endpoint = "style/";

const originService = {
    fetchAll: async () => {
        const { data } = await httpService.get(endpoint);
        return data;
    }
};
export default originService;
