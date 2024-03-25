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
      relations: ['pokemons'],
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
        relations: ['pokemons'],
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
        await this.pokemonTeamRepository.query(
          `SELECT pokemon_id FROM pokemonteam WHERE team_id = $1`,
          [teamId],
        )
      ).map((row) => row.pokemon_id),
    );

    const newPokemonIds = pokemonIds.filter(
      (pokemonId) => !existingPokemonIds.has(pokemonId),
    );

    if (newPokemonIds.length === 0) {
      return team;
    }

    const newPokemonTeamEntities = newPokemonIds.map(
      (pokemonId) =>
        ({
          team_id: teamId,
          pokemon_id: pokemonId,
        }) as PokemonTeamEntity,
    );

    await this.pokemonTeamRepository.insert(newPokemonTeamEntities);

    return this.findOne(teamId);
  }

  private entityToDto(team: TeamEntity): Team {
    if (!team) {
      return null;
    }

    return {
      id: team.id,
      name: team.name,
      pokemons: team.pokemons?.map((object) => object.pokemon_id) ?? [],
    };
  }
}
