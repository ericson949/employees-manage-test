import { Company } from 'src/companies/entities/company.entity';
import { Employee } from 'src/employees/entities/employee.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity('transfer_history')
export class TransferHistory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  employeeId: number;

  @Column()
  fromCompanyId: number;

  @Column()
  toCompanyId: number;

  @Column({ type: 'date' })
  transferDate: Date;

  @Column({ type: 'text', nullable: true })
  reason: string;

  @Column({ type: 'text', nullable: true })
  notes: string;

  @ManyToOne(() => Employee, (employee) => employee.transfers)
  @JoinColumn({ name: 'employeeId' })
  employee: Employee;

  @ManyToOne(() => Company)
  @JoinColumn({ name: 'fromCompanyId' })
  fromCompany: Company;

  @ManyToOne(() => Company)
  @JoinColumn({ name: 'toCompanyId' })
  toCompany: Company;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
