import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { UserService } from 'src/resources/API/user/user.service';
import { UserModule } from 'src/resources/API/user/user.module';

@Module({
  imports: [PassportModule.register({ defaultStrategy: 'jwt' }), UserModule],
  providers: [JwtStrategy],
  exports: [PassportModule, JwtStrategy],
})
export class AuthModule {}