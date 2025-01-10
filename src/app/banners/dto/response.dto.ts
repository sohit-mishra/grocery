export class AllBannerResponse {
  response_code: number;
  response_data: any[];
  total: number;
}

export class TypeBannerResponse {
  response_code: number;
  response_data: { CATEGORY: string; PRODUCT: string };
}

export class OneBannerResponse {
  response_code: number;
  response_data: any;
}

export class CreateBannerResponse {
  response_code: number;
  response_data: string;
}

export class UpdateBannerResponse {
  response_code: number;
  response_data: string;
}

export class DeleteBannerResponse {
  response_code: number;
  response_data: string;
}
