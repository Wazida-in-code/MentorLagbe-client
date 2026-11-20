import Link from "next/link";
import { redirect } from "next/navigation";
import type { ReactNode } from "react";
import {
  BookOpenIcon,
  CircleCheckIcon,
  CrownIcon,
  GraduationCapIcon,
  TriangleAlertIcon,
  UsersIcon,
} from "lucide-react";
import { getSession } from "@/lib/server";
import { getTuition } from "@/lib/tutionsApi/addTution";
import { getApplications } from "@/lib/tutionsApi/applications";
import { ApplicationType, TuitionType } from "@/lib/tutionFormData";

// Donut math (r = 40 inside a 100x100 viewBox).
const DONUT_RADIUS = 40;
const DONUT_CIRCUMFERENCE = 2 * Math.PI * DONUT_RADIUS;

// One reusable statistics card (used for cards 1, 3 and 4).
function StatCard({
  icon,
  title,
  value,
  description,
  iconBg,
  iconColor,
}: {
  icon: ReactNode;
  title: string;
  value: string | number;
  description: string;
  iconBg: string;
  iconColor: string;
}) {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md sm:p-5">
      <span
        className={`flex h-11 w-11 items-center justify-center rounded-xl ${iconBg} ${iconColor}`}
      >
        {icon}
      </span>
      <p className="mt-4 text-sm font-medium text-gray-500">{title}</p>
      <p className="mt-1 text-2xl font-bold text-gray-900 sm:text-3xl">{value}</p>
      <p className="mt-1 text-xs text-gray-400">{description}</p>
    </div>
  );
}

const TutorDashboardPage = async () => {
  const session = await getSession();
  if (!session) redirect("/sign-in");

  // One fetch each: this tutor's tuition posts and the applications on them.
  let tuitions: TuitionType[] = [];
  let applications: ApplicationType[] = [];
  let fetchFailed = false;

  try {
    const tuitionData = await getTuition(session.user.id);
    const applicationData = await getApplications(
      `tutorEmail=${session.user.email}`
    );

    if (Array.isArray(tuitionData)) {
      tuitions = tuitionData;
    } else {
      fetchFailed = true;
    }

    if (Array.isArray(applicationData)) {
      applications = applicationData;
    } else {
      fetchFailed = true;
    }
  } catch {
    fetchFailed = true;
  }

  if (fetchFailed) {
    return (
      <div className="min-h-screen bg-[#F8F7FC] px-4 py-8 md:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-2xl border border-rose-100 bg-white p-10 text-center shadow-sm">
            <TriangleAlertIcon className="mx-auto h-10 w-10 text-rose-500" />
            <h1 className="mt-4 text-lg font-bold text-gray-900">
              Couldn&apos;t load your dashboard
            </h1>
            <p className="mt-2 text-sm text-gray-500">
              Something went wrong while fetching your data. Please try again.
            </p>
            <Link
              href="/dashboard/tutor"
              className="mt-5 inline-block rounded-xl bg-[#6D28D9] px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#5B21B6]"
            >
              Try Again
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Only tuition posts that belong to the logged-in tutor.
  const myTuitions = tuitions.filter(
    (tuition) => tuition.tutorEmail === session.user.email
  );

  // Real numbers, calculated from the tutor's own data.
  const total = myTuitions.length;
  const approved = myTuitions.filter(
    (tuition) => tuition.approvalStatus === "approved"
  ).length;
  const applicants = applications.length;

  // Approval rate — 0% when there are no posts (no division by zero).
  const approvedRate = total === 0 ? 0 : Math.round((approved / total) * 100);

  const firstName = session.user.name.split(" ")[0];
  const plan = session.user.plan ?? "free";

  return (
    <div className="min-h-screen bg-[#F8F7FC] px-4 py-8 md:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl space-y-7">

        {/* Welcome header */}
        <div>
          <div className="mb-2 flex items-center gap-2 text-sm font-medium text-purple-600">
            <GraduationCapIcon size={18} />
            Tutor Dashboard
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 md:text-3xl">
            Welcome back, {firstName}!
          </h1>
          <p className="mt-2 text-sm text-gray-500 md:text-base">
            Here&apos;s an overview of your tuition posts and applicants.
          </p>
        </div>

        {/* Four statistics cards */}
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">

          {/* 1. Total Tuitions Posted — purple */}
          <StatCard
            icon={<BookOpenIcon size={20} />}
            title="Total Tuitions Posted"
            value={total}
            description="Tuition posts you've created"
            iconBg="bg-purple-50"
            iconColor="text-purple-600"
          />

          {/* 2. Approved Tuitions — green, with donut */}
          <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md sm:p-5">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
              <CircleCheckIcon size={20} />
            </span>
            <p className="mt-4 text-sm font-medium text-gray-500">
              Approved Tuitions
            </p>

            {/* Donut: approved posts compared to total posts */}
            <div className="relative mx-auto mt-3 h-24 w-24">
              <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
                <circle
                  cx="50"
                  cy="50"
                  r={DONUT_RADIUS}
                  fill="none"
                  stroke="#EDE9FE"
                  strokeWidth="9"
                />
                <circle
                  cx="50"
                  cy="50"
                  r={DONUT_RADIUS}
                  fill="none"
                  stroke="#10B981"
                  strokeWidth="9"
                  strokeLinecap="round"
                  strokeDasharray={DONUT_CIRCUMFERENCE}
                  strokeDashoffset={
                    DONUT_CIRCUMFERENCE -
                    (approvedRate / 100) * DONUT_CIRCUMFERENCE
                  }
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-lg font-extrabold text-gray-900">
                  {approvedRate}%
                </span>
                <span className="text-[10px] font-medium text-gray-500">
                  approved
                </span>
              </div>
            </div>

            <p className="mt-3 text-center text-sm text-gray-600">
              <span className="font-bold text-gray-900">{approved}</span> of{" "}
              {total} posts
            </p>
            <p className="mt-1 text-center text-xs text-gray-400">
              Approved and visible to students
            </p>
          </div>

          {/* 3. Total Applicants — blue */}
          <StatCard
            icon={<UsersIcon size={20} />}
            title="Total Applicants"
            value={applicants}
            description="Applications received on your posts"
            iconBg="bg-blue-50"
            iconColor="text-blue-600"
          />

          {/* 4. Current Plan — amber/gold */}
          <StatCard
            icon={<CrownIcon size={20} />}
            title="Current Plan"
            value={plan === "pro" ? "Pro" : "Free"}
            description="Your subscription plan"
            iconBg="bg-amber-50"
            iconColor="text-amber-600"
          />
        </div>
      </div>
    </div>
  );
};

export default TutorDashboardPage;
