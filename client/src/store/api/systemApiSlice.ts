import { apiSlice } from "./apiSlice";

export const systemApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSystemHealth: builder.query({
      query: () => '/monitor/health',
      providesTags: ['System'],
    }),
  }),
});

export const { useGetSystemHealthQuery } = systemApiSlice;