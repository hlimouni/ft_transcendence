import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumberString,
  IsString,
} from 'class-validator';

export class JwtPayload {
  @IsNotEmpty()
  @IsNumberString()
  @ApiProperty()
  id: string;

  @IsNotEmpty()
  @IsBoolean()
  @ApiProperty()
  isSecondFactorAuthenticated: boolean;
}
