import axios from "axios";
import {getAuthorization} from "@/utils/fofa";

export const getHostInfo = (host) => {
    return axios.request({
        url: "https://fofa.so/hosts/" + host,
        method: "get"
    });
};
export const getHostComponentsInfo = (host) => {

    return axios.request({
        url: "https://api.fofa.so/v1/host/" + host,
        headers: {'Authorization': getAuthorization()},
        method: "get"
    });
};