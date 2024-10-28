import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PokeapiModule } from 'src/services/pokeapi/pokeapi.module';
import { Pokemon } from './entities/pokemon.entity';
import { PokemonController } from './pokemon.controller';
import { PokemonService } from './pokemon.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Pokemon]),
    PokeapiModule
  ],
  controllers: [PokemonController],
  providers: [PokemonService],
})
export class PokemonModule {}
