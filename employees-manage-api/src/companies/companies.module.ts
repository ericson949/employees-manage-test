import { CqrsModule } from '@nestjs/cqrs';
import { CompaniesController } from './controllers/companies.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonModule } from 'src/core/common.module';
import { UserModule } from 'src/users/user.module';
import { Module } from '@nestjs/common';
import { CompanyEntity } from './entities/company.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([CompanyEntity]),
    CqrsModule,
    CommonModule,
    UserModule,
    TypeOrmModule.forRoot(),
  ],
  controllers: [CompaniesController],
})
export class CompaniesModule {}
