import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeamService } from './team.service';
import { TeamEntity } from './team.entity';
import { TeamsController } from './team.controller';
import { PokemonTeamEntity } from '../pokemonteam/pokemonteam.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TeamEntity, PokemonTeamEntity])],
  providers: [TeamService],
  controllers: [TeamsController],
})
export class TeamModule {}
