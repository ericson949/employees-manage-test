import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TransferHistory } from '../entities/tranfer-history.entity';
import { Employee } from 'src/employees/entities/employee.entity';
import { CreateTransferDto } from '../dtos/transfer-history.dto';
import { FilterTransferHistoryDto } from '../dtos/filter-transfer.dto';

@Injectable()
export class TransferHistoryService {
  constructor(
    @InjectRepository(TransferHistory)
    private transferHistoryRepository: Repository<TransferHistory>,
    @InjectRepository(Employee)
    private employeeRepository: Repository<Employee>,
  ) {}

  async create(createTransferDto: CreateTransferDto): Promise<TransferHistory> {
    const employee = await this.employeeRepository.findOne({
      where: { id: createTransferDto.employeeId },
      relations: ['company'],
    });

    if (!employee) {
      throw new NotFoundException('Employee not found');
    }

    if (employee.companyId === createTransferDto.toCompanyId) {
      throw new BadRequestException('Cannot transfer to the same company');
    }

    const transfer = this.transferHistoryRepository.create({
      ...createTransferDto,
      fromCompanyId: employee.companyId,
    });

    // Update employee's company
    employee.companyId = createTransferDto.toCompanyId;
    await this.employeeRepository.save(employee);

    return await this.transferHistoryRepository.save(transfer);
  }

  async findAll(
    filterDto: FilterTransferHistoryDto,
  ): Promise<{ items: TransferHistory[]; total: number }> {
    const {
      employeeId,
      fromCompanyId,
      toCompanyId,
      startDate,
      endDate,
      page = 1,
      limit = 10,
    } = filterDto;
    const skip = (page - 1) * limit;

    const queryBuilder = this.transferHistoryRepository
      .createQueryBuilder('transfer')
      .leftJoinAndSelect('transfer.employee', 'employee')
      .leftJoinAndSelect('transfer.fromCompany', 'fromCompany')
      .leftJoinAndSelect('transfer.toCompany', 'toCompany');

    if (employeeId) {
      queryBuilder.andWhere('transfer.employeeId = :employeeId', {
        employeeId,
      });
    }

    if (fromCompanyId) {
      queryBuilder.andWhere('transfer.fromCompanyId = :fromCompanyId', {
        fromCompanyId,
      });
    }

    if (toCompanyId) {
      queryBuilder.andWhere('transfer.toCompanyId = :toCompanyId', {
        toCompanyId,
      });
    }

    if (startDate && endDate) {
      queryBuilder.andWhere(
        'transfer.transferDate BETWEEN :startDate AND :endDate',
        {
          startDate,
          endDate,
        },
      );
    }

    const [items, total] = await queryBuilder
      .orderBy('transfer.transferDate', 'DESC')
      .skip(skip)
      .take(limit)
      .getManyAndCount();

    return { items, total };
  }

  async findOne(id: number): Promise<TransferHistory> {
    const transfer = await this.transferHistoryRepository.findOne({
      where: { id },
      relations: ['employee', 'fromCompany', 'toCompany'],
    });

    if (!transfer) {
      throw new NotFoundException(`Transfer history with ID ${id} not found`);
    }

    return transfer;
  }

  async getEmployeeTransferHistory(
    employeeId: number,
  ): Promise<TransferHistory[]> {
    return await this.transferHistoryRepository.find({
      where: { employeeId },
      relations: ['fromCompany', 'toCompany'],
      order: { transferDate: 'DESC' },
    });
  }
}
