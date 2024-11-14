import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  ParseIntPipe,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { TransferHistoryService } from '../services/tranfer-history.service';
import { CreateTransferDto } from '../dtos/transfer-history.dto';
import { TransferHistory } from '../entities/tranfer-history.entity';
import { FilterTransferHistoryDto } from '../dtos/filter-transfer.dto';

@ApiTags('transfer-history')
@Controller('transfer-history')
export class TransferHistoryController {
  constructor(
    private readonly transferHistoryService: TransferHistoryService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a new employee transfer' })
  @ApiResponse({ status: 201, description: 'Transfer created successfully' })
  async create(
    @Body(ValidationPipe) createTransferDto: CreateTransferDto,
  ): Promise<TransferHistory> {
    return this.transferHistoryService.create(createTransferDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all transfers with filtering and pagination' })
  @ApiResponse({ status: 200, description: 'List of transfers' })
  async findAll(@Query(ValidationPipe) filterDto: FilterTransferHistoryDto) {
    return this.transferHistoryService.findAll(filterDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a transfer by id' })
  @ApiResponse({ status: 200, description: 'Transfer details' })
  async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<TransferHistory> {
    return this.transferHistoryService.findOne(id);
  }

  @Get('employee/:employeeId')
  @ApiOperation({ summary: 'Get transfer history for an employee' })
  @ApiResponse({ status: 200, description: 'Employee transfer history' })
  async getEmployeeTransferHistory(
    @Param('employeeId', ParseIntPipe) employeeId: number,
  ): Promise<TransferHistory[]> {
    return this.transferHistoryService.getEmployeeTransferHistory(employeeId);
  }
}
