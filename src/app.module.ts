import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { PokeapiModule } from './services/pokeapi/pokeapi.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import ormOptions from './config/orm.option';
import { PokemonModule } from './modules/pokemon/pokemon.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(ormOptions),
    PokemonModule,
    PokeapiModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
