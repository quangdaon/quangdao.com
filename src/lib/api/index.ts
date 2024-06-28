export const apiGet = async <T>(url: string): Promise<T | null> => {
  const response = await fetch(url);

  if (response.status === 204) return null;

  return response.json();
}