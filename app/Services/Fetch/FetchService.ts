import https from "https";
import axios, {
  AxiosHeaders,
  AxiosRequestHeaders,
  AxiosResponse,
  RawAxiosRequestHeaders,
} from "axios";

const baseUrl = process.env.BASE_URL ?? "http://localhost:5198/api/";

export class FetchService {
  private static async request<T>(
    method: "GET" | "POST" | "PUT" | "DELETE",
    requestParameter: Partial<RequestParameters>,
    body?: any
  ): Promise<T> {
    const url =
      baseUrl +
      requestParameter.controller +
      (requestParameter.queryString ? `?${requestParameter.queryString}` : "");

    try {
      const response: AxiosResponse<T> = await axios({
        method,
        url,
        data: body,
        headers: requestParameter.headers,
      });

      return response.data;
    } catch (error) {
      console.error(error);
      throw new Error("Network error");
    }
  }

  static async get<T>(
    requestParameter: Partial<RequestParameters>
  ): Promise<T> {
    return this.request<T>("GET", requestParameter);
  }

  static async test() {
    axios.get("", {
      headers: {
        Authorization: "Bearer token",
      },
    });
  }

  static async post<T>(
    requestParameter: Partial<RequestParameters>,
    body: any
  ): Promise<T> {
    return this.request<T>("POST", requestParameter, body);
  }

  static async put<T>(
    requestParameter: Partial<RequestParameters>,
    body: Partial<T>
  ): Promise<T> {
    return this.request<T>("PUT", requestParameter, body);
  }

  static async delete<T>(
    requestParameter: Partial<RequestParameters>,
    id?: string
  ): Promise<T> {
    if (id) {
      requestParameter.controller += `/${id}`;
    }
    return this.request<T>("DELETE", requestParameter);
  }
}

export class RequestParameters {
  controller?: string;
  action?: string;
  queryString?: string;
  headers?: RawAxiosRequestHeaders;
  baseUrl?: string;
  fullEndPoint?: string;
  revalidateSeconds?: number;
  revalidateTag?: any;
  cacheSetting?: string;
}
