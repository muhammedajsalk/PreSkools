import { apiSlice } from "./apiSlice";

export interface AttendanceRecord {
  student_id: string | { _id: string; name: string; admission_no: string }; // Handle both populated and flat
  status: "PRESENT" | "ABSENT" | "LATE" | "EXCUSED";
  remark?: string;
}

export interface AttendanceResponse {
  _id: string;
  date: string;
  class_id: string;
  records: AttendanceRecord[];
}

export interface MarkAttendanceRequest {
  class_id: string;
  date: string; // ISO String
  records: { student_id: string; status: string }[];
}

export const attendanceApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    
    // 1. Get Attendance (For a specific class & date)
    getAttendance: builder.query<{ success: true; data: AttendanceResponse }, { class_id: string; date: string }>({
      query: ({ class_id, date }) => ({
        url: '/attendance',
        params: { class_id, date }
      }),
      providesTags: ['Attendance'],
    }),

    // 2. Mark/Update Attendance
    markAttendance: builder.mutation({
      query: (data: MarkAttendanceRequest) => ({
        url: '/attendance',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Attendance'],
    }),

  }),
});

export const { useGetAttendanceQuery, useMarkAttendanceMutation } = attendanceApiSlice;