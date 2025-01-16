import { Business } from "../business.model";

export class AllBusinessResponse {
  response_code: number;
  response_data: Business[];
  total: number;
}
