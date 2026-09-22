import { IsDateString, IsNotEmpty } from 'class-validator';
import { IsAfterDate } from '../decorators/is-after-date.decorator.js';

export class CreateEventDto {
  @IsNotEmpty()
  @IsDateString()
  startDate: string;

  @IsNotEmpty()
  @IsDateString()
  @IsAfterDate('startDate', {
    message: 'Ngày kết thúc không được nhỏ hơn hoặc bằng ngày bắt đầu',
  })
  endDate: string;
}
