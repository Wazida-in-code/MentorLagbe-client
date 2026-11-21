import Link from "next/link";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import type { ReactNode } from "react";
import {
  ArrowRightIcon,
  BookOpenIcon,
  CalendarDaysIcon,
  CircleCheckIcon,
  CrownIcon,
  FileTextIcon,
  GraduationCapIcon,
  InboxIcon,
  SendIcon,
  ClockIcon,
  SparklesIcon,
  TriangleAlertIcon,
  WalletIcon,
} from "lucide-react";
import { auth } from "@/lib/auth";
import { getApplications } from "@/lib/tutionsApi/applications";
import { ApplicationType } from "@/lib/tutionFormData";

// Same badge colors as your My Applications page.
const statusStyles = {
  pending: "bg-amber-50 text-amber-700 border-amber-200",
  accepted: "bg-emerald-50 text-emerald-700 border-emerald-200",
  rejected: "bg-rose-50 text-rose-700 border-rose-200",
};

// Circle math (r = 52 inside a 120x120 viewBox).
const CIRCLE_RADIUS = 52;
const CIRCLE_CIRCUMFERENCE = 2 * Math.PI * CIRCLE_RADIUS;

// One reusable statistics card.
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
    <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm sm:p-5">
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

const StudentDashboardPage = async () => {
  // The dashboard layout does not check auth, so we do it here.
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) redirect("/sign-in");

  // One fetch serves the statistics, the progress circle and the recent list.
  let applications: ApplicationType[] = [];
  let fetchFailed = false;

  try {
    const data = await getApplications(`userId=${session.user.id}`);
    if (Array.isArray(data)) {
      applications = data;
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
              Something went wrong while fetching your applications. Please try
              again.
            </p>
            <Link
              href="/dashboard/student"
              className="mt-5 inline-block rounded-xl bg-[#6D28D9] px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#5B21B6]"
            >
              Try Again
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Real numbers, calculated from the student's own applications.
  const total = applications.length;
  const accepted = applications.filter((app) => app.status === "accepted").length;
  const pending = applications.filter((app) => app.status === "pending").length;
  const rejected = applications.filter((app) => app.status === "rejected").length;

  // Acceptance rate — 0% when there are no applications (no division by zero).
  const acceptanceRate = total === 0 ? 0 : Math.round((accepted / total) * 100);

  // Latest 5 applications, newest first (appliedAt is an ISO string).
  const recentApplications = [...applications]
    .sort((a, b) => b.appliedAt.localeCompare(a.appliedAt))
    .slice(0, 5);

  const firstName = session.user.name.split(" ")[0];
  const plan = session.user.plan ?? "free";

  return (
    <div className="min-h-screen bg-[#F8F7FC] px-4 py-8 md:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl space-y-7">

        {/* A. Welcome header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="mb-2 flex items-center gap-2 text-sm font-medium text-purple-600">
              <GraduationCapIcon size={18} />
              Student Dashboard
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 md:text-3xl">
              Welcome back, {firstName}!
            </h1>
            <p className="mt-2 text-sm text-gray-500 md:text-base">
              Here&apos;s an overview of your tuition activities.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-purple-100 bg-white px-4 py-2 text-sm font-semibold capitalize text-purple-700 shadow-sm">
              <CrownIcon size={15} />
              {plan} plan
            </span>
            {plan === "free" && (
              <Link
                href="/payment"
                className="inline-flex items-center gap-1.5 rounded-xl bg-[#6D28D9] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#5B21B6]"
              >
                <SparklesIcon size={15} />
                Upgrade to Pro
              </Link>
            )}
          </div>
        </div>

        {/* B. Statistics */}
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          <StatCard
            icon={<SendIcon size={20} />}
            title="Applied Tuitions"
            value={total}
            description="Applications you've submitted"
            iconBg="bg-purple-50"
            iconColor="text-purple-600"
          />
          <StatCard
            icon={<CircleCheckIcon size={20} />}
            title="Accepted"
            value={accepted}
            description="Applications accepted by tutors"
            iconBg="bg-emerald-50"
            iconColor="text-emerald-600"
          />
          <StatCard
            icon={<ClockIcon size={20} />}
            title="Pending"
            value={pending}
            description="Awaiting tutor response"
            iconBg="bg-amber-50"
            iconColor="text-amber-600"
          />
          <StatCard
            icon={<CrownIcon size={20} />}
            title="Current Plan"
            value={plan === "pro" ? "Pro" : "Free"}
            description="Your subscription plan"
            iconBg="bg-sky-50"
            iconColor="text-sky-600"
          />
        </div>

        {/* C + D. Application progress and recent applications */}
        <div className="grid gap-6 lg:grid-cols-3">

          {/* C. Circular acceptance rate */}
          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <h2 className="font-semibold text-gray-900">Application Progress</h2>
            <p className="mt-1 text-xs text-gray-500">
              Your acceptance rate across all applications.
            </p>

            {/* Row only while the card is full-width (sm → lg).
                At lg+ the grid makes this card 1/3 wide, so it stays stacked —
                otherwise circle + legend overflow the card edge. */}
            <div className="mt-6 flex flex-col items-center gap-6 sm:flex-row lg:flex-col">
              {/* The circle */}
              <div className="relative h-40 w-40 shrink-0 md:h-44 md:w-44">
                <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90">
                  <circle
                    cx="60"
                    cy="60"
                    r={CIRCLE_RADIUS}
                    fill="none"
                    stroke="#F3E8FF"
                    strokeWidth="10"
                  />
                  <circle
                    cx="60"
                    cy="60"
                    r={CIRCLE_RADIUS}
                    fill="none"
                    stroke="#10B981"
                    strokeWidth="10"
                    strokeLinecap="round"
                    strokeDasharray={CIRCLE_CIRCUMFERENCE}
                    strokeDashoffset={
                      CIRCLE_CIRCUMFERENCE -
                      (acceptanceRate / 100) * CIRCLE_CIRCUMFERENCE
                    }
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-3xl font-extrabold text-gray-900">
                    {acceptanceRate}%
                  </span>
                  <span className="text-xs font-medium text-gray-500">
                    accepted
                  </span>
                </div>
              </div>

              {/* The breakdown */}
              <div className="w-full space-y-2.5">
                <div className="flex items-center justify-between rounded-lg bg-gray-50 px-4 py-2.5">
                  <span className="flex items-center gap-2 text-sm font-medium text-gray-600">
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
                    Accepted
                  </span>
                  <span className="text-sm font-bold text-gray-900">
                    {accepted}
                  </span>
                </div>
                <div className="flex items-center justify-between rounded-lg bg-gray-50 px-4 py-2.5">
                  <span className="flex items-center gap-2 text-sm font-medium text-gray-600">
                    <span className="h-2.5 w-2.5 rounded-full bg-amber-500" />
                    Pending
                  </span>
                  <span className="text-sm font-bold text-gray-900">
                    {pending}
                  </span>
                </div>
                <div className="flex items-center justify-between rounded-lg bg-gray-50 px-4 py-2.5">
                  <span className="flex items-center gap-2 text-sm font-medium text-gray-600">
                    <span className="h-2.5 w-2.5 rounded-full bg-rose-500" />
                    Rejected
                  </span>
                  <span className="text-sm font-bold text-gray-900">
                    {rejected}
                  </span>
                </div>
                <p className="pt-1 text-center text-xs text-gray-500">
                  {total === 0
                    ? "Apply to a tuition to start tracking your progress."
                    : `Accepted ${accepted} out of ${total} applications`}
                </p>
              </div>
            </div>
          </div>

          {/* D. Recent applications */}
          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm lg:col-span-2">
            <div className="flex items-center justify-between gap-2">
              <div>
                <h2 className="font-semibold text-gray-900">
                  Recent Applications
                </h2>
                <p className="mt-1 text-xs text-gray-500">
                  Your latest tuition applications.
                </p>
              </div>
              <Link
                href="/dashboard/student/my-applications"
                className="inline-flex shrink-0 items-center gap-1 text-sm font-semibold text-purple-600 hover:underline"
              >
                View All
                <ArrowRightIcon size={15} />
              </Link>
            </div>

            {recentApplications.length === 0 ? (
              /* Friendly empty state */
              <div className="mt-6 flex flex-col items-center rounded-xl border border-dashed border-gray-200 bg-gray-50/50 px-6 py-10 text-center">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-50 text-purple-500">
                  <InboxIcon size={22} />
                </span>
                <p className="mt-4 text-sm font-semibold text-gray-800">
                  No applications yet
                </p>
                <p className="mt-1 max-w-xs text-xs text-gray-500">
                  When you apply for a tuition, it will show up here.
                </p>
                <Link
                  href="/browse-tuition"
                  className="mt-5 inline-flex items-center gap-1.5 rounded-xl bg-[#6D28D9] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#5B21B6]"
                >
                  <BookOpenIcon size={16} />
                  Browse Tuitions
                </Link>
              </div>
            ) : (
              <div className="mt-5 space-y-3">
                {recentApplications.map((app) => (
                  <div
                    key={app._id}
                    className="flex flex-col gap-3 rounded-xl border border-gray-100 p-4 transition-colors hover:bg-purple-50/30 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div className="flex min-w-0 items-start gap-3">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
                        <GraduationCapIcon size={18} />
                      </span>
                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-gray-800">
                          {app.tuitionTitle}
                        </p>
                        <p className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-gray-500">
                          <span>{app.subject}</span>
                          <span aria-hidden="true">•</span>
                          <span className="inline-flex items-center gap-1">
                            <CalendarDaysIcon size={12} />
                            {new Date(app.appliedAt).toLocaleDateString(
                              "en-US",
                              { month: "short", day: "numeric", year: "numeric" }
                            )}
                          </span>
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between gap-3 sm:justify-end">
                      <span className="inline-flex items-center gap-1 text-sm font-bold text-gray-800">
                        <WalletIcon size={14} className="text-purple-500" />
                        ৳{app.monthlyFee.toLocaleString()}
                      </span>
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold capitalize ${
                          statusStyles[
                            app.status as keyof typeof statusStyles
                          ] ?? "bg-gray-50 text-gray-600 border-gray-200"
                        }`}
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-current" />
                        {app.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* E. Quick actions */}
        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <h2 className="font-semibold text-gray-900">Quick Actions</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <Link
              href="/browse-tuition"
              className="group flex items-center gap-4 rounded-xl border border-purple-100 bg-purple-50/40 p-5 transition-all hover:border-purple-200 hover:bg-purple-50"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-purple-600 shadow-sm">
                <BookOpenIcon size={20} />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-sm font-semibold text-gray-900">
                  Browse Tuitions
                </span>
                <span className="mt-0.5 block text-xs text-gray-500">
                  Find new tuition opportunities
                </span>
              </span>
              <ArrowRightIcon
                size={18}
                className="shrink-0 text-purple-400 transition-transform group-hover:translate-x-1"
              />
            </Link>

            <Link
              href="/dashboard/student/my-applications"
              className="group flex items-center gap-4 rounded-xl border border-purple-100 bg-purple-50/40 p-5 transition-all hover:border-purple-200 hover:bg-purple-50"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-purple-600 shadow-sm">
                <FileTextIcon size={20} />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-sm font-semibold text-gray-900">
                  My Applications
                </span>
                <span className="mt-0.5 block text-xs text-gray-500">
                  Track your application statuses
                </span>
              </span>
              <ArrowRightIcon
                size={18}
                className="shrink-0 text-purple-400 transition-transform group-hover:translate-x-1"
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboardPage;
