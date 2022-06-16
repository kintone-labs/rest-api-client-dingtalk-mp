# File

- [uploadFile](#uploadFile)
- [downloadFile](#downloadFile)

## Overview

```js
const client = new KintoneRestAPIClientDingTalkMP({
  baseUrl: "https://example.cybozu.com",
  auth: {
    username: process.env.KINTONE_USERNAME,
    password: process.env.KINTONE_PASSWORD,
  }
});

(async () => {
  const APP_ID = "1";
  const ATTACHMENT_FIELD_CODE = "Attachment";

  const FILE = {
    name: "Hello.txt",
    data: "Hello World!"
  };

  const filePath = `${dd.env.USER_DATA_PATH}/${FILE.name}`;

  // Upload a file and attach it to a record
  const { fileKey } = await client.file.uploadFile({ filePath });
  const { id } = await client.record.addRecord({
    app: APP_ID,
    record: {
      [ATTACHMENT_FIELD_CODE]: {
        value: [{ fileKey }]
      }
    }
  });

  // Download the attached file
  const { record } = await client.record.getRecord({
    app: APP_ID,
    id,
  });
  const { filePath } = await client.file.downloadFile({
    fileKey: record[ATTACHMENT_FIELD_CODE].value[0].fileKey
  });
  console.log(filePath);
})();
```

- All methods are defined on the `file` property.

## Methods

### uploadFile

Uploads a file to Kintone.

`uploadFile` returns a file key for the uploaded file.
You can use the file key at the following place.

- Attachment field in an app
- JavaScript and CSS customization settings of an app

#### Parameters

| Name      |  Type  | Required | Description           |
| --------- | :----: | :------: | ----------------------|
| filePath  | String |    Yes   | The path to the file. |

#### Returns

`uploadFile` returns a Promise object that is resolved with an object having following properties.

| Name    |  Type  | Description                        |
| ------- | :----: | ---------------------------------- |
| fileKey | String | The file key of the uploaded file. |

#### Reference

- https://ding-doc.dingtalk.com/doc#/dev/frd69q
- https://kintone.dev/en/docs/kintone/rest-api/files/upload-file/

### downloadFile

Downloads files using a file key from kintone.

This is **NOT** the file key `uploadFile` returns.
You can get the file key from the following place.

- Attachment field in an app
- JavaScript and CSS customization settings of an app

#### Parameters

| Name       |  Type  | Required | Description                          |
| ---------- | :----: | :------: | ------------------------------------ |
| fileKey    | String |   Yes    | The file key of the downloaded file. |

#### Returns

`downloadFile` returns a Promise object that is resolved with the following value.

| Name         |  Type  | Description                                                                                                                                                                 |
| ------------ | :----: | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| filePath | String | Temporary file path. |

#### Reference

- https://ding-doc.dingtalk.com/doc#/dev/frd69q
- https://kintone.dev/en/docs/kintone/rest-api/files/download-file/
