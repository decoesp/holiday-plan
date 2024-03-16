import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { HolidayPlansService } from './holiday-plans.service';
import { CreateHolidayPlanDto } from './holiday-plans.dto';
import { HolidayPlan } from '../../domain/holiday-plans/holiday-plan.interface';

@Controller('holiday-plans')
export class HolidayPlansController {
  constructor(private readonly holidayPlansService: HolidayPlansService) {}

  @Get()
  async findAll(): Promise<HolidayPlan[]> {
    return this.holidayPlansService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<HolidayPlan> {
    return this.holidayPlansService.findOne(id);
  }

  @Post()
  async create(
    @Body() createHolidayPlanDto: CreateHolidayPlanDto,
  ): Promise<HolidayPlan> {
    const requiredFields = [
      'title',
      'description',
      'date',
      'location',
      'participants',
    ];
    for (const field of requiredFields) {
      if (!createHolidayPlanDto[field]) {
        throw new BadRequestException(`The '${field}' field is required.`);
      }
    }

    const startDate = new Date(createHolidayPlanDto.date);
    if (isNaN(startDate.getTime())) {
      throw new BadRequestException('Invalid date format for the start date.');
    }

    const currentDate = new Date();
    if (startDate <= currentDate) {
      throw new BadRequestException(
        'The start date of the holiday must be after the current date.',
      );
    }

    if (createHolidayPlanDto.endDate) {
      const endDate = new Date(createHolidayPlanDto.endDate);
      if (isNaN(endDate.getTime()) || endDate <= startDate) {
        throw new BadRequestException(
          'Invalid end date or end date must be after the start date.',
        );
      }
    }

    try {
      return this.holidayPlansService.create(createHolidayPlanDto);
    } catch (error) {
      throw new InternalServerErrorException('Failed to create holiday plan.');
    }
  }
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateHolidayPlanDto: CreateHolidayPlanDto,
  ): Promise<HolidayPlan> {
    try {
      return this.holidayPlansService.update(id, updateHolidayPlanDto);
    } catch (error) {
      throw new InternalServerErrorException('Failed to update holiday plan.');
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    try {
      await this.holidayPlansService.delete(id);
    } catch (error) {
      throw new InternalServerErrorException('Failed to delete holiday plan.');
    }
  }
}
