import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeamService } from './team.service';
import { TeamEntity } from './team.entity';
import { TeamsController } from './team.controller';
import { PokemonTeamEntity } from '../pokemonteam/pokemonteam.entity';
import { AuthMiddleware } from '../auth/auth.middleware';

@Module({
  imports: [TypeOrmModule.forFeature([TeamEntity, PokemonTeamEntity])],
  providers: [TeamService, AuthMiddleware],
  controllers: [TeamsController],
})
export class TeamModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('api/v1/teams');
  }
}
