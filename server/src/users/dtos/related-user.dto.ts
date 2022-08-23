import { ApiProperty } from '@nestjs/swagger';

export class RelatedUserDto {
  @ApiProperty()
  id: string;
}
