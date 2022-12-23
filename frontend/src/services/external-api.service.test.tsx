import { ApiResponse, Method } from '../models/api-service';
import axios, {
  AxiosError,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosStatic,
} from 'axios';
import { expect, it, jest } from '@jest/globals';

import externalApiService from './external-api.service';

const baseUrl = process.env.REACT_APP_API_SERVER_URL;

interface AxiosMock extends AxiosStatic {
  mockResolvedValue: Function;
  mockRejectedValue: Function;
}

jest.mock('axios');
const mockAxios = axios as AxiosMock;

describe('ExternalApiService', () => {
  describe('callExternalApi', () => {
    afterEach(() => {
      jest.resetAllMocks();
    });

    it('calls axios() with the provided options', async () => {
      const options: AxiosRequestConfig = {
        url: `${baseUrl}/test`,
        method: Method.GET,
        timeout: 5000,
      };
      await externalApiService.callExternalApi(options);
      expect(mockAxios).toBeCalledWith(options);
    });

    it('returns status code 200 and response data if the axios call is successful', async () => {
      const options: AxiosRequestConfig = {
        url: `${baseUrl}/test`,
        method: Method.GET,
        timeout: 5000,
      };
      mockAxios.mockResolvedValue({ data: 'test' });
      await externalApiService.callExternalApi(options).then((result) => {
        expect(result.data).toBe('test');
        expect(result.error).toBeNull();
        expect(result.status).toBe(200);
      });
    });

    it('handles non-axios errors', async () => {
      const options: AxiosRequestConfig = {
        url: `${baseUrl}/test`,
        method: Method.GET,
        timeout: 5000,
      };
      // This will throw a non-axios error because axios() is mocked and data can't be destructured.
      await externalApiService.callExternalApi(options).then((result) => {
        expect(result.data).toBeNull();
        expect(result.error).toBeDefined();
        expect(result.status).toBe(500);
      });
    });
  });

  describe('handleError', () => {
    it('returns "request failed" in the error message if by default', async () => {
      const error: AxiosError = {
        isAxiosError: true,
        toJSON: function (): object {
          throw new Error('Function not implemented.');
        },
        name: '',
        message: '',
      };

      const response: ApiResponse = externalApiService.handleError(error, true);
      expect(response.error?.message).toBe('request failed');
    });

    it('returns the response status text in the error message if present', async () => {
      const mockResponse: AxiosResponse = {
        data: 'test',
        status: 123,
        statusText: 'test',
        config: {},
        headers: {},
      };

      const error: AxiosError = {
        isAxiosError: true,
        toJSON: function (): object {
          throw new Error('Function not implemented.');
        },
        name: '',
        message: '',
        response: mockResponse,
      };

      const response: ApiResponse = externalApiService.handleError(error, true);
      expect(response.error?.message).toBe('test');
    });

    it('returns the axios error message in the error message if present', async () => {
      const error: AxiosError = {
        isAxiosError: true,
        toJSON: function (): object {
          throw new Error('Function not implemented.');
        },
        name: '',
        message: 'test',
      };

      const response: ApiResponse = externalApiService.handleError(error, true);
      expect(response.error?.message).toBe('test');
    });
  });
});
