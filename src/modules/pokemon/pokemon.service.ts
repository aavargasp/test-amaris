import { Inject, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PokeapiService } from 'src/services/pokeapi/pokeapi.service';
import { Repository } from 'typeorm';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { Pokemon } from './entities/pokemon.entity';

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
    this.logger.debug('[create] trying to create pokemon', {
      createPokemonDto,
    });

    const pokeApiData = await this.pokeApi.findOnePokemon(
      createPokemonDto.name,
    );

    // Values from DTO
    const pokemon = new Pokemon();
    pokemon.color = createPokemonDto.color;
    pokemon.usesPokeball = createPokemonDto.usesPokeball;

    // Values from API
    if (pokeApiData.name) pokemon.name = pokeApiData.name;
    else pokemon.name = pokeApiData.pokemon;

    pokemon.height = pokeApiData.height;
    pokemon.weight = pokeApiData.weight;
    pokemon.type = pokeApiData.types[0].type.name;

    const dbPokemon = await this.entityRepo.save(pokemon);

    this.logger.debug('[create] pokemon created', { pokemon });
    return dbPokemon;
  }
}
