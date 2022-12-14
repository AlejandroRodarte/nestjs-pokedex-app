import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { PokemonModel } from './entities/pokemon/pokemon.model';
import { Pokemon } from './entities/pokemon/pokemon.schema';
import { DbHelpersService } from '../db-helpers/db-helpers.service';
import { PokemonDocument } from './entities/pokemon/pokemon.document';
import { FilterQuery, isValidObjectId } from 'mongoose';
import { MongoServerError } from 'mongodb';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Injectable()
export class PokemonService {
  constructor(
    @InjectModel(Pokemon.name) private readonly pokemonModel: PokemonModel,
    private readonly dbHelpersService: DbHelpersService,
  ) {}

  async create(createPokemonDto: CreatePokemonDto): Promise<PokemonDocument> {
    const pokemonDocument = this.pokemonModel.build(createPokemonDto);
    return this.savePokemon(pokemonDocument);
  }

  async findAll(paginationDto: PaginationDto): Promise<PokemonDocument[]> {
    const pokemonsQuery = this.pokemonModel
      .find({})
      .sort({ no: 1 })
      .select('-__v');
    if (paginationDto.limit) pokemonsQuery.limit(paginationDto.limit);
    if (paginationDto.offset) pokemonsQuery.skip(paginationDto.offset);
    const pokemons = await pokemonsQuery;
    return pokemons;
  }

  async findOne(index: string): Promise<PokemonDocument> {
    const filters: Partial<FilterQuery<PokemonDocument>> = {};

    if (!isNaN(+index)) filters.no = index;
    else if (isValidObjectId(index)) filters._id = index;
    else filters.name = index;

    const [pokemonDocument, error] = await this.dbHelpersService.findOne<
      PokemonDocument,
      PokemonModel
    >({
      Model: this.pokemonModel,
      filters,
    });

    if (error)
      throw new InternalServerErrorException(
        `Something went wrong while looking for pokemon with index ${index}. Check server logs`,
      );

    if (!pokemonDocument)
      throw new NotFoundException(
        `Pokemon with index ${index} was not found in the database`,
      );

    return pokemonDocument;
  }

  async update(
    index: string,
    updatePokemonDto: UpdatePokemonDto,
  ): Promise<PokemonDocument> {
    const pokemonDocument = await this.findOne(index);
    const pokemonWithUpdates = pokemonDocument.updateFields(updatePokemonDto);
    return this.savePokemon(pokemonWithUpdates);
  }

  async remove(id: string): Promise<void> {
    const [deleteResult, error] = await this.dbHelpersService.deleteOne<
      PokemonDocument,
      PokemonModel
    >({
      Model: this.pokemonModel,
      filters: { _id: id },
    });
    if (error) this.handleMongoServerError(error);
    if (deleteResult.deletedCount === 0)
      throw new BadRequestException(
        `Pokemon with ID ${id} was not found in the database`,
      );
  }

  private async savePokemon(
    pokemonDocument: PokemonDocument,
  ): Promise<PokemonDocument> {
    const [savedPokemon, error] = await this.dbHelpersService.save(
      pokemonDocument,
    );
    if (error) this.handleMongoServerError(error);
    return savedPokemon;
  }

  private handleMongoServerError(mse: MongoServerError): void {
    if (mse.code === 11000)
      throw new BadRequestException(
        `Trying to insert/update record with an already existing index. Duplicate index is ${JSON.stringify(
          mse.keyValue,
        )}`,
      );
    throw new InternalServerErrorException(
      'Can not save/update/delete Pokemon. Check server logs',
    );
  }
}
