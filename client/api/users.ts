import { API_BASE_URL } from './config';

export interface RegisterRequest {
  fullName: string;
  email: string;
  password: string;
  gender: string;
  dateOfBirth: string; // ISO date string (YYYY-MM-DD)
  images?: File[];
  caste?: string;
  occupation?: string;
  religion?: string;
  interests?: string[];
}

export interface RegisterResponse {
  message: string;
  token: string;
  user: any;
}

export async function registerUser(payload: RegisterRequest): Promise<RegisterResponse> {
  const formData = new FormData();
  formData.append('fullName', payload.fullName);
  formData.append('email', payload.email);
  formData.append('password', payload.password);
  formData.append('gender', payload.gender);
  formData.append('dateOfBirth', payload.dateOfBirth);
  if (payload.caste) formData.append('caste', payload.caste);
  if (payload.occupation) formData.append('occupation', payload.occupation);
  if (payload.religion) formData.append('religion', payload.religion);
  if (payload.interests && payload.interests.length > 0) {
    for (const interest of payload.interests) {
      formData.append('interests', interest);
    }
  }

  if (payload.images && payload.images.length > 0) {
    for (const file of payload.images) {
      formData.append('images', file);
    }
  }

  const url = `${API_BASE_URL}/api/users`;
  const response = await fetch(url, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    let errorMessage = 'Registration failed';
    try {
      const data = await response.json();
      if (data?.error) errorMessage = data.error;
    } catch {}
    throw new Error(errorMessage);
  }

  const data = (await response.json()) as RegisterResponse;
  return data;
}

export async function getProfile(token: string): Promise<any> {
  const url = `${API_BASE_URL}/api/users/profile`;
  const response = await fetch(url, {
    method: 'GET',
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!response.ok) {
    let errorMessage = 'Failed to fetch profile';
    try {
      const data = await response.json();
      if (data?.error) errorMessage = data.error;
    } catch {}
    throw new Error(errorMessage);
  }
  return await response.json();
}

export async function listUsers(token: string): Promise<any[]> {
  const url = `${API_BASE_URL}/api/users`;
  const response = await fetch(url, {
    method: 'GET',
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!response.ok) {
    let errorMessage = 'Failed to fetch users';
    try {
      const data = await response.json();
      if (data?.error) errorMessage = data.error;
    } catch {}
    throw new Error(errorMessage);
  }
  return await response.json();
}

export async function getUserById(token: string, userId: number): Promise<any> {
  const users = await listUsers(token);
  const found = users.find((u: any) => Number(u.id) === Number(userId));
  if (!found) {
    throw new Error('User not found');
  }
  return found;
}


