import { IntersectionType } from '@nestjs/mapped-types';
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdatePostDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  content?: string;
}

export class AdditionalPrivilegesDto {
  @IsNotEmpty({ message: 'Trường isAdmin không được để trống' })
  @IsBoolean({ message: 'Trường isAdmin phải là kiểu boolean (true/false)' })
  isAdmin: boolean;
}

export class UpdatePostWithPrivilegesDto extends IntersectionType(
  UpdatePostDto,
  AdditionalPrivilegesDto,
) {}
