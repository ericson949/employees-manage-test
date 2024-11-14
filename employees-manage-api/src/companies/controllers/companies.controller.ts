import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Post,
  Request,
} from '@nestjs/common';
import { CompaniesAPI } from '../contract';
import { QueryBus } from '@nestjs/cqrs';
import { GetCompaniesQuery } from '../queries/get-company';
import { ZodValidationPipe } from 'src/core/pipes/zod-validation.pipe';
import { User } from 'src/users/entities/user.entity';
import { CreateCompany } from '../commands/create-company.command';

@Controller()
export class CompaniesController {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly createCompany: CreateCompany,
  ) {}

  @Get('/company')
  async handleGetAllCompanies(): Promise<CompaniesAPI.GetCompanie.Response> {
    return this.queryBus.execute(new GetCompaniesQuery());
  }

  @HttpCode(200)
  @Post('/company')
  async handleSaveCompany(
    @Body(new ZodValidationPipe(CompaniesAPI.CreateCompany.schema))
    body: CompaniesAPI.CreateCompany.Request,
    @Request() request: { user: User },
  ): Promise<CompaniesAPI.CreateCompany.Response> {
    return this.createCompany.execute({
      company: body,
    });
  }

  // @Delete('/company/:id')
  // async handleDeleteCompany(
  //   @Param('id') id: string,
  //   @Request() request: { user: User },
  // ): Promise<CompaniesAPI.DeleteCompany.Response> {
  //   return this.cancelWebinaire.execute({
  //     user: request.user,
  //     webinaireId: id,
  //   });
  // }
}
