import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ExerciseGroupService } from './exerciseGroup.service';
import { CreateExerciseGroupDto,UpdateExerciseGroupDto } from './exerciseGroup.dto';
import { AuthGuard } from '@nestjs/passport/dist/auth.guard';
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

  @UseGuards(AuthGuard('jwt'))
  @Get()
  findAll() {
    return this.exerciseService.findAll();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.exerciseService.findOne(+id);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.ADMIN)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateExerciseGroupDto: UpdateExerciseGroupDto) {
    return this.exerciseService.update(+id, updateExerciseGroupDto);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.exerciseService.remove(+id);
  }
}
