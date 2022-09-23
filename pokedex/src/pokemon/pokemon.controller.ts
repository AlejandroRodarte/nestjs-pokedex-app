import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { PokemonDocument } from './entities/pokemon/pokemon.document';
import { ParseMongoIdPipe } from '../common/pipes/parse-mongo-id.pipe';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Controller('pokemon')
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createPokemonDto: CreatePokemonDto): Promise<PokemonDocument> {
    return this.pokemonService.create(createPokemonDto);
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto): Promise<PokemonDocument[]> {
    return this.pokemonService.findAll(paginationDto);
  }

  @Get(':index')
  findOne(@Param('index') index: string): Promise<PokemonDocument> {
    return this.pokemonService.findOne(index);
  }

  @Patch(':index')
  update(
    @Param('index') index: string,
    @Body() updatePokemonDto: UpdatePokemonDto,
  ): Promise<PokemonDocument> {
    return this.pokemonService.update(index, updatePokemonDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseMongoIdPipe) id: string): Promise<void> {
    return this.pokemonService.remove(id);
  }
}
