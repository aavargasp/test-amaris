import { HttpService } from '@nestjs/axios';
import { HttpException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { AxiosHeaders, AxiosRequestConfig, isAxiosError } from 'axios';
import type { PokeapiResponse } from './pokeapi.types';

@Injectable()
export class PokeapiService {
  private readonly headers: AxiosHeaders = new AxiosHeaders({ Accept: 'application/json' });
  private requestConfig: AxiosRequestConfig;
  private readonly logger = new Logger(PokeapiService.name);

  constructor(
    private readonly httpService: HttpService,
  ) {
    this.requestConfig = {
      method: '',
      baseURL: 'https://pokeapi.co/api/v2/pokemon',
      url: '',
      headers: this.headers,
      params: undefined,
    };
  }

  async findOnePokemon(name: string): Promise<PokeapiResponse> {
    return (await this.apiCall('get', `/${name}`)) as PokeapiResponse;
  }

  private async apiCall(method: string, endpoint: string, params?: unknown): Promise<unknown> {
    try {
      this.requestConfig.method = method;
      this.requestConfig.url = endpoint;
      this.requestConfig.params = params;

      this.logger.debug('[apiCall] trying to call the API', { request: this.requestConfig });

      // * In case you prefer using axios directly
      const response = await this.httpService.axiosRef.request(this.requestConfig);

      this.logger.debug('[apiCall] response', { response: response.data });

      return response.data as unknown;
    } catch (error: unknown) {
      throw this.handleAxiosError(error);
    }
  }

  private handleAxiosError(error: unknown): HttpException {
    if (isAxiosError(error) && error.response) {
      this.logger.warn(`[apiCall] ${error.message}`, { error });
      throw new HttpException(error.response.statusText, error.response.status);
    }
    this.logger.warn('[apiCall] An unknown error ocurred', error as object);
    throw new InternalServerErrorException();
  }
}
