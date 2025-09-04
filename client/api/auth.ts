import { API_BASE_URL } from './config';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  message: string;
  token: string;
  user: any;
}

export async function login(request: LoginRequest): Promise<LoginResponse> {
  const url = `${API_BASE_URL}/api/users/login`;
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    let errorMessage = 'Login failed';
    try {
      const data = await response.json();
      if (data?.error) errorMessage = data.error;
    } catch {}
    throw new Error(errorMessage);
  }

  const data = (await response.json()) as LoginResponse;
  return data;
}


