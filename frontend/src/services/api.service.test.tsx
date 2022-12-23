import { ContentType, Method } from '../models/api-service';
import { expect, it, jest } from '@jest/globals';

import { AxiosRequestConfig } from 'axios';
import apiService from './api.service';
import externalApiService from './external-api.service';

const baseUrl = process.env.REACT_APP_API_SERVER_URL;
const externalApiServiceSpy = jest
  .spyOn(externalApiService, 'callExternalApi')
  // @ts-expect-error
  .mockImplementationOnce((options) => console.log(options));

describe('ApiService', () => {
  describe('apiGet', () => {
    afterEach(() => {
      jest.resetAllMocks();
    });

    it('calls callExternalApi() with options for a GET request to the defined endpoint and a timeout of 5000ms', async () => {
      const options: AxiosRequestConfig = {
        url: `${baseUrl}/test`,
        method: Method.GET,
        timeout: 5000,
      };
      await apiService.apiGet('test');
      expect(externalApiServiceSpy).toHaveBeenCalledWith(options);
    });
  });

  describe('apiPut', () => {
    it('calls callExternalApi() with options for a PUT request to the defined endpoint and a timeout of 5000ms', async () => {
      const options: AxiosRequestConfig = {
        url: `${baseUrl}/test/id_1`,
        method: Method.PUT,
        data: { test: 'test' },
        headers: { contentType: ContentType.APPLICATION_JSON },
        timeout: 5000,
      };
      await apiService.apiPut('test', 'id_1', { test: 'test' });
      expect(externalApiServiceSpy).toHaveBeenCalledWith(options);
    });
  });

  describe('apiPost', () => {
    it('calls callExternalApi() with options for a POST request to the defined endpoint and a timeout of 5000ms', async () => {
      const options: AxiosRequestConfig = {
        url: `${baseUrl}/test`,
        method: Method.POST,
        data: { test: 'test' },
        headers: { contentType: ContentType.APPLICATION_JSON },
        timeout: 5000,
      };
      await apiService.apiPost('test', { test: 'test' });
      expect(externalApiServiceSpy).toHaveBeenCalledWith(options);
    });
  });

  describe('apiDelete', () => {
    it('calls callExternalApi() with options for a DELETE request to the defined endpoint and a timeout of 5000ms', async () => {
      const options: AxiosRequestConfig = {
        url: `${baseUrl}/test/id_1`,
        method: Method.DEL,
        timeout: 5000,
      };
      await apiService.apiDelete('test', 'id_1');
      expect(externalApiServiceSpy).toHaveBeenCalledWith(options);
    });
  });
});
