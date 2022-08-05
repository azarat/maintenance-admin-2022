import { ApiProperty } from "@nestjs/swagger";
import { IsString } from 'class-validator';


export class AdminDto {
  @ApiProperty({ example: '619f5ee2a9252dbdccce154c' })
  @IsString()
  id: string;

  @ApiProperty({ example: '619f546081c950195609dcb1' })
  @IsString()
  cockpitId: string;

  @ApiProperty({ example: 'CTO' })
  @IsString()
  name: string;
}