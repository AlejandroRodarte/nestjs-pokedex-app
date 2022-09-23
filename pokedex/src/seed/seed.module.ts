import { Module, Provider } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { PokemonModule } from 'src/pokemon/pokemon.module';
import { CommonModule } from 'src/common/common.module';
import { HTTP_ADAPTER_SEED_SERVICE } from './interfaces/http-adapter.interface.tokens';
import { AxiosAdapter } from '../common/adapters/axios.adapter';

const providers: Provider[] = [
  SeedService,
  { provide: HTTP_ADAPTER_SEED_SERVICE, useClass: AxiosAdapter },
];

@Module({
  controllers: [SeedController],
  imports: [CommonModule, PokemonModule],
  providers,
})
export class SeedModule {}
