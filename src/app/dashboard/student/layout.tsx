import { requireRole } from '@/lib/server';
import React from 'react';

const StudentDashboardLayout = async({children} : { children: React.ReactNode }) => {
    await requireRole('student')
    return children
};

export default StudentDashboardLayout;