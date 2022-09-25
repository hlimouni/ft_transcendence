import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumberString, IsString } from 'class-validator';

export class RelatedUserDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumberString()
  id: string;
}
