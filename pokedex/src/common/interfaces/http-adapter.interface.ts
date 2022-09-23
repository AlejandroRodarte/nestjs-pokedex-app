import { AsyncTuple } from '../../types/async-tuple.type';

export interface HttpAdapter {
  get<T>(url: string): AsyncTuple<T, Error>;
}
