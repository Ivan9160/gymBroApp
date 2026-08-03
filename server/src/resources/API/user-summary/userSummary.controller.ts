import { Controller } from '@nestjs/common';
import { UserSummaryService } from './userSummary.service';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Get } from '@nestjs/common';
import { CurrentUser } from 'src/auth/decorators/get-user.decorator';
import { User } from '../../../../generated/prisma';


@Controller('user-summary')
@UseGuards(AuthGuard('jwt'))
export class UserSummaryController {
 constructor(
    private userSummaryService: UserSummaryService,
  ) {}

  @Get('me')
  async getUserByAuth0IdWithSummary(@CurrentUser() user: User) {
    return this.userSummaryService.getAccountSummary(user.id);
  }
}
