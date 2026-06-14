import { Injectable } from '@nestjs/common';
import { CreateBodyMetricDto } from './dto/create-body-metric.dto';
import { UpdateBodyMetricDto } from './dto/update-body-metric.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class BodyMetricsService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, createBodyMetricDto: CreateBodyMetricDto) {
    return this.prisma.bodyMetricLog.create({
      data: {
        userId: userId,
        weight: createBodyMetricDto.weight,
        chest: createBodyMetricDto.chest,
        waist: createBodyMetricDto.waist,
        biceps: createBodyMetricDto.biceps,
      },
    });
  }

  findAll() {
    return `This action returns all bodyMetrics`;
  }

  findOne(id: string) {
    return `This action returns a #${id} bodyMetric`;
  }

  update(id: string, updateBodyMetricDto: UpdateBodyMetricDto) {
    return `This action updates a #${id} bodyMetric`;
  }

  remove(id: string) {
    return `This action removes a #${id} bodyMetric`;
  }
}
