import { isAfter } from "date-fns";
import addDays from "date-fns/addDays";
import differenceInHours from "date-fns/differenceInHours";

import IDateProviders from "../models/IDateProviders";

class DatefnsProvider implements IDateProviders {
  compareDifference24h(startDate: Date, endDate: Date): boolean {
    const result = isAfter(endDate, startDate);

    return result;
  }

  getDifferenceInHoursOfTwoDates(startDate: Date, endDate: Date): number {
    const result = differenceInHours(endDate, startDate);
    return result;
  }

  addDays(days: number): Date {
    return addDays(new Date(), days);
  }
}

export default DatefnsProvider;
