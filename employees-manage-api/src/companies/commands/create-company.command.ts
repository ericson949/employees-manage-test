import { Executable } from 'src/shared/executable';
import { DataSource } from 'typeorm';
import { CompanyDTO } from '../dto/company.dto';

type Request = {
  company: CompanyDTO;
};

type Response = void;

export class CreateCompany implements Executable<Request, Response> {
  constructor(private dataSource: DataSource) {}

  async execute({ company }: Request): Promise<Response> {
    return await this.dataSource.transaction(async (manager) => {
      await manager.save(company);
    });
  }
}
