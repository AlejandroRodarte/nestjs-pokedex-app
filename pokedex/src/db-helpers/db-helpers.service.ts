import { Injectable } from '@nestjs/common';
import { MongoServerError } from 'mongodb';
import mongoose from 'mongoose';
import { AsyncTuple } from 'src/types/async-tuple.type';

@Injectable()
export class DbHelpersService {
  async save<DocumentType extends mongoose.Document>(
    document: DocumentType,
  ): AsyncTuple<DocumentType, MongoServerError> {
    try {
      const savedDocument = await document.save();
      return [savedDocument, undefined];
    } catch (e) {
      if (e instanceof MongoServerError) return [undefined, e];
    }
  }
}
