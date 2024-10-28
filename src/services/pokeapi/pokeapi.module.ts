import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { PokeapiService } from './pokeapi.service';

@Module({
  imports: [HttpModule],
  providers: [PokeapiService],
  exports: [PokeapiService],
})
export class PokeapiModule {}
