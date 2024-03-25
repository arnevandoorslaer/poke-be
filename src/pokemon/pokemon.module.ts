import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PokemonService } from './pokemon.service';
import { PokemonEntity } from './pokemon.entity';
import { PokemonController } from './pokemon.controller';
import { PokemonV2Controller } from './pokemonv2.controller';

@Module({
  imports: [TypeOrmModule.forFeature([PokemonEntity])],
  providers: [PokemonService],
  controllers: [PokemonController, PokemonV2Controller],
})
export class PokemonModule {}
