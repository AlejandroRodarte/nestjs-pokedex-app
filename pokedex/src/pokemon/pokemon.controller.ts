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
} from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { PokemonDocument } from './entities/pokemon/pokemon.document';

@Controller('pokemon')
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createPokemonDto: CreatePokemonDto): Promise<PokemonDocument> {
    return this.pokemonService.create(createPokemonDto);
  }

  @Get()
  findAll() {
    return this.pokemonService.findAll();
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
  remove(@Param('id') id: string) {
    return this.pokemonService.remove(+id);
  }
}
