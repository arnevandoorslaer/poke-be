import { Controller, Get, Query } from '@nestjs/common';
import { PokemonService } from './pokemon.service';

@Controller('api/v1/search')
export class SearchController {
  constructor(private readonly pokemonService: PokemonService) {}

  @Get()
  async searchPokemons(
    @Query('query') query: string,
    @Query('limit') limit: number = 10,
  ): Promise<any[]> {
    const pokemons = await this.pokemonService.searchPokemons(query);
    return pokemons.slice(0, limit);
  }
}
