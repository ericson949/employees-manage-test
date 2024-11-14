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

@Controller()
export class CompaniesController {
  constructor(private readonly queryBus: QueryBus) {}

  @Get('/company')
  async handleGetAllCompanies(): Promise<CompaniesAPI.GetCompanie.Response> {
    return this.queryBus.execute(new GetCompaniesQuery());
  }

  // @HttpCode(200)
  // @Post('/company')
  // async handleSaveCompany(
  //   @Body(new ZodValidationPipe(CompaniesAPI.CreateCompany.schema))
  //   body: CompaniesAPI.CreateCompany.Request,
  //   @Request() request: { user: User },
  // ): Promise<CompaniesAPI.CreateCompany.Response> {
  //   return this.createCompany.execute({
  //     company: body.company,
  //   });
  // }

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
