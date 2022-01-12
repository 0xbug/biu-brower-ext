import wsCache from "@/utils/storage";

export const getAuthorization = () => wsCache.get("fofaAuth");

export const setAuthorization = auth => {
  wsCache.set('fofaAuth', auth);
}
