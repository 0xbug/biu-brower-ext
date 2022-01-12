import axios from "axios";

export const getHTTPResponse = (url, method = "get") => {
    return axios.request({
        url: url,
        method: method
    });
};