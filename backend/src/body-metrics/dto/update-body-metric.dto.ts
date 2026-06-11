import { PartialType } from '@nestjs/mapped-types';
import { CreateBodyMetricDto } from './create-body-metric.dto';

export class UpdateBodyMetricDto extends PartialType(CreateBodyMetricDto) {}
