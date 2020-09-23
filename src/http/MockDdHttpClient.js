import {DdHttpClient} from './DdHttpClient';

export class MockDdHttpClient extends DdHttpClient {
  constructor({baseUrl, headers, params, errorResponseHandler}) {
    super({baseUrl, headers, params, errorResponseHandler});

    this.type = 'fail';
    this.responses = {};
    this.logs = [];
    this.dd = {};
    this.dd.downloadFile = this.dd.uploadFile = this.dd.httpRequest = (requestConfig) => {
      if (typeof requestConfig.success === 'function' && this.type === 'success') {
        requestConfig.success(this.responses);
      } else if (typeof requestConfig.fail === 'function' && this.type === 'fail') {
        requestConfig.fail(this.responses);
      }
    };
  }

  setCallbackType(t) {
    this.type = t === 'success' ? 'success' : 'fail';
  }

  mockResponse(mock) {
    this.responses = mock;
  }

  getLogs() {
    return this.logs;
  }

  async get(path, params) {
    this.logs.push({method: 'get', path, params});
    return super.get(path, params);
  }

  async post(path, params) {
    this.logs.push({method: 'post', path, params});
    return super.post(path, params);
  }

  async put(path, params) {
    this.logs.push({method: 'get', path, params});
    return super.put(path, params);
  }

  async delete(path, params) {
    this.logs.push({method: 'delete', path, params});
    return super.delete(path, params);
  }

  async downloadFile(path, params) {
    this.logs.push({method: 'get', path, params});
    return super.downloadFile(path, params);
  }

  async uploadFile(path, params) {
    this.logs.push({method: 'post', path, params});
    return super.uploadFile(path, params);
  }

  callDdAPI(requestConfig) {
    switch (requestConfig.fileMethod) {
      case 'download': {
        return this.dd.downloadFile(requestConfig);
      }
      case 'upload': {
        return this.dd.uploadFile(requestConfig);
      }
      default: {
        return this.dd.httpRequest(requestConfig);
      }
    }
  }
}