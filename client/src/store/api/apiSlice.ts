import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: 'api', // The key in the Redux store
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api',
    prepareHeaders: (headers) => {
      // 1. Get token from LocalStorage (Client-side only)
      if (typeof window !== 'undefined') {
        const token = localStorage.getItem('token');
        if (token) {
          headers.set('authorization', `Bearer ${token}`);
        }
      }
      return headers;
    },
  }),
  // 2. Define Tags for Caching (Auto-Refetching)
  tagTypes: ['User', 'Student', 'Class', 'School', 'Teacher','Attendance'],
  endpoints: (builder) => ({}), // We inject endpoints in other files
});