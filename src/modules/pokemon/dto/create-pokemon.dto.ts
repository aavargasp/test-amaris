import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class CreatePokemonDto {
  @IsNotEmpty()
  @IsString()
  name!: string;

  @IsNotEmpty()
  @IsString()
  color!: string;

  @IsNotEmpty()
  @IsBoolean()
  usesPokeball!: boolean;
}
