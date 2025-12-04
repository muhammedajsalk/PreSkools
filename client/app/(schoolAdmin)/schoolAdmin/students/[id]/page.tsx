'use client';
import React, { useState, useMemo } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Box, Container, Breadcrumbs, Link as MuiLink, Typography, Button, Card, Tabs, Tab, Snackbar, Alert, CircularProgress } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PersonIcon from '@mui/icons-material/Person';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import Link from 'next/link';
import { toast } from 'sonner';

// Config & Components
import { COLORS, StudentProfile } from '@/src/components/admin/students/details/StudentDetailsConfig';
import StudentIdentityCard from '@/src/components/admin/students/details/StudentIdentityCard';
import StudentOverviewTab from '@/src/components/admin/students/details/StudentOverviewTab';
import StudentFeesTab from '@/src/components/admin/students/details/StudentFeesTab';
import EditStudentDialog from '@/src/components/admin/students/details/EditStudentDialog';
import ConfirmDialog from '@/src/components/admin/students/details/ConfirmDialog';
import TeacherNotFound from '@/src/components/admin/teacher/details/TeacherNotFound';

// API Hooks
import { 
  useGetStudentByIdQuery, 
  useUpdateStudentMutation, 
  useDeleteStudentMutation,
  useGetClassesQuery 
} from '@/src/store/api/academicApiSlice';

function TabPanel({ children, value, index }: { children?: React.ReactNode; value: number; index: number }) {
  return <div role="tabpanel" hidden={value !== index}>{value === index && <Box sx={{ py: 3 }}>{children}</Box>}</div>;
}

