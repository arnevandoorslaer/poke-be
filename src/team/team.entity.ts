import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('team')
export class TeamEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}
