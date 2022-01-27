import {getSetting} from "@/utils/setting";

export const getAuthorization = () => getSetting("fofaAuth");
export const getApiHost = () => getSetting("fofaApiHost");
export const getWebHost = () => getSetting("fofaWebHost");