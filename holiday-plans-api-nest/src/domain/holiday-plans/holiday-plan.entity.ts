export interface HolidayPlan {
  _id: string;
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  date: Date;
  location: string;
  participants: string[];
}
