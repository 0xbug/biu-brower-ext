import axios from "axios";
import {getApiKey, getBaseUrl} from "@/utils/biu";

export const getFaviconHash = (favIconUrl) => {
        return axios.request({
            url: favIconUrl,
            responseType: 'blob',
            method: "get"
        }).then(res => {
            let content = new File([res.data], "file");
            let formData = new FormData();
            formData.append("file", content);
            return axios.request({
                url: getBaseUrl() + "/api/favicon/upload/search",
                data: formData,
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Biu-Api-Key': getApiKey()
                },
                method: 'post'
            });
        })


    }
;