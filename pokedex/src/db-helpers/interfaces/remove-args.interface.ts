import mongoose, { QueryOptions } from 'mongoose';

export interface RemoveArgs<DocumentType extends mongoose.Document> {
  doc: DocumentType;
  options?: QueryOptions<DocumentType>;
}
