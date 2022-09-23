import { Injectable } from '@nestjs/common';

@Injectable()
export class SeedService {
  populate() {
    return `This action populates the database`;
  }
}
