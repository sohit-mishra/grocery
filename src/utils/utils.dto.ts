import { Type } from 'class-transformer';
import { IsOptional } from 'class-validator';

export class CommonResponseModel<T> {
  status: number;
  data: T;
  message?: string;
}

export class PaginationQuery {
  @IsOptional()
  @Type(() => Number)
  limit = 10;

  @IsOptional()
  @Type(() => Number)
  page = 1;
}

export enum SortType {
  ASCENDING = 'Ascending',
  DESCENDING = 'Descending',
}

export type ObjectValue<T> = T[keyof T];

export const generateUniqueCode = (): string => {
  let text = '';
  const possible =
    'A1B2C3D4E5F1G4HIJ6KL7MNOPQ4RST4UV8WXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < 6; i++)
    text += possible.charAt(Math.floor(Math.random() * 6));
  return text;
};
