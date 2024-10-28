import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Pokemon {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  name: string;

  @Column()
  color: string;

  @Column()
  usesPokeball: boolean;

  @Column()
  height: number;

  @Column()
  weight: number;

  @Column()
  type: string;
}
