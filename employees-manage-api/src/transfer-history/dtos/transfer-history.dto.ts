import { IsNumber, IsDate, IsString, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTransferDto {
  @ApiProperty()
  @IsNumber()
  readonly employeeId: number;

  @ApiProperty()
  @IsNumber()
  readonly toCompanyId: number;

  @ApiProperty()
  @Type(() => Date)
  @IsDate()
  readonly transferDate: Date;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  readonly reason?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  readonly notes?: string;
}
