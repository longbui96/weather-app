type FetcherConfig = {
  baseURL?: string;
  headers?: Record<string, string>;
  apiKey?: string;
  [key: string]: any;
};

type RequestConfig = {
  method?: string;
  headers?: Record<string, string>;
  body?: any;
  params?: Record<string, string | number>;
  [key: string]: any;
};

export default class Fetcher {
  private baseConfig: FetcherConfig;

  constructor(baseConfig: FetcherConfig = {}) {
    this.baseConfig = baseConfig;
  }

  private buildUrl(
    url: string,
    params?: Record<string, string | number>
  ): string {
    const urlObj = new URL(
      this.baseConfig.baseURL ? `${this.baseConfig.baseURL}${url}` : url
    );

    if (this.baseConfig.apiKey) {
      urlObj.searchParams.append("apikey", this.baseConfig.apiKey);
    }

    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        urlObj.searchParams.append(key, String(value));
      });
    }

    return urlObj.toString();
  }

  private async request<T>(
    url: string,
    config: RequestConfig = {}
  ): Promise<T> {
    const { method = "GET", headers, body, params, ...restConfig } = config;

    const fullUrl = this.buildUrl(url, params);
    const mergedHeaders = { ...this.baseConfig.headers, ...headers };

    const options: RequestInit = {
      method,
      headers: mergedHeaders,
      body: body && typeof body !== "string" ? JSON.stringify(body) : body,
      ...restConfig,
    };

    try {
      const response = await fetch(fullUrl, options);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return response.json() as Promise<T>;
    } catch (error) {
      throw error;
    }
  }

  get<T>(url: string, config: RequestConfig = {}): Promise<T> {
    return this.request<T>(url, { ...config, method: "GET" });
  }

  post<T>(url: string, data: any, config: RequestConfig = {}): Promise<T> {
    return this.request<T>(url, { ...config, method: "POST", body: data });
  }

  put<T>(url: string, data: any, config: RequestConfig = {}): Promise<T> {
    return this.request<T>(url, { ...config, method: "PUT", body: data });
  }

  delete<T>(url: string, config: RequestConfig = {}): Promise<T> {
    return this.request<T>(url, { ...config, method: "DELETE" });
  }
}
