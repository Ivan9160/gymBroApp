import { Controller } from '@nestjs/common';
import { UserSummaryService } from './userSummary.service';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Get } from '@nestjs/common';
import { CurrentUser } from 'src/auth/decorators/get-user.decorator';
import { User } from '@prisma/client';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';


@Controller('user-summary')
@UseGuards(JwtAuthGuard)
export class UserSummaryController {
 constructor(
    private userSummaryService: UserSummaryService,
  ) {}

  @Get('me')
  async getUserByIdWithSummary(@CurrentUser() user: User) {
    console.log('UserSummaryController.getUserByIdWithSummary called with user:', user);
    return this.userSummaryService.getAccountSummary(user.id);
  }
}
