import { IsOptional, Min } from 'class-validator';

export class PaginationDto {
  @IsOptional()
  @Min(1)
  public limit?: number;

  @IsOptional()
  @Min(0)
  public offset?: number;
}
