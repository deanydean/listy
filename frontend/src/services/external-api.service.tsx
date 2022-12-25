import axios, { AxiosError, AxiosRequestConfig, isAxiosError } from 'axios';

import { ApiResponse } from '../models/api-service';

export class ExternalApiService {
  async callExternalApi(options: AxiosRequestConfig): Promise<ApiResponse> {
    try {
      const response = await axios(options);
      const { data } = response;

      return {
        data,
        error: null,
        status: 200,
      };
    } catch (error) {
      return this.handleError(error, isAxiosError(error));
    }
  }

  handleError(error: unknown, isAxiosError: boolean): ApiResponse {
    if (isAxiosError) {
      const axiosError = error as AxiosError;
      const { response } = axiosError;

      let message = 'request failed';

      if (response && response.statusText) {
        message = response.statusText;
      }

      if (axiosError.message) {
        message = axiosError.message;
      }

      return {
        data: null,
        error: {
          message,
        },
        status: (error as AxiosError).response?.status ?? 'timeout',
      };
    }

    return {
      data: null,
      error: {
        message: (error as Error).message,
      },
      status: 500,
    };
  }
}

export default new ExternalApiService();
