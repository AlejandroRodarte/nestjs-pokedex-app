import mongoose, { FilterQuery, QueryOptions } from 'mongoose';

export interface DeleteOneArgs<
  DocumentType,
  ModelType extends mongoose.Model<DocumentType>,
> {
  Model: ModelType;
  filters?: FilterQuery<DocumentType>;
  options?: QueryOptions<DocumentType>;
}
