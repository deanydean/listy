import { ApiResponse, ContentType, Method } from '../models/api-service';
import externalApiService, { ExternalApiService } from './external-api.service';

import { AxiosRequestConfig } from 'axios';

const baseUrl = process.env.REACT_APP_API_SERVER_URL;

export class ApiService {
  readonly baseUrl: string;
  readonly timeout: number;
  readonly service: ExternalApiService;

  constructor(
    baseUrl: string,
    service: ExternalApiService,
    timeout: number = 5000
  ) {
    this.baseUrl = baseUrl;
    this.timeout = timeout;
    this.service = service;
  }

  async apiGet(endpoint: string): Promise<ApiResponse> {
    const options: AxiosRequestConfig = {
      url: `${baseUrl}/${endpoint}`,
      method: Method.GET,
      timeout: this.timeout,
    };

    return await this.service.callExternalApi(options);
  }

  async apiPut(endpoint: string, id: string, body: object) {
    const options: AxiosRequestConfig = {
      url: `${baseUrl}/${endpoint}/${id}`,
      method: Method.PUT,
      headers: {
        contentType: ContentType.APPLICATION_JSON,
      },
      data: body,
      timeout: this.timeout,
    };

    return await this.service.callExternalApi(options);
  }

  async apiPost(endpoint: string, body: object) {
    const options: AxiosRequestConfig = {
      url: `${baseUrl}/${endpoint}`,
      method: Method.POST,
      headers: {
        contentType: ContentType.APPLICATION_JSON,
      },
      data: body,
      timeout: this.timeout,
    };

    return await this.service.callExternalApi(options);
  }

  apiDelete = async (endpoint: string, id: string) => {
    const options: AxiosRequestConfig = {
      url: `${this.baseUrl}/${endpoint}/${id}`,
      method: Method.DEL,
      timeout: this.timeout,
    };

    return await this.service.callExternalApi(options);
  };
}

// @ts-expect-error [baseUrl is an env variable]
export default new ApiService(baseUrl, externalApiService);
