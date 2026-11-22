import StatsCard from "@/components/ExtraActivityPages/StatsCard";
import { getTransaction } from "@/lib/transaction";
import { TransactionType, TuitionType, User } from "@/lib/tutionFormData";
import { getTuition, getTuitionCounts } from "@/lib/tutionsApi/addTution";
import { getUsers } from "@/lib/user";
import {
  Users,
  GraduationCap,
  Wallet,
  ClipboardCheck,
  Clock3,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

const AdminOverviewPage = async () => {
  const [users, transactions, tuitionCounts] = await Promise.all([
    getUsers(),
    getTransaction(),
    getTuitionCounts(),
  ]);

  // Total Users
  const totalUsers = users.length;

  // Total Tutors
  const totalTutors = users.filter(
    (user: User) => user.role === "tutor",
  ).length;

  // Tuition Statistics (from count API)
  const pendingTuitions = tuitionCounts.pendingTuitions;
  const approvedTuitions = tuitionCounts.approvedTuitions;

  const totalTuitions = pendingTuitions + approvedTuitions;

  // Total Stripe Revenue
  const totalRevenue = transactions
    .filter((item: TransactionType) => item.payment_status === "paid")
    .reduce(
      (total: number, item: TransactionType) =>
        total + Number(item.amount || 0),
      0,
    );

  // Approval Percentage
  const approvedPercentage =
    totalTuitions > 0 ? (approvedTuitions / totalTuitions) * 100 : 0;

  return (
    <main className="min-h-screen bg-[#F6F7FB] p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl space-y-8">
        {/* Welcome Header */}
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-700 via-indigo-600 to-violet-600 p-6 text-white shadow-xl shadow-indigo-200/50 sm:p-9">
          <div className="absolute -right-16 -top-24 h-72 w-72 rounded-full border-[35px] border-white/10" />
          <div className="absolute -bottom-28 right-40 h-60 w-60 rounded-full bg-white/5" />

          <div className="relative z-10 flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
            <div>
              <div className="mb-4 flex w-fit items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-medium text-indigo-100">
                <Sparkles size={14} />
                ADMIN CONTROL CENTER
              </div>

              <h1 className="text-2xl font-bold tracking-tight sm:text-4xl">
                Dashboard Overview
              </h1>

              <p className="mt-3 max-w-lg text-sm leading-6 text-indigo-100 sm:text-base">
                Welcome to MentorLagbe! Here&aps;s what&apos;s happening across
                your learning platform.
              </p>
            </div>

            <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-white/20 bg-white/10 sm:h-20 sm:w-20">
              <GraduationCap size={42} />
            </div>
          </div>
        </section>

        {/* Statistics */}
        <section>
          <div className="mb-5">
            <h2 className="text-xl font-bold text-slate-900">
              Platform Statistics
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              A quick look at your platform&apos;s performance.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
            <StatsCard
              title="Total Users"
              value={totalUsers.toLocaleString("en-BD")}
              description="Registered platform members"
              icon={Users}
              iconColor="text-indigo-600"
              iconBg="bg-indigo-50"
              accentColor="text-indigo-500"
            />

            <StatsCard
              title="Total Tutors"
              value={totalTutors.toLocaleString("en-BD")}
              description="Registered tutors"
              icon={GraduationCap}
              iconColor="text-violet-600"
              iconBg="bg-violet-50"
              accentColor="text-violet-500"
            />

            <StatsCard
              title="Total Tuitions"
              value={totalTuitions.toLocaleString("en-BD")}
              description="Pending and approved listings"
              icon={ClipboardCheck}
              iconColor="text-amber-600"
              iconBg="bg-amber-50"
              accentColor="text-amber-500"
            />

            <StatsCard
              title="Total Stripe Revenue"
              value={`৳${totalRevenue.toLocaleString("en-BD")}`}
              description="Successful subscription payments"
              icon={Wallet}
              iconColor="text-emerald-600"
              iconBg="bg-emerald-50"
              accentColor="text-emerald-500"
            />
          </div>
        </section>

        {/* Tuition Approval Overview */}
        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Tuition Approval Overview
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Monitor submitted and approved tuition listings.
              </p>
            </div>

            <span className="w-fit rounded-full bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-600">
              {totalTuitions} Total Listings
            </span>
          </div>

          {/* Progress Bar */}
          <div className="mt-7">
            <div className="mb-3 flex h-3 overflow-hidden rounded-full bg-slate-100">
              <div
                className="rounded-full bg-emerald-500 transition-all duration-700"
                style={{ width: `${approvedPercentage}%` }}
              />

              <div
                className="bg-amber-400 transition-all duration-700"
                style={{
                  width: `${
                    totalTuitions > 0
                      ? (pendingTuitions / totalTuitions) * 100
                      : 0
                  }%`,
                }}
              />
            </div>

            <div className="flex justify-between text-xs text-slate-500">
              <span>{approvedPercentage.toFixed(0)}% approved</span>
              <span>{(100 - approvedPercentage).toFixed(0)}% pending</span>
            </div>
          </div>

          {/* Approval Cards */}
          <div className="mt-7 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-emerald-100 bg-emerald-50/60 p-5">
              <div className="flex items-center gap-2 text-sm font-medium text-emerald-700">
                <CheckCircle2 size={18} />
                Approved Tuitions
              </div>

              <h3 className="mt-4 text-3xl font-bold text-emerald-800">
                {approvedTuitions}
              </h3>

              <p className="mt-1 text-xs text-emerald-600">
                Successfully approved listings
              </p>
            </div>

            <div className="rounded-xl border border-amber-100 bg-amber-50/60 p-5">
              <div className="flex items-center gap-2 text-sm font-medium text-amber-700">
                <Clock3 size={18} />
                Pending Tuitions
              </div>

              <h3 className="mt-4 text-3xl font-bold text-amber-800">
                {pendingTuitions}
              </h3>

              <p className="mt-1 text-xs text-amber-600">
                Waiting for admin approval
              </p>
            </div>
          </div>
        </section>

        {/* Footer Info */}
        <div className="flex flex-col items-center justify-between gap-2 rounded-xl border border-indigo-100 bg-indigo-50/60 px-5 py-4 sm:flex-row">
          <div className="flex items-center gap-2 text-sm font-medium text-indigo-800">
            <Sparkles size={17} />
            MentorLagbe Platform Insights
          </div>

          <p className="text-xs text-indigo-600">
            Statistics retrieved from your existing APIs
          </p>
        </div>
      </div>
    </main>
  );
};

export default AdminOverviewPage;
