import { Controller } from '@nestjs/common';
import { UserSummaryService } from './userSummary.service';

@Controller('user-summary')
export class UserSummaryController {
 constructor(
    private userSummaryService: UserSummaryService,
  ) {}

  async getUserByAuth0IdWithSummary(auth0Id: string) {
    return this.userSummaryService.getAccountSummary(auth0Id);
  }
}
