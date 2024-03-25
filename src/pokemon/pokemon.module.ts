import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PokemonService } from './pokemon.service';
import { PokemonEntity } from './pokemon.entity';
import { PokemonController } from './pokemon.controller';
import { PokemonV2Controller } from './pokemonv2.controller';
import { SearchController } from './search.controller';

@Module({
  imports: [TypeOrmModule.forFeature([PokemonEntity])],
  providers: [PokemonService],
  controllers: [PokemonController, PokemonV2Controller, SearchController],
})
export class PokemonModule {}
