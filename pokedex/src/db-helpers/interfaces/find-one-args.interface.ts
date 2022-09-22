import mongoose, { FilterQuery } from 'mongoose';

export interface FindOneArgs<
  DocumentType,
  ModelType extends mongoose.Model<DocumentType>,
> {
  Model: ModelType;
  filters: FilterQuery<DocumentType>;
}
