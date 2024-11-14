import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class FilterCompanyDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  readonly search?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  readonly page?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  readonly limit?: number;
}
