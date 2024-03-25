import { PokemonTeamEntity } from '../pokemonteam/pokemonteam.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity('team')
export class TeamEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => PokemonTeamEntity, (pokemonTeam) => pokemonTeam.team_id)
  pokemons: PokemonTeamEntity[];
}
