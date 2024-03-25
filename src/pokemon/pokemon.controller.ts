import { Controller, Get, Param, Query } from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { Pokemon } from '../models/pokemon.model';

@Controller('api/v1/pokemons')
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) {}

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Pokemon> {
    return this.pokemonService.findOne(parseInt(id, 10));
  }

  @Get()
  async findAll(@Query('sort') sort: string): Promise<Pokemon[]> {
    const pokemons = await this.pokemonService.findAll();
    if (sort) {
      pokemons.sort((a, b) => {
        if (sort === 'name-asc') {
          return a.name.localeCompare(b.name);
        } else if (sort === 'name-desc') {
          return b.name.localeCompare(a.name);
        } else if (sort === 'id-asc') {
          return a.id - b.id;
        } else if (sort === 'id-desc') {
          return b.id - a.id;
        } else {
          return 0;
        }
      });
    }
    return pokemons;
  }
}
