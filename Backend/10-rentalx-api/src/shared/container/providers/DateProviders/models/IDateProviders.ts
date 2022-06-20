interface IDateProviders {
  compareDifference24h(startDate: Date, endDate: Date): boolean;
  getDifferenceInHoursOfTwoDates(startDate: Date, endDate: Date): number;
  addDays(days: number): Date;
}

export default IDateProviders;
