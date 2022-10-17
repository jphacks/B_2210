import { API } from "../Settings";

type Method = "GET" | "POST" | "PUT" | "DELETE";

const isEmptyObj = (obj: Record<any, any>) => {
  return Object.entries(obj).length === 0;
};

export class HttpError extends Error {
  url: string;
  status: number;
  message: string;
  constructor(response: Response) {
    super();
    this.name = "HttpError";
    this.url = response.url;
    this.status = response.status;
    this.message = response.statusText;
  }
}

export const fetchApi = async <T>(
  url: string,
  method: Method,
  params?: Record<string, any>,
  headers?: Record<string, string>
): Promise<T> => {
  let requestUrl = url;
  let requestParams = { ...params };
  let requestHeaders = headers || {};
  let result;
  const BASE_URL = API();

  if (method === "GET") {
    // /example/1 -> /example/1?key1=value1&key2=value2
    if (!isEmptyObj(requestParams)) {
      requestUrl += `?${Object.entries(requestParams)
        .map(([key, value]) => `${key}=${value}`)
        .join("&")}`;
      requestParams = {};
    }
  }

  if (!isEmptyObj(requestParams)) {
    requestHeaders["Content-Type"] = "application/json";
  }

  try {
    const res = await fetch(encodeURI(`${BASE_URL}${requestUrl}`), {
      method,
      body: isEmptyObj(requestParams)
        ? undefined
        : JSON.stringify(requestParams),
      headers: { ...requestHeaders },
    });

    if (!res.ok) {
      throw new HttpError(res);
    }
    result = (await res.json()) as T;
  } catch (error) {
    if (error instanceof HttpError) {
      throw error;
    }
    console.error(error);
  }
  return result as T;
};

export const postApi = async <Data>(
  url: string,
  params?: any,
  headers?: Record<string, string>
) => fetchApi<Data>(url, "POST", params, headers);

export const deleteApi = async <Data>(
  url: string,
  params?: any,
  headers?: Record<string, string>
) => fetchApi<undefined>(url, "DELETE", params, headers);
