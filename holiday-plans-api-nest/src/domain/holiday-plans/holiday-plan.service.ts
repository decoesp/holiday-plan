import { Injectable, NotFoundException } from '@nestjs/common';
import { HolidayPlanRepository } from './holiday-plan.repository';
import { CreateHolidayPlanDto } from '../../application/holiday-plans/holiday-plans.dto';
import { HolidayPlan } from './holiday-plan.interface';

@Injectable()
export class HolidayPlanService {
  constructor(private readonly holidayPlanRepository: HolidayPlanRepository) {}

  async findAll(): Promise<HolidayPlan[]> {
    return this.holidayPlanRepository.findAll();
  }

  async findOne(id: string): Promise<HolidayPlan> {
    const holidayPlan = await this.holidayPlanRepository.findOne(id);
    if (!holidayPlan) {
      throw new NotFoundException('Holiday plan not found');
    }
    return holidayPlan;
  }

  async create(
    createHolidayPlanDto: CreateHolidayPlanDto,
  ): Promise<HolidayPlan> {
    return this.holidayPlanRepository.create(createHolidayPlanDto);
  }

  async update(
    id: string,
    updateHolidayPlanDto: CreateHolidayPlanDto,
  ): Promise<HolidayPlan> {
    const existingHolidayPlan = await this.findOne(id);
    const updatedHolidayPlan = {
      ...existingHolidayPlan,
      ...updateHolidayPlanDto,
    };
    return this.holidayPlanRepository.update(id, updatedHolidayPlan);
  }

  async delete(id: string): Promise<void> {
    await this.findOne(id);
    return this.holidayPlanRepository.delete(id);
  }
}
