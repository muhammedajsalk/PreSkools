import { apiSlice } from "./apiSlice";

interface LoginCredentials {
  token: string;
  stepTwoPassword?: string; // <-- ADDED: Now TypeScript knows this field exists
}

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    
    // Login Mutation
    login: builder.mutation({
      query: (credentials: LoginCredentials) => ({
        url: '/auth/login',
        method: 'POST',
        body: credentials,
      }),
      // Don't cache the user data, but invalidates 'User' tags if needed
      invalidatesTags: ['User'], 
    }),

    // Get Current User (Example)
    getMe: builder.query({
      query: () => '/auth/me',
      providesTags: ['User'],
    }),

  }),
});

// Export hooks for usage in functional components
export const { 
  useLoginMutation, 
  useGetMeQuery 
} = authApiSlice;