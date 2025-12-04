import { apiSlice } from "./apiSlice";

// Types matching your Backend Schema
export interface CreateActivityRequest {
  student_ids: string[];
  class_id: string;
  type: 'MEAL' | 'NAP' | 'HYGIENE' | 'LEARNING' | 'PHOTO' | 'NOTE';
  date: string; // ISO String
  data: any; // Flexible object based on type
}

export const activityApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    
    // 1. Log Activity (Batch)
    createActivity: builder.mutation({
      query: (data: CreateActivityRequest) => ({
        url: '/activity',
        method: 'POST',
        body: data,
      }),
      // Invalidate 'Student' tag if you want to refresh student feeds later
      invalidatesTags: ['Student'], 
    }),

    // 2. Get Feed (For Parent App later)
    getStudentFeed: builder.query({
      query: ({ studentId, page = 1 }) => ({
        url: `/activity/feed/${studentId}`,
        params: { page }
      }),
    }),

    getClassHistory: builder.query({
      query: (params) => ({
        url: '/activity/history',
        params: params, // { date, student_id, type }
      }),
      // Provide specific tags so we can invalidate them later if needed
      providesTags: ['Activity'], 
    }),

  }),
});

export const { 
  useCreateActivityMutation,
  useGetStudentFeedQuery ,
  useGetClassHistoryQuery
} = activityApiSlice;