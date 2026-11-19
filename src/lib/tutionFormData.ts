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
}


export interface TuitionType extends TuitionDataType {
  _id: string;
  approvalStatus: "pending" | "approved" | "rejected";
  isActive: boolean;
  createdAt: Date;
}