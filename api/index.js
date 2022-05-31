import { getItem, logger } from "@react-native-khan/helpers";

class Request {
  successHandler = () => {};
  errorHandler = () => {};

  setHandler = (handler) => {
    this.errorHandler = handler?.errorHandler;
    this.successHandler = handler?.successHandler;
  };

  create = ({ url, body, headers, method, disableLog = false }) =>
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

      const on = ({ response, error = false }) => {
        error ? this.errorHandler(response) : this.successHandler(response);
        !error && !disableLog && wrapperLog({ response, error });
        error ? reject(response) : resolve(response);
      };

      try {
        let response = await fetch(url, {
          ...options,
          body: JSON.stringify(body),
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
