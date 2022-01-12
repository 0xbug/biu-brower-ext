import axios from "axios";
import {getApiKey,getBaseUrl} from "@/utils/biu";

export const getRecords = (params) => {
    return axios.request({
        url: getBaseUrl() + "/api/dnslog",
        params,
        headers: {
            'Biu-Api-Key': getApiKey()
        },
        method: "get"
    });
};