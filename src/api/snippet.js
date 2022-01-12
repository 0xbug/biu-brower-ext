import axios from "axios";
import {getApiKey,getBaseUrl} from "@/utils/biu";

export const addSnippet = (data) => {
    return axios.request({
        url: getBaseUrl() + "/api/snippet",
        data,
        headers: {
            'Biu-Api-Key': getApiKey()
        },
        method: "post"
    });
};