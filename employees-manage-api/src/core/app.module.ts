import { Module } from '@nestjs/common';
import { CompaniesModule } from '../companies/companies.module';
// import { Company } from '../companies/entities/company.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeeModule } from '../employees/employees.module';
// import { Employee } from '../employees/entities/employee.entity';
// import { TransferHistory } from '../transfer-history/entities/tranfer-history.entity';
import { TransferHistoryModule } from '../transfer-history/transfer-history.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { databaseConfig } from './config/database.config';
import { validateEnv } from './config/env.validation';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate: validateEnv,
      load: [databaseConfig],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        ...configService.get('database'),
      }),
    }),
    // TypeOrmModule.forRoot({
    //   type: 'mysql',
    //   host: 'localhost',
    //   port: 3306,
    //   username: 'root',
    //   password: '',
    //   database: 'manage_organisations',
    //   entities: [Company, Employee, TransferHistory],
    //   synchronize: true, // Set to false in production
    // }),
    CompaniesModule,
    EmployeeModule,
    TransferHistoryModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
