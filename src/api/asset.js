import axios from "axios";
import {getApiKey,getBaseUrl} from "@/utils/biu";

export const getAssetInfo = (params) => {
    return axios.request({
        url: getBaseUrl() + "/api/asset/search",
        params,
        headers: {
            'Biu-Api-Key': getApiKey()
        },
        method: "get"
    });
};