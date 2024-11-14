import { z } from 'zod';
import { CompanyDTO } from './dto/company.dto';

export namespace CompaniesAPI {
  export namespace CreateCompany {
    export const schema = z.object({
      industry: z.string(),
      year: z.number(),
      sector: z.string(),
      category: z.string(),
      endDate: z.string(),
    });

    export type Request = z.infer<typeof schema>;
    export type Response = void;
  }

  export namespace DeleteCompany {
    export type Response = void;
  }

  export namespace GetCompanie {
    export type Response = CompanyDTO;
  }
}
