import { IsString } from 'class-validator';

export class EndpointDto {
  @IsString()
  url: string;
}
