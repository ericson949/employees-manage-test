import { IsString, IsOptional, IsNumber, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class FilterEmployeeDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  readonly search?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  readonly companyId?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsBoolean()
  readonly currentRole?: boolean;

  @ApiProperty({ required: false })
  @IsOptional()
  readonly page?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  readonly limit?: number;
}
