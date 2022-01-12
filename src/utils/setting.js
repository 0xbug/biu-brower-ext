import wsCache from "@/utils/storage";

export const getSetting = (key) => {
    return wsCache.get(key)
};

export const setSetting = (key, value) => {
    wsCache.set(key, value)
}