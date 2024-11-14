import { z } from 'zod';
import { CompanyDTO } from './dto/company.dto';

export namespace CompaniesAPI {
  export namespace CreateCompany {
    export const schema = z.object({
      title: z.string(),
      seats: z.number(),
      startDate: z.coerce.date(),
      endDate: z.coerce.date(),
    });

    export type Request = z.infer<typeof schema>;
    export type Response = {
      id: string;
    };
  }

  export namespace DeleteCompany {
    export type Response = void;
  }

  export namespace GetCompanie {
    export type Response = CompanyDTO;
  }
}
