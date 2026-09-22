export async function fetchJson<TResponse>(input: RequestInfo | URL, init?: RequestInit): Promise<TResponse> {
  const response = await fetch(input, init);

  if (!response.ok) {
    throw new Error(`Request failed with ${response.status}`);
  }

  return (await response.json()) as TResponse;
}