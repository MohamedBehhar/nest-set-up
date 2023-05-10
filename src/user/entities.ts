import { PartialType } from '@nestjs/mapped-types';
import { Transform } from 'class-transformer';
import { IsInt, IsString } from 'class-validator';

export class FindOneParams {
  @Transform(({ value }) => parseInt(value))
  @IsInt()
  id: number;
}

export class User {
  name: string;
  age: number;
}

export class CreateUserDto {
  @IsInt()
  id: number;
  @IsString()
  name: string;
  @IsInt()
  age: number;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
