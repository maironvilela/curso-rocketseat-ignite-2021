import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

const dateFormat = (date: Date): dayjs.Dayjs => {
  const formatted = dayjs.utc(date);
  return formatted;
};

export { dateFormat };
