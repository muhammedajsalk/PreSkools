import { apiSlice } from "./apiSlice";

export interface CreateSchoolRequest {
  name: string;
  address: string;
  phone: string;
  email: string;
  admin_phone: string; // This links to the User
  plan: "SEED" | "SPROUT" | "BLOOM";
}

export const schoolApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Mutation to Create School
    createSchool: builder.mutation({
      query: (data: CreateSchoolRequest) => ({
        url: '/school', // Matches POST /api/schools
        method: 'POST',
        body: data,
      }),
      // If you have a list of schools, this tells Redux to refresh it
      invalidatesTags: ['School'], 
    }),
  }),
});

export const { useCreateSchoolMutation } = schoolApiSlice;