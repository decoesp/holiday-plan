import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class HolidayPlan extends Document {
  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop()
  startDate: Date;

  @Prop()
  endDate: Date;

  @Prop()
  location?: string;

  @Prop()
  participants?: string[];
}

export const HolidayPlanSchema = SchemaFactory.createForClass(HolidayPlan);
