import { ApiProperty } from '@nestjs/swagger';

export class CreateMessageDto {
  @ApiProperty()
  roomId?: string;
  @ApiProperty()
  senderId: string;
  @ApiProperty()
  senderName: string;
  @ApiProperty()
  receiverId: string;
  @ApiProperty()
  createdAt: string;
  @ApiProperty()
  content: string;
  @ApiProperty()
  isChannel: boolean;
}
