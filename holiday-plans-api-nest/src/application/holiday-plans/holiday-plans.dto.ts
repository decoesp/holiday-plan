import { IsNotEmpty, IsDateString, IsOptional, IsArray } from 'class-validator';

export class CreateHolidayPlanDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;

  @IsDateString()
  date: Date;

  @IsOptional()
  location: string;

  @IsOptional()
  @IsArray()
  participants: string[];

  [key: string]: any;
  endDate?: string | number | Date;
}
