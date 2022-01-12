import wsCache from "@/utils/storage";

export const getApiKey = () => wsCache.get("apiKey");
export const getBaseUrl = () => wsCache.get("baseUrl");

export const setBaseUrl = url => {
  wsCache.set('baseUrl', url)
}
export const setApiKey = ak => {
  wsCache.set('apiKey', ak)
}