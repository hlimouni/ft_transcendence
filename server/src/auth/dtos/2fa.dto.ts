import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class twoFaDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  twoFactorAuthenticationCode: string;
}
