import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HolidayPlan, HolidayPlanSchema } from './holiday-plan.model';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/mydatabase'),
    MongooseModule.forFeature([
      { name: HolidayPlan.name, schema: HolidayPlanSchema },
    ]),
  ],
  exports: [MongooseModule],
})
export class DatabaseModule {}
