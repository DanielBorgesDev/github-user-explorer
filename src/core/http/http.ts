export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'

export interface HttpClient {
  request<T>(input: string, init?: RequestInit): Promise<T>
}

export class FetchHttpClient implements HttpClient {
  private readonly baseUrl: string;
  private readonly timeoutMs: number;

  constructor(baseUrl: string, timeoutMs: number = 15000) {
    this.baseUrl = baseUrl;
    this.timeoutMs = timeoutMs;
  }

  async request<T>(input: string, init: RequestInit = {}): Promise<T> {
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), this.timeoutMs)

    try {
      const res = await fetch(`${this.baseUrl}${input}`, { ...init, signal: controller.signal })
      if (!res.ok) {
        const body = await safeJson(res)
        throw new HttpError(res.status, body?.message ?? res.statusText)
      }
      return (await res.json()) as T
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      if (e?.name === 'AbortError') throw new HttpError(408, 'Request timeout')
      throw e
    } finally {
      clearTimeout(timeout)
    }
  }
}

async function safeJson(res: Response) {
  try { return await res.json() } catch { return null }
}

export class HttpError extends Error {
  public status: number;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}
