import {MockDdHttpClient} from '../../http/MockDdHttpClient';
import {FileClient} from '../FileClient';
import {errorResponseHandler} from '../../KintoneRestAPIClientDingTalkMP';
import {KintoneRestAPIError} from '@kintone/rest-api-client/esm/KintoneRestAPIError';

describe('FileClient', () => {
  let mockClient;
  let fileClient;
  beforeEach(() => {
    mockClient = new MockDdHttpClient({baseUrl: 'https://example.com', headers: {}, params: {}, errorResponseHandler});
    fileClient = new FileClient(mockClient);
  });
  describe('uploadFile', () => {
    describe('check path, method and params', () => {
      const params = {filePath: 'foo/bar/baz.txt'};
      beforeEach(() => {
        fileClient.uploadFile(params).then().catch(() => {});
      });
      it('should pass the path to the http client', () => {
        expect(mockClient.getLogs()[0].path).toBe('/k/v1/file.json');
      });
      it('should send a post request', () => {
        expect(mockClient.getLogs()[0].method).toBe('post');
      });
      it('should pass filePath as a param to the http client', () => {
        expect(mockClient.getLogs()[0].params).toEqual(params);
      });
      it('should raise an error if filePath is not specified', () => {
        expect(fileClient.uploadFile()).rejects.toThrow('in DingTalk environment, filePath is required');
        expect(fileClient.uploadFile([])).rejects.toThrow('in DingTalk environment, filePath is required');
        expect(fileClient.uploadFile({})).rejects.toThrow('in DingTalk environment, filePath is required');
      });
    });

    describe('check response', () => {
      const params = {filePath: 'foo/bar/baz.txt'};
      it('should return fileKey if upload file successfully', () => {
        mockClient.setCallbackType('success');
        const fileKey = '202006120841338E8CDF7461714F869E7E62ECEEA90314056';
        mockClient.mockResponse({
          statusCode: 200,
          data: JSON.stringify({fileKey})
        });
        expect(fileClient.uploadFile(params)).resolves.toEqual({fileKey});
      });
      it('should raise a KintoneRestAPIError if statusCode is not 200', () => {
        mockClient.setCallbackType('success');
        mockClient.mockResponse({
          statusCode: 520,
          data: JSON.stringify({}),
          header: {},
        });
        expect(fileClient.uploadFile(params)).rejects.toThrow(KintoneRestAPIError);
      });
      it('should raise an Error if some DingTalk Miniprogram error occurs', () => {
        mockClient.setCallbackType('fail');
        mockClient.mockResponse({error: 'some errors'});
        expect(fileClient.uploadFile(params)).rejects.toThrow('some errors');
      });
    });
  });

  describe('downloadFile', () => {
    describe('check path, method and params', () => {
      const params = {fileKey: 'some_file_key'};
      beforeEach(() => {
        fileClient.downloadFile(params).then().catch(() => {});
      });
      it('should pass the path to the http client', () => {
        expect(mockClient.getLogs()[0].path).toBe('/k/v1/file.json');
      });
      it('should send a get request', () => {
        expect(mockClient.getLogs()[0].method).toBe('get');
      });
      it('should pass fileKey as a param to the http client', () => {
        expect(mockClient.getLogs()[0].params).toEqual(params);
      });
    });

    describe('check response', () => {
      const params = {fileKey: 'some_file_key'};
      it('should return filePath if download file successfully', () => {
        const filePath = 'https://resource/1593330518172.json';
        mockClient.setCallbackType('success');
        mockClient.mockResponse({
          filePath,
          header: {},
        });
        expect(fileClient.downloadFile(params)).resolves.toEqual({filePath});
      });
    });
  });
});

describe('FileClient with guestSpaceId', () => {
  const GUEST_SPACE_ID = 1;
  const params = {filePath: 'foo/bar/baz.txt'};
  const mockClient = new MockDdHttpClient({baseUrl: 'https://example.com', headers: {}, params: {}, errorResponseHandler});
  const fileClient = new FileClient(mockClient, GUEST_SPACE_ID);
  fileClient.uploadFile(params).then().catch(() => {});
  it('should pass the path to the http client', () => {
    expect(mockClient.getLogs()[0].path).toBe(
      `/k/guest/${GUEST_SPACE_ID}/v1/file.json`
    );
  });
});