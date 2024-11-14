import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  ParseIntPipe,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { EmployeeService } from '../services/employees.service';
import {
  CreateEmployeeDto,
  UpdateEmployeeDto,
} from '../dtos/create-employee.dto';
import { FilterEmployeeDto } from '../dtos/filter-employees.dto';
import { Employee } from '../entities/employee.entity';

@ApiTags('employees')
@Controller('employees')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new employee' })
  @ApiResponse({ status: 201, description: 'Employee created successfully' })
  async create(
    @Body(ValidationPipe) createEmployeeDto: CreateEmployeeDto,
  ): Promise<Employee> {
    return this.employeeService.create(createEmployeeDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all employees with filtering and pagination' })
  @ApiResponse({ status: 200, description: 'List of employees' })
  async findAll(@Query(ValidationPipe) filterDto: FilterEmployeeDto) {
    return this.employeeService.findAll(filterDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an employee by id' })
  @ApiResponse({ status: 200, description: 'Employee details' })
  @ApiResponse({ status: 404, description: 'Employee not found' })
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Employee> {
    return this.employeeService.findOne(id);
  }

  @Get('company/:companyId')
  @ApiOperation({ summary: 'Get all employees for a company' })
  @ApiResponse({
    status: 200,
    description: 'List of employees for the company',
  })
  async findByCompany(
    @Param('companyId', ParseIntPipe) companyId: number,
  ): Promise<Employee[]> {
    return this.employeeService.findByCompany(companyId);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update an employee' })
  @ApiResponse({ status: 200, description: 'Employee updated successfully' })
  @ApiResponse({ status: 404, description: 'Employee not found' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) updateEmployeeDto: UpdateEmployeeDto,
  ): Promise<Employee> {
    return this.employeeService.update(id, updateEmployeeDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an employee' })
  @ApiResponse({ status: 200, description: 'Employee deleted successfully' })
  @ApiResponse({ status: 404, description: 'Employee not found' })
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.employeeService.remove(id);
  }
}
