import https from "https";
import { promises as fs } from "fs";
import axios, { AxiosHeaders, AxiosResponse } from "axios";

const baseUrl = process.env.BASE_URL ?? "https://localhost:7157/api/";

export class FetchService {
  private static agent?: https.Agent; // No longer a promise

  private static async getAgent(): Promise<https.Agent> {
    if (this.agent) {
      return this.agent; // Return existing agent if available
    }

    const caCert = await fs.readFile("./cert.pem");
    const caKey = await fs.readFile("./key.pem");

    this.agent = new https.Agent({
      ca: caCert,
      key: caKey,
      rejectUnauthorized: false,
    });

    return this.agent;
  }

  private static async request<T>(
    method: 'GET' | 'POST' | 'PUT' | 'DELETE',
    requestParameter: Partial<RequestParameters>,
    body?: any
  ): Promise<T> {
    const agent = await this.getAgent();
    const url = baseUrl + requestParameter.controller + (requestParameter.queryString ? `?${requestParameter.queryString}` : '');

    try {
      const response: AxiosResponse<T> = await axios({
        method,
        url,
        data: body,
        headers: requestParameter.headers,
        httpsAgent: agent,
      });

      return response.data;
    } catch (error) {
      console.error(error);
      throw new Error("Network error");
    }
  }

  static async get<T>(requestParameter: Partial<RequestParameters>): Promise<T> {
    return this.request<T>('GET', requestParameter);
  }

  static async post<T>(requestParameter: Partial<RequestParameters>, body: any): Promise<T> {
    return this.request<T>('POST', requestParameter, body);
  }

  static async put<T>(requestParameter: Partial<RequestParameters>, body: Partial<T>): Promise<T> {
    return this.request<T>('PUT', requestParameter, body);
  }

  static async delete<T>(requestParameter: Partial<RequestParameters>, id?: string): Promise<T> {
    if (id) {
      requestParameter.controller += `/${id}`;
    }
    return this.request<T>('DELETE', requestParameter);
  }
}


export class RequestParameters {
  controller?: string;
  action?: string;
  queryString?: string;
  headers?: AxiosHeaders;
  baseUrl?: string;
  fullEndPoint?: string;
  revalidateSeconds?: number;
  revalidateTag?: any;
  cacheSetting?: string;
}
//refactor theese codes 
