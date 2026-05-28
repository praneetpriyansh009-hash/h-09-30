import { useAuthStore } from '../store/auth-store';

const API_BASE = 'http://localhost:4000/api/v1';

interface FetchOptions extends RequestInit {
  data?: unknown;
}

export const apiClient = async <T>(
  endpoint: string,
  options: FetchOptions = {}
): Promise<T> => {
  const { data, headers: customHeaders, ...customConfig } = options;
  const token = useAuthStore.getState().token;

  const config: RequestInit = {
    method: data ? 'POST' : 'GET',
    body: data ? JSON.stringify(data) : undefined,
    headers: {
      'Content-Type': data ? 'application/json' : '',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...customHeaders,
    },
    ...customConfig,
  };

  // Remove Content-Type if it's empty
  if (config.headers && typeof config.headers === 'object') {
    const headers = config.headers as Record<string, string>;
    if (!headers['Content-Type']) {
      delete headers['Content-Type'];
    }
  }

  const response = await fetch(`${API_BASE}${endpoint}`, config);

  if (response.status === 401) {
    // Handle token refresh logic here if needed
    // For now, logout on 401
    useAuthStore.getState().logout();
    throw new Error('Unauthorized');
  }

  if (!response.ok) {
    const errorMessage = await response.text();
    throw new Error(errorMessage || 'API Request Failed');
  }

  // Support empty responses (e.g., 204 No Content)
  if (response.status === 204) {
    return {} as T;
  }

  return response.json();
};

// AI Party Generation
export interface AiPartyPlan {
  title: string;
  theme: string;
  budget: string;
  vendors: { category: string; recommendation: string }[];
  itinerary: string[];
}

export const generateParty = async (prompt: string): Promise<AiPartyPlan> => {
  return apiClient<AiPartyPlan>('/ai/generate-party', {
    data: { prompt },
  });
};
