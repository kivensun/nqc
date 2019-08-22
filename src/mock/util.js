const responseBody = {
  flag: false,
  data: {},
  errMsg: null,
  outMsg: null
};

export const builder = (flag = false, data, errMsg, outMsg, headers = {}) => {
  responseBody.data = data;
  if (flag !== undefined && flag !== null) {
    responseBody.flag = flag;
  }
  if (errMsg !== undefined && errMsg !== null) {
    responseBody.errMsg = errMsg;
  }
  if (outMsg !== undefined && outMsg !== null) {
    responseBody.outMsg = outMsg;
  }
  if (headers !== null && typeof headers === 'object' && Object.keys(headers).length > 0) {
    responseBody._headers = headers;
  }
  return responseBody;
};

export const getQueryParameters = options => {
  const url = options.url;
  const search = url.split('?')[1];
  if (!search) {
    return {};
  }
  return JSON.parse(
    '{"' +
      decodeURIComponent(search)
        .replace(/"/g, '\\"')
        .replace(/&/g, '","')
        .replace(/=/g, '":"') +
      '"}'
  );
};

export const getBody = options => {
  return options.body && JSON.parse(options.body);
};