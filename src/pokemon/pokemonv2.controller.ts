import { Controller, Get, Query } from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { Pokemon } from '../models/pokemon.model';

@Controller('api/v2/pokemons')
export class PokemonV2Controller {
  constructor(private readonly pokemonService: PokemonService) {}

  @Get()
  async getAllPokemons(
    @Query('limit') limit: number = 10,
    @Query('offset') offset: number = 0,
  ): Promise<{
    data: Pokemon[];
    metadata: {
      next: string | null;
      previous: string | null;
      total: number;
      pages: number;
      page: number;
    };
  }> {
    const pokemons = await this.pokemonService.findAll();
    const total = pokemons.length;
    const paginatedPokemons = pokemons.slice(offset, offset + limit);
    const pages = Math.ceil(total / limit);
    const nextOffset = Math.min(offset + limit, total);
    const prevOffset = Math.max(offset - limit, 0);

    const metadata = {
      next:
        nextOffset < total
          ? `/api/v2/pokemons?limit=${limit}&offset=${nextOffset}`
          : null,
      previous:
        offset > 0
          ? `/api/v2/pokemons?limit=${limit}&offset=${prevOffset}`
          : null,
      total,
      pages,
      page: Math.ceil(offset / limit) + 1,
    };

    return {
      data: paginatedPokemons,
      metadata,
    };
  }
}
