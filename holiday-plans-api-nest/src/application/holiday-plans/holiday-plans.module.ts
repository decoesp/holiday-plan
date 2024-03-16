import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HolidayPlansController } from './holiday-plans.controller';
import { HolidayPlansService } from './holiday-plans.service';
import {
  HolidayPlan,
  HolidayPlanSchema,
} from '../../infrastructure/database/holiday-plan.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: HolidayPlan.name, schema: HolidayPlanSchema },
    ]),
  ],
  controllers: [HolidayPlansController],
  providers: [HolidayPlansService],
})
export class HolidayPlansModule {}
