import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransferHistory } from './entities/tranfer-history.entity';
import { Employee } from 'src/employees/entities/employee.entity';
import { TransferHistoryController } from './controller/transfer-history.controller';
import { TransferHistoryService } from './services/tranfer-history.service';

@Module({
  imports: [TypeOrmModule.forFeature([TransferHistory, Employee])],
  controllers: [TransferHistoryController],
  providers: [TransferHistoryService],
  exports: [TransferHistoryService],
})
export class TransferHistoryModule {}
