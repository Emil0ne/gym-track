import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { BodyMetricsService } from './body-metrics.service';
import { CreateBodyMetricDto } from './dto/create-body-metric.dto';
import { UpdateBodyMetricDto } from './dto/update-body-metric.dto';
import { AuthGuard } from '../auth/auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('body-metrics')
export class BodyMetricsController {
  constructor(private readonly bodyMetricsService: BodyMetricsService) {}

  @Post()
  create(@Request() req, @Body() createBodyMetricDto: CreateBodyMetricDto) {
    const userId = req.user.sub;
    return this.bodyMetricsService.create(userId, createBodyMetricDto);
  }

  @Get()
  findAll() {
    return this.bodyMetricsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bodyMetricsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateBodyMetricDto: UpdateBodyMetricDto,
  ) {
    return this.bodyMetricsService.update(+id, updateBodyMetricDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bodyMetricsService.remove(+id);
  }
}
