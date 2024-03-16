import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { HolidayPlan } from './holiday-plan.interface';
import { CreateHolidayPlanDto } from '../../application/holiday-plans/holiday-plans.dto';

@Injectable()
export class HolidayPlanRepository {
  constructor(
    @InjectModel('HolidayPlan')
    private readonly holidayPlanModel: Model<HolidayPlan>,
  ) {}

  async findAll(): Promise<HolidayPlan[]> {
    return this.holidayPlanModel.find().exec();
  }

  async findOne(id: string): Promise<HolidayPlan> {
    const holidayPlan = await this.holidayPlanModel.findById(id).exec();
    if (!holidayPlan) {
      throw new NotFoundException('Holiday plan not found');
    }
    return holidayPlan;
  }
  async create(
    createHolidayPlanDto: CreateHolidayPlanDto,
  ): Promise<HolidayPlan> {
    const createdHolidayPlan = new this.holidayPlanModel(createHolidayPlanDto);
    return createdHolidayPlan.save();
  }

  async update(
    id: string,
    updateHolidayPlanDto: CreateHolidayPlanDto,
  ): Promise<HolidayPlan> {
    const updatedHolidayPlan = await this.holidayPlanModel
      .findByIdAndUpdate(id, updateHolidayPlanDto, { new: true })
      .exec();

    if (!updatedHolidayPlan) {
      throw new NotFoundException('Holiday plan not found');
    }

    return updatedHolidayPlan;
  }

  async delete(id: string): Promise<void> {
    await this.holidayPlanModel.findByIdAndDelete(id).exec();
  }
}
