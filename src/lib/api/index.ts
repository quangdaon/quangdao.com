type Fetch = {
  (input: RequestInfo | URL, init?: RequestInit): Promise<Response>;
  (input: string | URL | Request, init?: RequestInit): Promise<Response>;
};

export const apiGet = async <T>(fetch: Fetch, url: string): Promise<T | null> => {
  const response = await fetch(url);

  if (response.status === 204) return null;

  return response.json();
}