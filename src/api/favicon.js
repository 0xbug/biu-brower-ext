import axios from "axios";
import {mmh3} from "@/utils/mmh3";

export const getFaviconHash = (url) => {
    // 待开发

    if (url) {
        if (url.indexOf(';base64,') > -1) {
            url = url.split(';base64,')[1];
            return mmh3(url);
        } else {
            return axios.request({
                url: url,
                responseType: 'arraybuffer',
                method: "get"
            }).then(response => {
                return mmh3(response.data)
                // let reader = new window.FileReader();
                // reader.readAsDataURL(response.data);
                // reader.onload = function () {
                //     let imageDataUrl = reader.result;
                //     url = imageDataUrl.split(';base64,')[1]
                //     return mmh3(url)
                // }
            });
        }
    }

};