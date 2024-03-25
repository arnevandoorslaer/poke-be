import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TeamEntity } from './team.entity';
import { Team } from 'src/models/team.model';

@Injectable()
export class TeamService {
  constructor(
    @InjectRepository(TeamEntity)
    private readonly teamRepository: Repository<TeamEntity>,
  ) {}

  async findAll(): Promise<Team[]> {
    const teams = await this.teamRepository.find();
    return teams.map((team) => this.entityToDto(team));
  }

  async findOne(id: number): Promise<Team> {
    const team = await this.teamRepository.findOne({ where: { id } });
    return this.entityToDto(team);
  }

  async create(team: Partial<TeamEntity>): Promise<Team> {
    const createdTeam = await this.teamRepository.save(team);
    return this.entityToDto(createdTeam);
  }

  private entityToDto(team: TeamEntity): Team {
    if (!team) {
      return null;
    }
    return {
      id: team.id,
      name: team.name,
      pokemon: [], // Assuming you have a pokemon property in the Team DTO
    };
  }
}
