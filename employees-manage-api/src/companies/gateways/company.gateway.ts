import { CreateCompanyDto } from '../dtos/create-company.dto';
import { FilterCompanyDto } from '../dtos/filter-company.dto';
import { UpdateCompanyDto } from '../dtos/update-company.dto';
import { Company } from '../entities/company.entity';

export interface CompanyGateway {
  create(createCompanyDto: CreateCompanyDto): Promise<Company>;
  findAll(
    filterDto: FilterCompanyDto,
  ): Promise<{ items: Company[]; total: number }>;
  update(id: number, updateCompanyDto: UpdateCompanyDto): Promise<Company>;
  remove(id: number): Promise<void>;
}
