import {KintoneRestAPIClientDingTalkMP, errorResponseHandler} from '../KintoneRestAPIClientDingTalkMP';
import {Base64} from 'js-base64';
import {KintoneRestAPIError} from '@kintone/rest-api-client/esm/KintoneRestAPIError';

describe('KintoneRestAPIClientDingTalkMP', () => {
  describe('constructor', () => {
    describe('Header', () => {
      const baseUrl = 'https://example.com';
      it('ApiToken auth', () => {
        const API_TOKEN = 'ApiToken';
        const auth = {
          apiToken: API_TOKEN,
        };
        const client = new KintoneRestAPIClientDingTalkMP({
          baseUrl,
          auth
        });
        expect(client.getHeaders()).toEqual({
          'X-Cybozu-API-Token': API_TOKEN,
        });
      });
      it('ApiToken auth using multiple tokens as comma-separated string', () => {
        const API_TOKEN1 = 'ApiToken1';
        const API_TOKEN2 = 'ApiToken2';
        const auth = {
          apiToken: `${API_TOKEN1},${API_TOKEN2}`,
        };
        const client = new KintoneRestAPIClientDingTalkMP({
          baseUrl,
          auth
        });
        expect(client.getHeaders()).toEqual({
          'X-Cybozu-API-Token': `${API_TOKEN1},${API_TOKEN2}`,
        });
      });
      it('ApiToken auth using multiple tokens as array', () => {
        const API_TOKEN1 = 'ApiToken1';
        const API_TOKEN2 = 'ApiToken2';
        const auth = {
          apiToken: [API_TOKEN1, API_TOKEN2],
        };
        const client = new KintoneRestAPIClientDingTalkMP({
          baseUrl,
          auth
        });
        expect(client.getHeaders()).toEqual({
          'X-Cybozu-API-Token': `${API_TOKEN1},${API_TOKEN2}`,
        });
      });
      it('Password auth', () => {
        const USERNAME = 'user';
        const PASSWORD = 'password';
        const auth = {
          username: USERNAME,
          password: PASSWORD,
        };
        const client = new KintoneRestAPIClientDingTalkMP({
          baseUrl,
          auth
        });
        expect(client.getHeaders()).toEqual({
          'X-Cybozu-Authorization': Base64.encode(`${USERNAME}:${PASSWORD}`),
        });
      });
      it('Basic auth', () => {
        const basicAuth = {
          username: 'user',
          password: 'password'
        };
        const API_TOKEN = 'ApiToken';
        const auth = {
          apiToken: API_TOKEN,
        };
        const client = new KintoneRestAPIClientDingTalkMP({
          baseUrl,
          auth,
          basicAuth
        });
        expect(client.getHeaders()).toEqual({
          'X-Cybozu-API-Token': API_TOKEN,
          Authorization: `Basic ${Base64.encode('user:password')}`,
        });
      });
      it('Test getBaseUrl', () => {
        const API_TOKEN = 'ApiToken';
        const auth = {apiToken: API_TOKEN};
        const client = new KintoneRestAPIClientDingTalkMP({
          baseUrl,
          auth
        });
        expect(client.getBaseUrl()).toBe('https://example.com');
      });

      it('should raise an error in DingTalk environment if baseUrl param is not specified', () => {
        const USERNAME = 'user';
        const PASSWORD = 'password';
        const auth = {
          username: USERNAME,
          password: PASSWORD,
        };
        expect(() => new KintoneRestAPIClientDingTalkMP({auth})).toThrow(
          'in DingTalk environment, baseUrl is required'
        );
      });
      it('should raise an error in DingTalk environment if auth param is not specified', () => {
        expect(() => new KintoneRestAPIClientDingTalkMP({baseUrl})).toThrow(
          'in DingTalk environment, auth is required'
        );
      });
    });
  });
  describe('errorResponseHandler', () => {
    it('should raise a KintoneRestAPIError', () => {
      const errorResponse = {
        data: {},
        statusCode: 500,
        statusText: 'Internal Server Error',
        header: {},
      };
      expect(() => {
        errorResponseHandler(errorResponse);
      }).toThrow(KintoneRestAPIError);
    });
    it('should raise an error if error.data is undefined', () => {
      expect(() => {
        errorResponseHandler({error: 'unknown error'});
      }).toThrow('unknown error');
    });
  });
});