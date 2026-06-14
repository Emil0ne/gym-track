import { Controller, Get, Post, Put, Delete, Body, Param, Headers, UnauthorizedException } from '@nestjs/common';
import { TrainingPlansService } from './training-plans.service';
import { JwtService } from '@nestjs/jwt';

@Controller('training-plans')
export class TrainingPlansController {
  constructor(
    private readonly trainingPlansService: TrainingPlansService,
    private readonly jwtService: JwtService,
  ) {}

  private getUserIdFromToken(authHeader: string): string {
    if (!authHeader) throw new UnauthorizedException('Brak tokenu dostępu');
    try {
      const token = authHeader.split(' ')[1].replace(/"/g, '');
      const decoded = this.jwtService.verify(token);
      return decoded.sub;
    } catch {
      throw new UnauthorizedException('Nieprawidłowy token');
    }
  }

  @Get()
  async getPlans(@Headers('authorization') authHeader: string) {
    const userId = this.getUserIdFromToken(authHeader);
    return this.trainingPlansService.getUserPlans(userId);
  }

  @Post()
  async createPlan(@Headers('authorization') authHeader: string, @Body() data: any) {
    const userId = this.getUserIdFromToken(authHeader);
    return this.trainingPlansService.createPlan(userId, data);
  }

  @Put(':id')
  async updatePlan(
    @Param('id') id: string,
    @Headers('authorization') authHeader: string,
    @Body() data: any,
  ) {
    const userId = this.getUserIdFromToken(authHeader);
    return this.trainingPlansService.updatePlan(id, userId, data);
  }

  @Delete(':id')
  async deletePlan(@Param('id') id: string, @Headers('authorization') authHeader: string) {
    const userId = this.getUserIdFromToken(authHeader);
    return this.trainingPlansService.deletePlan(id, userId);
  }
}