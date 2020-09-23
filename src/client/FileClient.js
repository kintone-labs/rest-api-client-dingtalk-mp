import {buildPath} from '@kintone/rest-api-client/esm/url';

export class FileClient {
  constructor(client, guestSpaceId) {
    this.client = client;
    this.guestSpaceId = guestSpaceId;
  }

  async uploadFile(params) {
    const path = this.buildPathWithGuestSpaceId({
      endpointName: 'file',
    });

    if (typeof params !== 'object' || typeof params.filePath === 'undefined') {
      throw new Error('in DingTalk environment, filePath is required');
    }

    return this.client.uploadFile(path, params);
  }

  async downloadFile(params) {
    const path = this.buildPathWithGuestSpaceId({
      endpointName: 'file',
    });
    return this.client.downloadFile(path, params);
  }

  buildPathWithGuestSpaceId(params) {
    return buildPath({
      ...params,
      guestSpaceId: this.guestSpaceId,
    });
  }
}
