import { Test, TestingModule } from '@nestjs/testing';
import { ProficiencyService } from './proficiency.service';
import { WorkoutService } from '../../API/workout/workout.service';
import { ExerciseGroupService } from '../../API/exercise-group/exerciseGroup.service';
import { UserService } from '../../API/user/user.service';

describe('ProficiencyService', () => {
  let service: ProficiencyService;

  const mockWorkoutService = { findAllByUserId: jest.fn() };
  const mockGroupService = { findAll: jest.fn() };
  const mockUserService = { findById: jest.fn() };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProficiencyService,
        { provide: WorkoutService, useValue: mockWorkoutService },
        { provide: ExerciseGroupService, useValue: mockGroupService },
        { provide: UserService, useValue: mockUserService },
      ],
    }).compile();

    service = module.get<ProficiencyService>(ProficiencyService);
  });

  it('Should calculate proficiency for all muscle groups', async () => {
    const userId = 1;
    mockGroupService.findAll.mockResolvedValue([{ id: 1, name: 'Chest' }]);
    mockUserService.findById.mockResolvedValue({ weight: 80, gender: 'MALE' });
    
    mockWorkoutService.findAllByUserId.mockResolvedValue([
      {
        createdAt: new Date(), 
        sets: [
          {
            weight: 100,
            reps: 5,
            createdAt: new Date(),
            exercise: {
              exerciseGroupId: 1,
              factor: 1,
              benchmark: 100,
              isBodyweight: false
            }
          }
        ]
      }
    ]);

    const result = await service.getProficiencyForAllMuscleGroups(userId);
    console.log('Test Result:', JSON.stringify(result, null, 2));

    expect(result[0].proficiency).toBeCloseTo(1.24, 1);
  });

  it('Should return 0 for untrained muscle groups', async () => {
    mockGroupService.findAll.mockResolvedValue([{ id: 2, name: 'Legs' }]);
    mockWorkoutService.findAllByUserId.mockResolvedValue([]); 

    const result = await service.getProficiencyForAllMuscleGroups(1);
    expect(result[0].proficiency).toBe(0);
  });

  it('Should apply decay correctly', async () => {
    const userId = 1;
    const now = new Date();
    const pastDate = new Date(now.getTime() - 30 * 24 * 3600 * 1000);  // 30 days ago
    const recentDate = new Date(now.getTime() - 10 * 24 * 3600 * 1000); // 10 days ago
    mockGroupService.findAll.mockResolvedValue([{ id: 1, name: 'Chest' }]);
    mockUserService.findById.mockResolvedValue({ weight: 80, gender: 'MALE' });
    
    mockWorkoutService.findAllByUserId.mockResolvedValue([
      {
        createdAt: new Date(), 
        sets: [
          {
            weight: 100,
            reps: 5,
            createdAt: now,
            exercise: {
              exerciseGroupId: 1,
              factor: 1,
              benchmark: 100,
              isBodyweight: false
            }
          },
          {
            weight: 80,
            reps: 5,
            createdAt: recentDate,
            exercise: {
              exerciseGroupId: 1,
              factor: 1,
              benchmark: 100,
              isBodyweight: false
            }
          },
          {
            weight: 60,
            reps: 5,
            createdAt: pastDate,
            exercise: {
              exerciseGroupId: 1,
              factor: 1,
              benchmark: 100,
              isBodyweight: false
            }
          } 
        ]
      }
    ]);
    const result = await service.getProficiencyForAllMuscleGroups(userId);
    console.log('Decay Test Result:', JSON.stringify(result, null, 2));
    expect(result[0].proficiency).toBeCloseTo(0.97, 1);
  })

  it('Should apply gender and bodyweight modifiers correctly', async () => {
    const userId = 1;
    mockGroupService.findAll.mockResolvedValue([{ id: 1, name: 'Chest' }]);
    mockUserService.findById.mockResolvedValue({ weight: 70, gender: 'female' });
    
    mockWorkoutService.findAllByUserId.mockResolvedValue([  
      {
        createdAt: new Date(), 
        sets: [{
            weight: 100,
            reps: 5,
            createdAt: new Date(),
            exercise: {
              exerciseGroupId: 1,
              factor: 1,
              benchmark: 100,
              isBodyweight: false
            }
          }
        ]
      }
    ]);
    const result = await service.getProficiencyForAllMuscleGroups(userId);
    console.log('Gender and Bodyweight Test Result:', JSON.stringify(result, null, 2));
    expect(result[0].proficiency).toBeCloseTo(2.27, 1);
  })
});