# kintone-rest-api-client-dingtalk-mp

[![npm version](https://badge.fury.io/js/%40kintone%2Frest-api-client-dingtalk-mp.svg)](https://badge.fury.io/js/%40kintone%2Frest-api-client-dingtalk-mp)

An API client for Kintone REST API, it is used in DingTalk Mini Program client.<br>
It is based on [@kintone/rest-api-client@v1.2.0](https://github.com/kintone/js-sdk/tree/%40kintone/rest-api-client%401.2.0/packages/rest-api-client). <br>
It wraps the functions of app, record and bulkRequest of "@kintone/rest-api-client", and develops the new functions of file.

## Requirement

- [DingTalk Developer Tool](https://ding-doc.dingtalk.com/doc#/kn6zg7/zunrdk) (The latest)<br>

## Usage

**Step 1**

Open DingTalk Developer Tool and create a new project. (Ref. [小程序IDE使用](https://ding-doc.dingtalk.com/doc#/dev/yqm3sq))

**Step 2**

Install with `npm`

```shell
cd [your-project-directory]
npm init -y
npm install @kintone/rest-api-client-dingtalk-mp
```

### Sample code

```js
const {KintoneRestAPIClientDingTalkMP} = require('@kintone/rest-api-client-dingtalk-mp');
const client = new KintoneRestAPIClientDingTalkMP({
  baseUrl: "https://example.cybozu.com",
  // Use password authentication
  auth: {
    username: process.env.KINTONE_USERNAME,
    password: process.env.KINTONE_PASSWORD,
  },
  // Use API token authentication
  // auth: { apiToken: process.env.KINTONE_API_TOKEN }
});

client.record
  .getRecords({ app: "1" })
  .then((resp) => {
    console.log(resp.records);
  })
  .catch((err) => {
    console.log(err);
  });
```

## Parameters for `KintoneRestAPIClientDingTalkMP`

| Name                       |                               Type                               |          Required           | Description                                                                                                                                                                                                                  |
| -------------------------- | :--------------------------------------------------------------: | :-------------------------: | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| baseUrl                    |                              String                              | Required | The base URL for your Kintone environment.<br />It must start with `https`. (e.g. https://example.kintone.com) |
| auth                       |                              Object                              | Required | The object for authentication. See [Authentication](#Authentication).                                                                                                                                                        |
| guestSpaceId               |                         Number or String                         |                             | The guest space ID. If you are dealing with apps that are in guest spaces, please specify this.                                                                                                                              |
| basicAuth                  |                              Object                              |                             | If your Kintone environment uses Basic authentication, please specify its username and password.                                                                                                                             |
| basicAuth.username         |                              String                              |                             | The username of Basic authentication.                                                                                                                                                                                        |
| basicAuth.password         |                              String                              |                             | The password of Basic authentication.                                                                                                                                                                                        |

### Authentication

The client supports three authentication methods:

1. [Password authentication](https://developer.kintone.io/hc/en-us/articles/212495188#passwordAuth)
2. [API token authentication](https://developer.kintone.io/hc/en-us/articles/212495188#APItokenAuth)

The required parameters inside `auth` are different by the methods.
The client determines which method to use by passed parameters.

#### 1. Parameters for [Password authentication](https://developer.kintone.io/hc/en-us/articles/212495188#passwordAuth)

| Name     |  Type  | Required |    Description    |
| -------- | :----: | :------: | ----------------- |
| username | String |   Yes    | User's login name |
| password | String |   Yes    | User's password   |

#### 2. Parameters for [API token authentication](https://developer.kintone.io/hc/en-us/articles/212495188#APItokenAuth)

| Name     |        Type        | Required | Description                                             |
| -------- | :----------------: | :------: | ------------------------------------------------------- |
| apiToken | String or String[] |   Yes    | You can pass multiple api tokens as an array of string. |

## References

- [File](docs/file.md)

The usage of following functions is not changed, you can refer to the doc of "@kintone/rest-api-client".<br>
Pay attention to the class name, you should use KintoneRestAPIClientDingTalkMP in DingTalk. Refer to [Sample code](#sample-code).
- [@kintone/rest-api-client/errorHandling](https://github.com/kintone/js-sdk/blob/%40kintone/rest-api-client%401.2.0/packages/rest-api-client/docs/errorHandling.md)
- [@kintone/rest-api-client/record](https://github.com/kintone/js-sdk/blob/%40kintone/rest-api-client%401.2.0/packages/rest-api-client/docs/record.md)
- [@kintone/rest-api-client/app](https://github.com/kintone/js-sdk/blob/%40kintone/rest-api-client%401.2.0/packages/rest-api-client/docs/app.md)
- [@kintone/rest-api-client/bulkRequest](https://github.com/kintone/js-sdk/blob/%40kintone/rest-api-client%401.2.0/packages/rest-api-client/docs/bulkRequest.md)

## License

- [MIT](LICENSE.md)

## Copyright

Copyright(c) Cybozu, Inc.
