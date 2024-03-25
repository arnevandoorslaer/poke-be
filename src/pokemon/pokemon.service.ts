import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PokemonEntity } from './pokemon.entity';
import { Pokemon } from '../models/pokemon.model';

@Injectable()
export class PokemonService {
  constructor(
    @InjectRepository(PokemonEntity)
    private readonly pokemonRepository: Repository<PokemonEntity>,
  ) {}

  async findAll(): Promise<Pokemon[]> {
    const pokemons = await this.pokemonRepository.find();
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

  private entityToDto(pokemon: PokemonEntity): Pokemon {
    if (!pokemon) {
      return null;
    }
    return {
      id: pokemon.id,
      name: pokemon.name,
      sprites: {
        front_default: pokemon.front_default,
      },
      types: [
        {
          type: {
            name: pokemon.type_name,
          },
          slot: pokemon.type_slot,
        },
      ],
    };
  }
}
