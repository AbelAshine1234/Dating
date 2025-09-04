import { API_BASE_URL } from './config';

export interface RecommendationUser {
  id: number;
  fullName: string;
  gender?: string;
  dateOfBirth?: string;
  interests?: string[];
  pictures?: { url: string; publicId: string }[];
}

export interface RecommendationsResponse {
  users: RecommendationUser[];
}

export async function fetchRecommendations(token: string, lookingFor?: 'dating' | 'marriage'): Promise<RecommendationsResponse> {
  const query = lookingFor ? `?lookingFor=${encodeURIComponent(lookingFor)}` : '';
  const res = await fetch(`${API_BASE_URL}/api/recommendations${query}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) {
    let message = 'Failed to load recommendations';
    try {
      const data = await res.json();
      if (data?.error) message = data.error;
    } catch {}
    throw new Error(message);
  }
  return (await res.json()) as RecommendationsResponse;
}


