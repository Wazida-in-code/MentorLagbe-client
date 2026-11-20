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