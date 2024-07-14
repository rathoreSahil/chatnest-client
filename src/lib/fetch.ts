const API_URL = process.env.NEXT_PUBLIC_API_URL;

enum Request {
  GET = "GET",
  POST = "POST",
  PATCH = "PATCH",
  PUT = "PUT",
  DELETE = "DELETE",
}

type RequestMethod = `${Request}`;

type RequestHeaders = {
  [key: string]: string;
};

type RequestBody = {
  [key: string]: unknown;
};

interface RequestContent extends RequestInit {}

export class Fetch {
  static async GET(url: string) {
    return this.requestFn(url, Request.GET);
  }

  static async POST(
    url: string,
    reqBody: RequestBody | FormData,
    reqHeaders?: RequestHeaders
  ) {
    return this.requestFn(url, Request.POST, reqBody, reqHeaders);
  }

  static async PATCH(
    url: string,
    reqBody: RequestBody | FormData,
    reqHeaders?: RequestHeaders
  ) {
    return this.requestFn(url, Request.PATCH, reqBody, reqHeaders);
  }

  static async PUT(
    url: string,
    reqBody: RequestBody | FormData,
    reqHeaders?: RequestHeaders
  ) {
    return this.requestFn(url, Request.PUT, reqBody, reqHeaders);
  }

  static async DELETE(url: string) {
    return this.requestFn(url, Request.DELETE);
  }

  private static async requestFn(
    url: string,
    method: RequestMethod,
    reqBody?: RequestBody | FormData,
    reqHeaders?: RequestHeaders
  ) {
    const reqContent: RequestContent = {
      method,
      headers: reqHeaders || {
        "Content-Type": "application/json",
      },
      credentials: "include",
    };
    if (reqBody) {
      const isFormData = reqBody instanceof FormData;
      reqContent.body = isFormData ? reqBody : JSON.stringify(reqBody);
    }

    const resp = await fetch(`${API_URL}${url}`, reqContent);
    const data = await resp.json();

    if (!resp.ok || resp.status >= 400) {
      throw new Error(data.message || "Something went wrong");
    }

    return data;
  }
}
