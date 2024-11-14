import { Module } from '@nestjs/common';
import { CompaniesController } from './controller/company.controller';
import { Company } from './entities/company.entity';
import { CompaniesService } from './services/company.sevice';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Company])],
  controllers: [CompaniesController],
  providers: [CompaniesService],
})
export class CompaniesModule {}
