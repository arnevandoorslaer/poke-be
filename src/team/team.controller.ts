import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { TeamService } from './team.service';
import { TeamEntity } from './team.entity';
import { Team } from 'src/models/team.model';

@Controller('api/v1/teams')
export class TeamsController {
  constructor(private readonly teamService: TeamService) {}

  @Get()
  async findAll(): Promise<Team[]> {
    return this.teamService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Team> {
    return this.teamService.findOne(id);
  }

  @Post()
  async create(@Body() team: Partial<TeamEntity>): Promise<Team> {
    return this.teamService.create(team);
  }
}
