// src/services/api.ts

import axios, { AxiosError } from 'axios';

const API_URL = 'https://api.meetmyartist.in/artistsList/';

interface Artist {
  uid: number;
  uname: string;
  uemail: string;
  uwhatsappno: string;
  // add other fields as needed
}

interface ApiResponse {
  status: string;
  code: number;
  message: string;
  artists_list: Artist[];
}

export const fetchArtists = async (): Promise<Artist[]> => {
  try {
    const response = await axios.get<ApiResponse>(API_URL);
    return response.data.artists_list;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error('Error fetching artists:', error.message);
    } else {
      console.error('Unexpected error:', error);
    }
    throw error;
  }
};
