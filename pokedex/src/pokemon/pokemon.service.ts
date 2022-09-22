import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { PokemonModel } from './entities/pokemon/pokemon.model';
import { Pokemon } from './entities/pokemon/pokemon.schema';
import { DbHelpersService } from '../db-helpers/db-helpers.service';

@Injectable()
export class PokemonService {
  constructor(
    @InjectModel(Pokemon.name) private readonly pokemonModel: PokemonModel,
    private readonly dbHelpersService: DbHelpersService,
  ) {}

  async create(createPokemonDto: CreatePokemonDto) {
    const pokemonDocument = this.pokemonModel.build(createPokemonDto);
    const [savedPokemon, error] = await this.dbHelpersService.save(
      pokemonDocument,
    );
    if (error) {
      if (error.code === 11000)
        throw new BadRequestException(
          `Trying to insert record with an already existing index. Duplicate index is ${JSON.stringify(
            error.keyValue,
          )}`,
        );
      throw new InternalServerErrorException(
        'Can not create Pokemon. Check server logs',
      );
    }
    return savedPokemon;
  }

  findAll() {
    return `This action returns all pokemon`;
  }

  findOne(id: number) {
    return `This action returns a #${id} pokemon`;
  }

  update(id: number, updatePokemonDto: UpdatePokemonDto) {
    return `This action updates a #${id} pokemon`;
  }

  remove(id: number) {
    return `This action removes a #${id} pokemon`;
  }
}
