'use server';

const API_BASE_URL = 'https://api.arkz.tech/api/cpf/testeteste';

export async function fetchUserData(cpf: string) {
  try {
    const response = await fetch(`${API_BASE_URL}/${cpf}`);
    if (!response.ok) {
      throw new Error('API request failed');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error;
  }
}
