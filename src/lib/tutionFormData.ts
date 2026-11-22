export interface TuitionDataType {
  title: string;
  subject: string;
  classLevel: string;
  mode: string;
  location: string;
  monthlyFee: number;
  daysPerWeek: number;
  bannerImage?: string;
  description: string;
  tutorName: string;
  tutorEmail: string;
  tutorId: string;
}


export interface TuitionType extends TuitionDataType {
  _id: string;
  approvalStatus: "pending" | "approved" | "rejected";
  isActive: boolean;
  createdAt: Date;
}


export type ApplicationData = {
  tuitionId: string;
  userId: string;
  email: string;
  tuitionTitle: string;
  subject: string;
  monthlyFee: number;
  tutorEmail: string;
  studentPhone: string;
  studentName: string;
  preferredSchedule: string;
  studentNote?: string;
};


export type ApplicationType = {
  _id: string;
  tuitionId: string;
  studentId: string;
  studentEmail: string;
  tutorName: string;
  tutorEmail: string;
  tuitionTitle: string;
  subject: string;
  monthlyFee: number;
  status: "pending" | "accepted" | "rejected";
  appliedAt: string;
};


export type Application = {
  _id: string;
  studentName?: string;
  email: string;
  studentPhone: string;
  tuitionTitle: string;
  preferredSchedule: string;
  studentNote: string;
  status: string;
};

export type User = {
  id: string;
  _id: string;
  name: string;
  email: string;
  image?: string | null;
  role: string;
  createdAt: string;
};


export interface TuitionPaginationType {
  tuitions: TuitionType[];
  totalTuitions: number;
  totalPages: number;
  currentPage: number;
}


export type TransactionType = {
  _id: string;
  sessionId: string;
  status: string;
  payment_status: string;
  customer_email: string;
  userId: string;
  userName: string;
  userRole: "student" | "tutor" | "admin";
  userPlan: string;
  amount: string;
  payment_date: string | Date;
  payment_intent: string;
};