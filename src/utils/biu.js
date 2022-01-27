import {getSetting, setSetting} from "@/utils/setting";

export const getApiKey = () => getSetting("apiKey");
export const getBaseUrl = () => getSetting("baseUrl");

export const setBaseUrl = url => {
    setSetting('baseUrl', url)
}
export const setApiKey = ak => {
    setSetting('apiKey', ak)
}