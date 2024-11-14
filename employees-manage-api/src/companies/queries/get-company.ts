import { IQuery, IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { CompanyDTO } from '../dto/company.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CompanyEntity } from '../entities/company.entity';
import { Repository } from 'typeorm';

export class GetCompaniesQuery implements IQuery {
  constructor() {}
}

@Injectable()
@QueryHandler(GetCompaniesQuery)
export class GetCompaniesQueryHandler implements IQueryHandler {
  constructor(
    @InjectRepository(CompanyEntity)
    private companyRepository: Repository<CompanyEntity>,
  ) {}
  async execute(): Promise<CompanyDTO[]> {
    const companies = await this.companyRepository.find();
    return companies.map((company) => ({
      id: company.id,
      industry: company.industry,
      sector: company.sector,
      category: company.category,
      year: company.year,
    }));
  }
}
