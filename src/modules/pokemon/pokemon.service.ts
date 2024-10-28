import { Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { Pokemon } from './entities/pokemon.entity';
import { PokeapiService } from 'src/services/pokeapi/pokeapi.service';

@Injectable()
export class PokemonService {
  private readonly logger = new Logger(PokemonService.name);

  constructor(
    @InjectRepository(Pokemon)
    private entityRepo: Repository<Pokemon>,

    @Inject(PokeapiService)
    private readonly pokeApi: PokeapiService,
  ) {}

  async create(createPokemonDto: CreatePokemonDto): Promise<Pokemon> {
    this.logger.debug('[create] trying to create pokemon', { createPokemonDto });

    const pokemonName = createPokemonDto.name;
    const pokeApiData = await this.pokeApi.findOnePokemon(pokemonName)
    const pokemon = await this.entityRepo.save(new Pokemon(pokemonName, pokeApiData.height, pokeApiData.weight));

    this.logger.debug('[create] pokemon created', { pokemon });
    return pokemon;
  }
}
