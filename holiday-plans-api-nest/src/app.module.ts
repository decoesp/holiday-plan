import { Module } from '@nestjs/common';
import { HolidayPlansModule } from './application/holiday-plans/holiday-plans.module';
import { DatabaseModule } from './infrastructure/database/database.module';

@Module({
  imports: [HolidayPlansModule, DatabaseModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
