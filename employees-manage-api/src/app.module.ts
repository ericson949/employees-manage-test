import { Module } from '@nestjs/common';
import { CompaniesModule } from './companies/companies.module';
import { Company } from './companies/entities/company.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'manage_organisations',
      entities: [Company],
      synchronize: true, // Set to false in production
    }),
    CompaniesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
