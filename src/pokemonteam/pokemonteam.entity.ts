import { TeamEntity } from '../team/team.entity';
import { Entity, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';

@Entity('pokemonteam')
export class PokemonTeamEntity {
  @PrimaryColumn()
  pokemon_id: number;

  @ManyToOne(() => TeamEntity, (team) => team.pokemonTeam)
  @JoinColumn({ name: 'team_id' })
  team: TeamEntity;
}
