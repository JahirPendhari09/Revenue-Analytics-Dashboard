const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

type ApiResponse<T> = {
  success: boolean;
  data: T;
  message?: string;
};

export async function apiGet<T>(endpoint: string): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
    },
    cache: 'no-store', 
  });

  if (!res.ok) {
    throw new Error(`API error: ${res.status}`);
  }

  const result: ApiResponse<T> = await res.json();

  if (!result.success) {
    throw new Error(result.message || 'API request failed');
  }

  return result.data;
}

export async function apiPut<T>(
  endpoint: string,
  body: unknown
): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error(`API error: ${res.status}`);
  }

  const result: ApiResponse<T> = await res.json();

  if (!result.success) {
    throw new Error(result.message || 'API request failed');
  }

  return result.data;
}
