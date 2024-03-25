import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PokemonEntity } from './pokemon.entity';
import { Pokemon } from '../models/pokemon.model';
import axios from 'axios';

@Injectable()
export class PokemonService {
  constructor(
    @InjectRepository(PokemonEntity)
    private readonly pokemonRepository: Repository<PokemonEntity>,
  ) {}

  async findAll(
    limit: number = Number.MAX_SAFE_INTEGER,
    offset: number = 0,
  ): Promise<Pokemon[]> {
    const pokemons = await this.pokemonRepository.find({
      skip: offset,
      take: limit,
    });
    return pokemons.map((pokemon) => this.entityToDto(pokemon));
  }

  async findOne(id: number): Promise<Pokemon> {
    const pokemon = await this.pokemonRepository.findOne({ where: { id } });

    if (!pokemon) {
      throw new NotFoundException('Pokemon not found');
    }

    return this.entityToDto(pokemon);
  }

  async searchPokemons(query: string): Promise<Pokemon[]> {
    const lowerCaseQuery = query.toLowerCase();
    return this.pokemonRepository
      .createQueryBuilder('pokemon')
      .where('LOWER(pokemon.name) LIKE :query', {
        query: `%${lowerCaseQuery}%`,
      })
      .getMany()
      .then((pokemons) => pokemons.map((pokemon) => this.entityToDto(pokemon)));
  }

  async bulkCreate(
    pokemonData: Partial<PokemonEntity>[],
  ): Promise<PokemonEntity[]> {
    return this.pokemonRepository.save(pokemonData);
  }

  async getTotal(): Promise<number> {
    return this.pokemonRepository.count();
  }

  async uploadExternal(idOrName: string): Promise<PokemonEntity> {
    try {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${idOrName}`,
      );

      return this.pokemonRepository.save(response.data);
    } catch (error) {
      console.error('Error importing Pokémon:', error);
      throw new Error('Failed to import Pokémon');
    }
  }

  private entityToDto(pokemon: PokemonEntity): Pokemon {
    if (!pokemon) {
      return null;
    }
    return {
      id: pokemon.id,
      name: pokemon.name,
      sprites: pokemon.sprites,
      types: pokemon.types,
    };
  }
}
