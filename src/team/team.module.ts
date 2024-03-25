import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeamService } from './team.service';
import { TeamEntity } from './team.entity';
import { TeamsController } from './team.controller';

@Module({
  imports: [TypeOrmModule.forFeature([TeamEntity])],
  providers: [TeamService],
  controllers: [TeamsController],
})
export class TeamModule {}
