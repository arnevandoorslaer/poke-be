import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('pokemon')
export class PokemonEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  front_default: string;

  @Column()
  type_name: string;

  @Column()
  type_slot: number;
}
