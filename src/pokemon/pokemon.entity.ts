import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('pokemon')
export class PokemonEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  name: string;

  @Column({ type: 'int' })
  base_experience: number;

  @Column({ type: 'float' })
  height: number;

  @Column({ name: 'order_num', type: 'int' })
  order: number;

  @Column({ length: 255 })
  species_name: string;

  @Column({ type: 'jsonb' })
  sprites: Record<string, string>;

  @Column({ type: 'float' })
  weight: number;

  @Column({ type: 'jsonb' })
  abilities: Record<string, any>[];

  @Column({ type: 'jsonb' })
  forms: Record<string, string>[];

  @Column({ type: 'jsonb' })
  game_indices: Record<string, any>[];

  @Column({ type: 'jsonb' })
  held_items: Record<string, any>[];

  @Column('boolean')
  is_default: boolean;

  @Column({ length: 255 })
  location_area_encounters: string;

  @Column({ type: 'jsonb' })
  moves: Record<string, any>[];

  @Column({ type: 'jsonb' })
  past_types: Record<string, any>[];

  @Column({ type: 'jsonb' })
  stats: Record<string, any>[];

  @Column({ type: 'jsonb' })
  types: Record<string, any>[];
}
