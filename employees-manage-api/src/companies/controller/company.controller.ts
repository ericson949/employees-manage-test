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
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

import { CompaniesService } from '../services/company.sevice';
import { CreateCompanyDto } from '../dtos/create-company.dto';
import { FilterCompanyDto } from '../dtos/filter-company.dto';
import { UpdateCompanyDto } from '../dtos/update-company.dto';
import { Company } from '../entities/company.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileUploadService } from '../services/file-upload.service';

@ApiTags('companies')
@Controller('companies')
export class CompaniesController {
  constructor(
    private readonly companiesService: CompaniesService,
    private readonly fileUploadService: FileUploadService,
  ) {}

  @Post('/')
  @UseInterceptors(FileInterceptor('file'))
  @ApiOperation({ summary: 'Create a new company' })
  @ApiResponse({ status: 201, description: 'Company created successfully' })
  async create(
    @Body(ValidationPipe) createCompanyDto: CreateCompanyDto,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<Company> {
    const response = this.fileUploadService.handleFileUpload(file);
    return this.companiesService.create({
      ...createCompanyDto,
      fileName: response.filePath,
    });
  }

  @Get('/')
  @ApiOperation({ summary: 'Get all companies with filtering and pagination' })
  @ApiResponse({ status: 200, description: 'List of companies' })
  async findAll(@Query(ValidationPipe) filterDto: FilterCompanyDto) {
    return this.companiesService.findAll(filterDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a company by id' })
  @ApiResponse({ status: 200, description: 'Company details' })
  @ApiResponse({ status: 404, description: 'Company not found' })
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Company> {
    return this.companiesService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a company' })
  @ApiResponse({ status: 200, description: 'Company updated successfully' })
  @ApiResponse({ status: 404, description: 'Company not found' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) updateCompanyDto: UpdateCompanyDto,
  ): Promise<Company> {
    return this.companiesService.update(id, updateCompanyDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a company' })
  @ApiResponse({ status: 200, description: 'Company deleted successfully' })
  @ApiResponse({ status: 404, description: 'Company not found' })
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.companiesService.remove(id);
  }
}
