import { apiSlice } from "./apiSlice";

// --- TYPES ---
export interface ClassData {
    _id: string;
    name: string;
    section: string;
    school_id: string;
    teacher_id?: { _id: string; name: string }; // Populated by backend
    capacity: number;
}

export interface StudentData {
    _id: string;
    name: string;
    admission_no: string;
    class_id: string;
    parent_name: string;
    parent_phone: string;
    gender: 'Male' | 'Female' | 'Other';
    dob: string;
    status: 'ACTIVE' | 'ALUMNI' | 'DROPPED';
}

// Payload Types
export interface CreateClassRequest {
    name: string;
    section: string;
    teacher_id?: string;
    capacity: number;
}

export interface CreateStudentRequest {
    name: string;
    admission_no: string;
    gender: string;
    dob: string;
    parent_name: string;
    parent_phone: string;
    class_id: string;
}

export const academicApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({

        // --- CLASSES ---

        // 1. Get All Classes
        getClasses: builder.query<{ success: true; data: ClassData[] }, void>({
            query: () => '/class',
            providesTags: ['Class'],
        }),

        // 2. Create Class
        createClass: builder.mutation({
            query: (data: CreateClassRequest) => ({
                url: '/class',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Class'], // Refetch list after creating
        }),

        updateClass: builder.mutation({
            query: ({ id, ...data }) => ({
                url: `/class/${id}`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: ['Class'],
        }),

        // --- STUDENTS ---

        // 3. Get Students (Dynamic Filter)
        getStudents: builder.query<{ success: true; students: StudentData[]; total: number; totalPages: number }, { page?: number; limit?: number; search?: string; class_id?: string | null } | void>({
            query: (params) => ({
                url: '/student',
                params: params || {},
            }),
            providesTags: ['Student'],
        }),

        // 4. Create Student
        createStudent: builder.mutation({
            query: (data: CreateStudentRequest) => ({
                url: '/student',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Student', 'Class'], // Refresh student list AND class list (counts)
        }),

        getStudentById: builder.query({
            query: (id) => `/student/${id}`,
            providesTags: (result, error, id) => [{ type: 'Student', id }],
        }),

        // 6. Update Student
        updateStudent: builder.mutation({
            query: ({ id, ...data }) => ({
                url: `/student/${id}`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: (result, error, { id }) => [{ type: 'Student', id }, 'Student'],
        }),

        // 7. Delete Student
        deleteStudent: builder.mutation({
            query: (id) => ({
                url: `/student/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Student'],
        }),

    }),
});

export const {
    useGetClassesQuery,
    useCreateClassMutation,
    useGetStudentsQuery,
    useCreateStudentMutation,
    useGetStudentByIdQuery,
    useUpdateStudentMutation,
    useDeleteStudentMutation,
    useUpdateClassMutation
} = academicApiSlice;