export default function StudentDetailsPage() {
  const router = useRouter();
  const params = useParams();
  const studentId = params?.id as string;

  // 1. API Hooks
  const { data: studentResponse, isLoading, isError } = useGetStudentByIdQuery(studentId);
  const { data: classData } = useGetClassesQuery();
  const [updateStudent, { isLoading: isUpdating }] = useUpdateStudentMutation();
  const [deleteStudent, { isLoading: isDeleting }] = useDeleteStudentMutation();

  // 2. UI State
  const [activeTab, setActiveTab] = useState(0);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deactivateOpen, setDeactivateOpen] = useState(false);
  const [processingFeeId, setProcessingFeeId] = useState<string | null>(null);

  // 3. Data Mapping
  const classes = classData?.data || [];

  const student: StudentProfile | null = useMemo(() => {
    if (!studentResponse?.data) return null;
    const raw = studentResponse.data;
    
    // Resolve Class
    const classId = typeof raw.class_id === 'string' ? raw.class_id : (raw.class_id as any)._id;
    const classObj = classes.find((c: any) => c._id === classId);

    const nameParts = raw.name.split(' ');
    const firstName = nameParts[0];
    const lastName = nameParts.slice(1).join(' ');

    // Safe Address Mapping (Object vs String check)
    const rawAddr = (raw as any).address;
    const isAddrObj = typeof rawAddr === 'object' && rawAddr !== null;
    const addressObj = {
      street: isAddrObj ? rawAddr.street : (typeof rawAddr === 'string' ? rawAddr : ''),
      city: isAddrObj ? rawAddr.city : '',
      state: isAddrObj ? rawAddr.state : '',
      zipCode: isAddrObj ? rawAddr.zip_code : '',
      country: isAddrObj ? rawAddr.country : 'India',
    };

    // Safe Parent Mapping
    const parentsData = (raw as any).parents || {};

    return {
      id: raw._id,
      firstName,
      lastName,
      admissionNo: raw.admission_no,
      dateOfBirth: raw.dob ? new Date(raw.dob).toISOString() : new Date().toISOString(),
      gender: raw.gender,
      bloodGroup: (raw as any).medical_info?.blood_group || (raw as any).blood_group || 'N/A',
      status: (raw.status.toLowerCase() as 'active' | 'inactive' | 'dropped'),
      avatar: '',
      className: classObj ? classObj.name : 'Unknown',
      section: classObj ? classObj.section : '',
      rollNo: raw.roll_no || '00', 
      admissionDate: (raw as any).createdAt || new Date().toISOString(),
      
      // Map Nested Parent Objects
      parent: {
        fatherName: parentsData.father?.name || raw.parent_name || '',
        fatherPhone: parentsData.father?.phone || raw.parent_phone || '',
        fatherEmail: parentsData.father?.email || (raw as any).parent_email || '', 
        fatherOccupation: parentsData.father?.occupation || '',
        
        motherName: parentsData.mother?.name || '',
        motherPhone: parentsData.mother?.phone || '',
        motherEmail: parentsData.mother?.email || '',
        motherOccupation: parentsData.mother?.occupation || '',

        guardianName: parentsData.guardian?.name || '',
        guardianPhone: parentsData.guardian?.phone || '',
        guardianRelation: parentsData.guardian?.relation || '',
      },
      contact: {
        phone: raw.parent_phone,
        email: '',
        emergencyContact: raw.parent_phone,
        emergencyRelation: 'Parent'
      },
      address: addressObj,
      
      medicalInfo: {
        allergies: (raw as any).medical_info?.allergies || [],
        conditions: (raw as any).medical_info?.conditions || [],
        bloodGroup: (raw as any).medical_info?.blood_group || 'N/A',
        doctorName: (raw as any).medical_info?.doctor_name,
        doctorPhone: (raw as any).medical_info?.doctor_phone,
      },

      // Transport Info (Pass through to be used in UI or Edit Dialog)
      transport: (raw as any).transport || {
        mode: 'PRIVATE',
        route_name: '',
        pickup_point: ''
      },

      feeHistory: [] 
    } as any; // Casting to any to allow extra properties like 'transport'
  }, [studentResponse, classes]);

  // 4. Handlers

  const handleEditSave = async (updatedData: StudentProfile) => {
    try {
      // 1. Resolve Class ID
      const matchingClass = classes.find((c: any) => 
        c.name === updatedData.className && c.section === updatedData.section
      );

      if (!matchingClass && (updatedData.className !== student?.className || updatedData.section !== student?.section)) {
        toast.error(`Class "${updatedData.className} - ${updatedData.section}" does not exist.`);
        return;
      }

      // 2. Format Address
      const fullAddress = [
        updatedData.address.street,
        updatedData.address.city,
        updatedData.address.state,
        updatedData.address.zipCode
      ].filter(Boolean).join(", ");

      // 3. Prepare Payload
      const payload = {
        id: studentId,
        name: `${updatedData.firstName} ${updatedData.lastName}`,
        admission_no: updatedData.admissionNo,
        roll_no: updatedData.rollNo,
        gender: updatedData.gender,
        dob: updatedData.dateOfBirth,

        // ✅ FIX: Use 'updatedData.parent' instead of 'parentsData'
        parents: {
            father: {
                name: updatedData.parent.fatherName,
                phone: updatedData.parent.fatherPhone,
                email: updatedData.parent.fatherEmail,
                occupation: updatedData.parent.fatherOccupation
            },
            mother: {
                name: updatedData.parent.motherName,
                phone: updatedData.parent.motherPhone,
                email: updatedData.parent.motherEmail,
                occupation: updatedData.parent.motherOccupation
            },
            guardian: {
                name: updatedData.parent.guardianName,
                phone: updatedData.parent.guardianPhone,
                relation: updatedData.parent.guardianRelation
            }
        },
        
        // Fallback fields for flat schema compatibility
        parent_name: updatedData.parent.fatherName || updatedData.parent.motherName,
        parent_phone: updatedData.parent.fatherPhone || updatedData.parent.motherPhone,
        parent_email: updatedData.parent.fatherEmail || updatedData.parent.motherEmail,

        // Address Object
        address: {
            street: updatedData.address.street,
            city: updatedData.address.city,
            state: updatedData.address.state,
            zip_code: updatedData.address.zipCode
        },
        // Also send the string version if your backend uses it
        addressString: fullAddress, 

        // Medical Info
        medical_info: {
          blood_group: updatedData.medicalInfo?.bloodGroup,
          allergies: updatedData.medicalInfo?.allergies || [],
          conditions: updatedData.medicalInfo?.conditions || [],
          doctor_name: updatedData.medicalInfo?.doctorName,
          doctor_phone: updatedData.medicalInfo?.doctorPhone,
        },

        // Transport Info (Safe Access)
        transport: (updatedData as any).transport,

        class_id: matchingClass ? matchingClass._id : undefined,
      };

      await updateStudent(payload).unwrap();
      
      toast.success("Student updated successfully");
      setEditOpen(false);
    } catch (err: any) {
      console.error("Update Error:", err);
      toast.error(err?.data?.message || "Failed to update student");
    }
  };

  const handleStatusChange = (active: boolean) => {
    if (!active) setDeactivateOpen(true);
    else changeStatus('ACTIVE');
  };

  const changeStatus = async (status: string) => {
    try {
      await updateStudent({ id: studentId, status }).unwrap();
      toast.success(`Student status changed to ${status}`);
      setDeactivateOpen(false);
    } catch (err) {
      toast.error("Failed to update status");
    }
  };

  const handleDelete = async () => {
    try {
      await deleteStudent(studentId).unwrap();
      toast.success("Student deleted");
      setDeleteOpen(false);
      router.push('/schoolAdmin/students');
    } catch (err) {
      toast.error("Failed to delete student");
    }
  };

  const handleMarkPaid = (id: string) => toast.success("Fee marked as paid (Demo)");
  const handleDownloadReceipt = (id: string) => toast.info("Downloading receipt (Demo)");

  if (isLoading) return <Box sx={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}><CircularProgress sx={{ color: COLORS.primary }} /></Box>;
  if (isError || !student) return <TeacherNotFound />;

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f5f5f5', py: 3 }}>
      <Container maxWidth="xl">
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3 }}>
          <Box sx={{ width: { xs: '100%', md: 320, lg: 360 }, flexShrink: 0 }}>
            <StudentIdentityCard 
              student={student} 
              onStatusChange={handleStatusChange} 
              onEdit={() => setEditOpen(true)} 
              onDelete={() => setDeleteOpen(true)} 
              isUpdating={isUpdating} 
            />
          </Box>
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Card elevation={0} sx={{ borderRadius: 3, border: '1px solid', borderColor: 'divider' }}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider', px: 2 }}>
                <Tabs value={activeTab} onChange={(_, v) => setActiveTab(v)}>
                  <Tab label="Overview" icon={<PersonIcon />} iconPosition="start" />
                  <Tab label="Fees & Payments" icon={<AccountBalanceIcon />} iconPosition="start" />
                </Tabs>
              </Box>
              <Box sx={{ p: 3 }}>
                <TabPanel value={activeTab} index={0}>
                  <StudentOverviewTab student={student} />
                </TabPanel>
                <TabPanel value={activeTab} index={1}>
                  <StudentFeesTab 
                    feeHistory={student.feeHistory} 
                    onMarkPaid={handleMarkPaid} 
                    onDownloadReceipt={handleDownloadReceipt} 
                    isProcessing={processingFeeId} 
                  />
                </TabPanel>
              </Box>
            </Card>
          </Box>
        </Box>
      </Container>

      <EditStudentDialog 
        open={editOpen} 
        onClose={() => setEditOpen(false)} 
        student={student} 
        onSave={handleEditSave} 
      />
      
      <ConfirmDialog 
        open={deleteOpen} 
        onClose={() => setDeleteOpen(false)} 
        onConfirm={handleDelete} 
        title="Delete Student" 
        message="Are you sure? This cannot be undone." 
        confirmText="Delete" 
        confirmColor="error" 
        isLoading={isDeleting} 
      />

      <ConfirmDialog 
        open={deactivateOpen} 
        onClose={() => setDeactivateOpen(false)} 
        onConfirm={() => changeStatus('DROPPED')} 
        title="Deactivate Student" 
        message="Mark as inactive?" 
        confirmText="Deactivate" 
        confirmColor="warning" 
        isLoading={isUpdating} 
      />
    </Box>
  );
}