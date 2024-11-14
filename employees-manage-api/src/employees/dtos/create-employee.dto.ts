import {
  IsString,
  IsEmail,
  IsOptional,
  MinLength,
  MaxLength,
  IsNumber,
  IsBoolean,
  IsDate,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CreateEmployeeDto {
  @ApiProperty()
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  readonly firstName: string;

  @ApiProperty()
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  readonly lastName: string;

  @ApiProperty()
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  readonly position: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsEmail()
  readonly email?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  readonly phone?: string;

  @ApiProperty()
  @Type(() => Date)
  @IsDate()
  readonly startDate: Date;

  @ApiProperty({ required: false })
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  readonly endDate?: Date;

  @ApiProperty({ required: false, default: true })
  @IsOptional()
  @IsBoolean()
  readonly currentRole?: boolean;

  @ApiProperty()
  @IsNumber()
  readonly companyId: number;
}
export class UpdateEmployeeDto extends CreateEmployeeDto {}
