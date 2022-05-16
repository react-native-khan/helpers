import { getItem, logger } from "@react-native-khan/helpers";

class Request {
  successHandler = () => {};
  errorHandler = () => {};

  setHandler = (handler) => {
    this.errorHandler = handler?.errorHandler;
    this.successHandler = handler?.successHandler;
  };

  create = ({ url, body, headers, method }) =>
    new Promise(async (resolve, reject) => {
      const token = await getItem("token").catch(() => false);
      const options = {
        method,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
          ...(headers && headers),
        },
      };

      const wrapperLog = ({ response, error = false }) =>
        logger(
          `\n🚀 Url::${url}`,
          `\n🗿 Body::${JSON.stringify(body || {})}`,
          `\n🚧 Option::${JSON.stringify(options)}`,
          `\n${error ? "💀" : "🦄"} Response::${JSON.stringify(response)}`
        );

      const onSuccess = (res) => {
        this.successHandler(res);
        const response = res?.data || res;
        wrapperLog({ response });
        resolve(response);
      };

      const onError = (err) => {
        this.errorHandler(err);
        const response = err?.response?.data || err?.response || err;
        wrapperLog({ response, error: true });
        reject(response);
      };

      try {
        let response = await fetch(url, {
          ...options,
          body: JSON.stringify(body),
        });
        let res = await response.json();
        response.ok ? onSuccess(res) : onError(res);
      } catch (error) {
        onError(error);
      }
    });
}
export default Request;
