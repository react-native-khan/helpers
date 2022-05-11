import {getItem, logger} from '@react-native-khan/helpers';

class Request {
  successHandler = () => {};
  errorHandler = () => {};

  setHandler = handler => {
    this.errorHandler = handler?.errorHandler;
    this.successHandler = handler?.successHandler;
  };

  create = async ({url, body, headers, method, analytics = true}) => {
    const token = await getItem('token');
    const options = {
      method,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        ...(token && {Authorization: `Bearer ${token}`}),
        ...(headers && headers),
      },
    };

    const wrapperLog = (response, error = false) => {
      analytics && error && logger(
        `\n🚀 Url::${url}`,
        `\n🗿 Body::${JSON.stringify(body||{})}`,
        `\n🚧 Option::${JSON.stringify(options)}`,
        `\n${error ? '💀' : '🦄'} Response::${JSON.stringify(response)}`,
      );
    };

    const onSuccess = res => {
      this.successHandler(res);
      const response = res?.data || res;
      wrapperLog(response);
      return Promise.resolve(response);
    };

    const onError = err => {
      this.errorHandler(err);
      const response = err?.response?.data || err?.response || err;
      wrapperLog(response, true);
      return Promise.reject(response);
    };

    return fetch(url, {...options, body: JSON.stringify(body)})
      .then(async resp => {
        let res = await resp.json();
        resp.ok ? onSuccess(res) : onError(res);
      })
      .catch(err => onError(err));
  };
}
export default Request;
