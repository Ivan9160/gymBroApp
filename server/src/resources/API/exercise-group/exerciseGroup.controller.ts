import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, ParseIntPipe } from '@nestjs/common';
import { ExerciseGroupService } from './exerciseGroup.service';
import { CreateExerciseGroupDto,UpdateExerciseGroupDto } from './exerciseGroup.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Role } from '@prisma/client';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';



@Controller('exercise-groups')
export class ExerciseGroupController {
  constructor(private readonly exerciseService: ExerciseGroupService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Post()
  create(@Body() createExerciseGroupDto: CreateExerciseGroupDto) {
    return this.exerciseService.create(createExerciseGroupDto);
  }

  @Get()
  findAll() {
    return this.exerciseService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.exerciseService.findOne(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateExerciseGroupDto: UpdateExerciseGroupDto) {
    return this.exerciseService.update(id, updateExerciseGroupDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.exerciseService.remove(id);
  }
}
