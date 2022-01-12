import axios from "axios";
import {getApiKey,getBaseUrl} from "@/utils/biu";

export const getProjects = (params) => {
    return axios.request({
        url: getBaseUrl() + "/api/project",
        params,
        headers: {
            'Biu-Api-Key': getApiKey()
        },
        method: "get"
    });
};
export const updateProject = (data) => {
    return axios.request({
        url: getBaseUrl() + "/api/project/optimize",
        data,
        headers: {
            'Biu-Api-Key': getApiKey()
        },
        method: "patch"
    });
};