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

  async findOne(id: number): Promise<Team> {
    const team = await this.teamRepository.findOne({
      where: { id },
      relations: ['pokemonTeam'],
    });
    return this.entityToDto(team);
  }

  async create(team: Partial<TeamEntity>): Promise<Team> {
    const createdTeam = await this.teamRepository.save(team);
    return this.entityToDto(createdTeam);
  }

  async findAll(): Promise<Team[]> {
    return this.teamRepository
      .find({
        relations: ['pokemonTeam'],
      })
      .then((teams) => teams.map(this.entityToDto));
  }

  private entityToDto(team: TeamEntity): Team {
    if (!team) {
      return null;
    }

    return {
      id: team.id,
      name: team.name,
      pokemons: team.pokemonTeam
        ? team.pokemonTeam.map((pokemonTeam) => pokemonTeam.pokemon_id)
        : [],
    };
  }
}
