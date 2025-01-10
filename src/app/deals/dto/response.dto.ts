export class AllDealsResponse {
  response_code: number;
  response_data: any[];
  total: number;
}

export class TypeDealsResponse {
  response_code: number;
  response_data: { CATEGORY: string; PRODUCT: string };
}

export class OneDealsResponse {
  response_code: number;
  response_data: any;
}

export class CreateDealsResponse {
  response_code: number;
  response_data: string;
}

export class StatusUpdateDealsResponse {
  response_code: number;
  response_data: string;
}

export class UpdateDealsResponse {
  response_code: number;
  response_data: string;
}

export class DeleteDealsResponse {
  response_code: number;
  response_data: string;
}