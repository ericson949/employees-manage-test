import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class CompanyEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  industry: string;

  @Column()
  sector: string;

  @Column()
  category: string;

  @Column()
  year: number;
}
