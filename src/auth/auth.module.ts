import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { AuthController } from './controller/auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './repository/auth.repository';
import { PassportModule, PassportStrategy } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt-strategy/jwt.strategy';

@Module({
  imports:[
    PassportModule.register({defaultStrategy:'jwt'}),
    JwtModule.register({
      secret:'123456',
      signOptions:{
        expiresIn:3600,
      },
    }),
    TypeOrmModule.forFeature([UserRepository])
  ],
  providers: [AuthService,JwtStrategy],
  controllers: [AuthController],
  exports:[
    JwtStrategy,
    PassportModule,
  ]
})
export class AuthModule {}
