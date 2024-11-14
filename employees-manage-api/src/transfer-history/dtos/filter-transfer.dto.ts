import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsDate, IsOptional } from 'class-validator';

export class FilterTransferHistoryDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  readonly employeeId?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  readonly fromCompanyId?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  readonly toCompanyId?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  readonly startDate?: Date;

  @ApiProperty({ required: false })
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  readonly endDate?: Date;

  @ApiProperty({ required: false })
  @IsOptional()
  readonly page?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  readonly limit?: number;
}
