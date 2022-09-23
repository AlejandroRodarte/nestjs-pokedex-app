import axios, { AxiosInstance } from 'axios';
import { HttpAdapter } from '../interfaces/http-adapter.interface';
import { AsyncTuple } from '../../types/async-tuple.type';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AxiosAdapter implements HttpAdapter {
  private readonly axios: AxiosInstance = axios;

  async get<T>(url: string): AsyncTuple<T, Error> {
    try {
      const res = await this.axios.get<T>(url);
      return [res.data, undefined];
    } catch (e) {
      if (e instanceof Error) return [undefined, e];
    }
  }
}
