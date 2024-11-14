import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Employee } from '../entities/employee.entity';
import {
  CreateEmployeeDto,
  UpdateEmployeeDto,
} from '../dtos/create-employee.dto';
import { FilterEmployeeDto } from '../dtos/filter-employees.dto';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employee)
    private employeeRepository: Repository<Employee>,
  ) {}

  async create(createEmployeeDto: CreateEmployeeDto): Promise<Employee> {
    const employee = this.employeeRepository.create({
      ...createEmployeeDto,
      currentRole: createEmployeeDto.currentRole ?? true,
    });
    return await this.employeeRepository.save(employee);
  }

  async findAll(
    filterDto: FilterEmployeeDto,
  ): Promise<{ items: Employee[]; total: number }> {
    const { search, companyId, currentRole, page = 1, limit = 10 } = filterDto;
    const skip = (page - 1) * limit;

    const queryBuilder = this.employeeRepository
      .createQueryBuilder('employee')
      .leftJoinAndSelect('employee.company', 'company');

    if (search) {
      queryBuilder.where(
        'employee.firstName LIKE :search OR employee.lastName LIKE :search OR employee.position LIKE :search',
        { search: `%${search}%` },
      );
    }

    if (companyId) {
      queryBuilder.andWhere('employee.companyId = :companyId', { companyId });
    }

    if (currentRole !== undefined) {
      queryBuilder.andWhere('employee.currentRole = :currentRole', {
        currentRole,
      });
    }

    const [items, total] = await queryBuilder
      .orderBy('employee.startDate', 'DESC')
      .skip(skip)
      .take(limit)
      .getManyAndCount();

    return { items, total };
  }

  async findOne(id: number): Promise<Employee> {
    const employee = await this.employeeRepository.findOne({
      where: { id },
      relations: ['company'],
    });
    if (!employee) {
      throw new NotFoundException(`Employee with ID ${id} not found`);
    }
    return employee;
  }

  async findByCompany(companyId: number): Promise<Employee[]> {
    return await this.employeeRepository.find({
      where: { companyId },
      relations: ['company'],
    });
  }

  async update(
    id: number,
    updateEmployeeDto: UpdateEmployeeDto,
  ): Promise<Employee> {
    const employee = await this.findOne(id);

    Object.assign(employee, {
      ...updateEmployeeDto,
      currentRole:
        updateEmployeeDto.endDate && !updateEmployeeDto.currentRole
          ? false
          : employee.currentRole,
    });
    return await this.employeeRepository.save(employee);
  }

  async remove(id: number): Promise<void> {
    const result = await this.employeeRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Employee with ID ${id} not found`);
    }
  }
}
