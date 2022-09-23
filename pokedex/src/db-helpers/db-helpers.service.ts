import { Injectable } from '@nestjs/common';
import { MongoServerError, DeleteResult } from 'mongodb';
import mongoose from 'mongoose';
import { AsyncTuple } from 'src/types/async-tuple.type';
import { DeleteOneArgs } from './interfaces/delete-one-args.interface';
import { FindOneArgs } from './interfaces/find-one-args.interface';
import { RemoveArgs } from './interfaces/remove-args.interface';

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

  async findOne<DocumentType, ModelType extends mongoose.Model<DocumentType>>(
    args: FindOneArgs<DocumentType, ModelType>,
  ): AsyncTuple<DocumentType | null, MongoServerError> {
    try {
      const document = await args.Model.findOne(args.filters);
      return [document, undefined];
    } catch (e) {
      if (e instanceof MongoServerError) return [undefined, e];
    }
  }

  async remove<DocumentType extends mongoose.Document>(
    args: RemoveArgs<DocumentType>,
  ): AsyncTuple<DocumentType, MongoServerError> {
    try {
      const deletedDocument = await args.doc.remove(args.options);
      return [deletedDocument, undefined];
    } catch (e) {
      if (e instanceof MongoServerError) return [undefined, e];
    }
  }

  async deleteOne<DocumentType, ModelType extends mongoose.Model<DocumentType>>(
    args: DeleteOneArgs<DocumentType, ModelType>,
  ): AsyncTuple<DeleteResult, MongoServerError> {
    try {
      const qwh = await args.Model.deleteOne(args.filters, args.options);
      return [qwh, undefined];
    } catch (e) {
      if (e instanceof MongoServerError) return [undefined, e];
    }
  }
}
