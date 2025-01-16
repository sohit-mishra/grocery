import { IsMongoId, IsNotEmpty } from 'class-validator';

export class OneChartParam {
  @IsMongoId()
  @IsNotEmpty()
  id: string;
}

export class OneChatsResponse {
  response_code: number;
  response_data: any;
}
