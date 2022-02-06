import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { AuthController } from './controller/auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './repository/auth.repository';
import { PassportModule, PassportStrategy } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt-strategy/jwt.strategy';
import { RoleGuard } from './guards/role.guard';

@Module({
  imports:[
    PassportModule.register({defaultStrategy:'jwt'}),
    JwtModule.register({
      secret:'123456',
      signOptions:{
        expiresIn:7200,
      },
    }),
    TypeOrmModule.forFeature([UserRepository])
  ],
  providers: [AuthService,JwtStrategy,RoleGuard],
  controllers: [AuthController],
  exports:[
    JwtStrategy,
    PassportModule,
  ]
})
export class AuthModule {}
