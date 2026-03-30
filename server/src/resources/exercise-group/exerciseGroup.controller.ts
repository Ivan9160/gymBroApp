import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, ParseIntPipe } from '@nestjs/common';
import { ExerciseGroupService } from './exerciseGroup.service';
import { CreateExerciseGroupDto,UpdateExerciseGroupDto } from './exerciseGroup.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Role } from 'src/common/role.enum';
import { Roles } from 'src/auth/decorators/roles.decorator';



@Controller('exercise-groups')
export class ExerciseGroupController {
  constructor(private readonly exerciseService: ExerciseGroupService) {}

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.ADMIN)
  @Post()
  create(@Body() createExerciseGroupDto: CreateExerciseGroupDto) {
    return this.exerciseService.create(createExerciseGroupDto);
  }

  @Get()
  findAll() {
    return this.exerciseService.findAll();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.exerciseService.findOne(id);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.ADMIN)
  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateExerciseGroupDto: UpdateExerciseGroupDto) {
    return this.exerciseService.update(id, updateExerciseGroupDto);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.ADMIN)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.exerciseService.remove(id);
  }
}
