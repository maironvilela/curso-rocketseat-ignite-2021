import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

import IDateProviders from "../models/IDateProviders";

dayjs.extend(utc);

class DayjsDateProvider implements IDateProviders {
  /*
  Verificar se há um intervalo de 24horas entre duas datas
*/
  compareDifference24h(startDate: Date, endDate: Date): boolean {
    const startDateFormatted = dayjs.utc(startDate);

    const endDateFormatted = dayjs.utc(endDate);

    const compare = dayjs
      .utc(endDateFormatted)
      .diff(startDateFormatted, "hour");

    const result = compare >= 24;

    return result;
  }

  /*
    retorna a diferença em dias entre duas datas
  */
  getDifferenceInHoursOfTwoDates(startDate: Date, endDate: Date): number {
    const startDateFormatted = dayjs.utc(startDate);

    const endDateFormatted = dayjs.utc(endDate);

    const compare = dayjs
      .utc(endDateFormatted)
      .diff(startDateFormatted, "hours");

    return compare;
  }

  addDays(days: number): Date {
    return dayjs().add(days, "day").toDate();
  }
}

export default DayjsDateProvider;
