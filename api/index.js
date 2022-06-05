import { getItem, logger } from "@react-native-khan/helpers";

class Request {
  successHandler = () => {};
  errorHandler = () => {};

  setHandler = (handler) => {
    this.errorHandler = handler?.errorHandler;
    this.successHandler = handler?.successHandler;
  };

  create = ({ url, payload, headers, method, disableLog = false }) =>
    new Promise(async (resolve, reject) => {
      let methodWithoutBody = ["GET", "HEAD"];
      let body = new FormData();
      payload &&
        Object.keys(payload).forEach((key) => body.append(key, payload[key]));

      const token = await getItem("token").catch(() => false);
      const options = {
        method,
        headers: {
          Accept: "application/json",
          "Content-Type": methodWithoutBody.includes(method)
            ? "application/json"
            : "multipart/form-data",
          ...(token && { Authorization: `Bearer ${token}` }),
          ...(headers && headers),
        },
      };
      const wrapperLog = ({ response, error = false }) =>
        logger(
          `\n🚀 Url::${url}`,
          !methodWithoutBody.includes(method)
            ? `\n🗿 Body::${JSON.stringify(payload || {})}`
            : "",
          `\n🚧 Option::${JSON.stringify(options)}`,
          `\n${error ? "💀" : "🦄"} Response::${JSON.stringify(response)}`
        );

      const on = ({ response, error = false }) => {
        (error || !disableLog) && wrapperLog({ response, error });
        error ? this.errorHandler(response) : this.successHandler(response);
        error ? reject(response) : resolve(response);
      };

      try {
        let response = await fetch(url, {
          ...options,
          ...(!methodWithoutBody.includes(method) && { body }),
        });
        let res = await response.json();
        res = {
          ...res,
          ...{ http: { code: response.status, status: response.ok } },
        };
        on({ response: res, error: !response.ok });
      } catch (error) {
        on({ response: error, error: true });
      }
    });
}

export default Request;
