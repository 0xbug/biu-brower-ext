import axios from "axios";
import {getAuthorization, getApiHost,getWebHost} from "@/utils/fofa";

export const getHostInfo = (host) => {
    return axios.request({
        url: "https://" + getWebHost() + "/hosts/" + host,
        method: "get"
    });
};
export const getHostComponentsInfo = (host) => {

    return axios.request({
        url: "https://" + getApiHost() + "/v1/host/" + host,
        headers: {'Authorization': getAuthorization()},
        method: "get"
    });
};