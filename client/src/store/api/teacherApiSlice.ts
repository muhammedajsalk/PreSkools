import { apiSlice } from "./apiSlice";

export interface Teacher {
  _id: string;
  name: string;
  phone: string;
  email: string;
  qualification: string;
  experience: string;
  joiningDate: string;
  classAssigned?: string;
  isActive: boolean;
  avatar?: string;
}

export interface UpdateTeacherRequest {
  id: string;
  fullName?: string; // Mapped to 'name' in backend
  phone?: string;
  email?: string;
  qualification?: string;
  isActive?: boolean;
}

export const teacherApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    
    // 1. Get All (Existing)
    getTeachers: builder.query<{ success: true; data: Teacher[] }, string>({
      query: (search) => ({ url: '/teachers', params: { search } }),
      providesTags: ['Teacher'],
    }),

    // 2. Get Single Teacher (NEW)
    getTeacherById: builder.query<{ success: true; data: Teacher }, string>({
      query: (id) => `/teachers/${id}`,
      providesTags: (result, error, id) => [{ type: 'Teacher', id }],
    }),

    // 3. Create (Existing)
    createTeacher: builder.mutation({
      query: (data) => ({ url: '/teachers', method: 'POST', body: data }),
      invalidatesTags: ['Teacher'],
    }),

    // 4. Update (Existing)
    updateTeacher: builder.mutation({
      query: ({ id, ...data }: UpdateTeacherRequest) => ({
        url: `/teachers/${id}`,
        method: 'PUT',
        body: data, // Backend expects partial updates
      }),
      // Invalidates specific cache so the Detail page updates immediately
      invalidatesTags: (result, error, { id }) => [{ type: 'Teacher', id }, 'Teacher'],
    }),

    // 5. Delete (Existing)
    deleteTeacher: builder.mutation({
      query: (id) => ({ url: `/teachers/${id}`, method: 'DELETE' }),
      invalidatesTags: ['Teacher'],
    }),

  }),
});

export const { 
  useGetTeachersQuery, 
  useGetTeacherByIdQuery, // Export this!
  useCreateTeacherMutation, 
  useUpdateTeacherMutation,
  useDeleteTeacherMutation
} = teacherApiSlice;