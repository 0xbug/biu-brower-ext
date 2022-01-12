import dayjs from "dayjs";

export const getTsTime = (ts) => {
    return dayjs.unix(ts).format('YYYY-MM-DD HH:mm:ss')
};

