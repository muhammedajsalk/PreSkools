import { apiSlice } from "./apiSlice";

export interface StudentChild {
    _id: string;
    name: string;
    class_id: { _id: string; name: string; section: string; };
    // Add other necessary fields...
}

export const parentApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getMyChildren: builder.query<{ success: true; data: StudentChild[] }, void>({
            query: () => '/parent/children',
            providesTags: ['Student'],
        }),
        getQuickStats: builder.query({
            query: (studentId) => ({
                url: `/parent/quick-stats`,
                params: { studentId }
            }),
            providesTags: ['Activity'], // Invalidate when activity changes
        }),
    }),
});

export const { useGetMyChildrenQuery ,useGetQuickStatsQuery} = parentApiSlice;