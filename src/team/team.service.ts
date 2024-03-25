import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TeamEntity } from './team.entity';
import { Team } from '../models/team.model';
import { PokemonTeamEntity } from '../pokemonteam/pokemonteam.entity';

@Injectable()
export class TeamService {
  constructor(
    @InjectRepository(TeamEntity)
    private readonly teamRepository: Repository<TeamEntity>,
    @InjectRepository(PokemonTeamEntity)
    private readonly pokemonTeamRepository: Repository<PokemonTeamEntity>,
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

  async setPokemonsOfTeam(teamId: number, pokemonIds: number[]): Promise<Team> {
    const team = await this.findOne(teamId);
    if (!team) {
      throw new NotFoundException('Team not found');
    }

    const existingPokemonIds = new Set(
      (
        await this.pokemonTeamRepository.find({
          where: { team: { id: teamId } },
        })
      ).map((entity) => entity.pokemon_id),
    );

    const newPokemonTeamEntities = pokemonIds
      .filter((pokemonId) => !existingPokemonIds.has(pokemonId))
      .map(
        (pokemonId) =>
          ({ team: teamId, pokemon_id: pokemonId }) as PokemonTeamEntity,
      );

    await this.pokemonTeamRepository.insert(newPokemonTeamEntities);

    team.pokemons = pokemonIds;

    return team;
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
