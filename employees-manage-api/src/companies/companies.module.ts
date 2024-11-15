import { Module } from '@nestjs/common';
import { CompaniesController } from './controller/company.controller';
import { Company } from './entities/company.entity';
import { CompaniesService } from './services/company.sevice';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { FileUploadService } from './services/file-upload.service';

@Module({
  imports: [
    MulterModule.register({
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const filename = `${Date.now()}-${file.originalname}`;
          cb(null, filename);
        },
      }),
    }),
    TypeOrmModule.forFeature([Company]),
  ],
  controllers: [CompaniesController],
  providers: [CompaniesService, FileUploadService],
})
export class CompaniesModule {}
