
import { Trash2, GraduationCap, CalendarDays, Wallet } from "lucide-react";
import { getApplications } from "@/lib/tutionsApi/applications";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { ApplicationType } from "@/lib/tutionFormData";
import DeleteApplication from "@/components/ExtraActivityPages/DeleteApplication";

const statusStyles = {
  pending: "bg-amber-50 text-amber-700 border-amber-200",
  accepted: "bg-emerald-50 text-emerald-700 border-emerald-200",
  rejected: "bg-rose-50 text-rose-700 border-rose-200",
};

const StudentMyApplicationPage = async() => {
    const session = await auth.api.getSession({
        headers: await headers()
    })
    const applications:ApplicationType[] = await getApplications(`userId=${session?.user.id}`)
  return (
    <div className="min-h-screen bg-[#F8F7FC] px-4 py-8 md:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl space-y-7">

        {/* Header */}
        <div>
          <div className="mb-2 flex items-center gap-2 text-sm font-medium text-purple-600">
            <GraduationCap size={18} />
            Student Dashboard
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 md:text-3xl">
            My Applications
          </h1>
          <p className="mt-2 text-sm text-gray-500 md:text-base">
            Track your tuition applications and check their current status.
          </p>
        </div>

        {/* Summary */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-purple-100 bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-gray-500">Total Applications</p>
            <h2 className="mt-2 text-3xl font-bold text-gray-900">
              {applications.length}
            </h2>
          </div>

          <div className="rounded-2xl border border-amber-100 bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-gray-500">Pending</p>
            <h2 className="mt-2 text-3xl font-bold text-amber-600">
              {applications.filter((app) => app.status === "pending").length}
            </h2>
          </div>

          <div className="rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-gray-500">Accepted</p>
            <h2 className="mt-2 text-3xl font-bold text-emerald-600">
              {applications.filter((app) => app.status === "accepted").length}
            </h2>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">

          <div className="flex flex-col justify-between gap-2 border-b border-gray-100 px-6 py-5 sm:flex-row sm:items-center">
            <div>
              <h2 className="font-semibold text-gray-900">
                Application History
              </h2>
              <p className="mt-1 text-xs text-gray-500">
                A complete overview of your submitted applications.
              </p>
            </div>
            <span className="w-fit rounded-full bg-purple-50 px-3 py-1.5 text-xs font-semibold text-purple-700">
              {applications.length} Applications
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[850px] text-left">
              <thead>
                <tr className="bg-gray-50/80 text-xs font-semibold uppercase tracking-wider text-gray-500">
                  <th className="px-6 py-4">Tuition Details</th>
                  <th className="px-6 py-4">Tutor Information</th>
                  <th className="px-6 py-4">Monthly Fee</th>
                  <th className="px-6 py-4">Applied Date</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-center">Action</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {applications.map((app) => (
                  <tr
                    key={app._id}
                    className="transition-colors hover:bg-purple-50/30"
                  >
                    {/* Tuition */}
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
                          <GraduationCap size={20} />
                        </div>
                        <span className="max-w-[200px] text-sm font-semibold text-gray-800">
                          {app.tuitionTitle}
                        </span>
                      </div>
                    </td>

                    {/* Tutor */}
                    <td className="px-6 py-5">
                      <p className="text-sm font-semibold text-gray-800">
                        {app.tutorName}
                      </p>
                      <p className="mt-1 text-xs text-gray-500">
                        {app.tutorEmail}
                      </p>
                    </td>

                    {/* Fee */}
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-1.5 text-sm font-semibold text-gray-800">
                        <Wallet size={15} className="text-purple-500" />
                        ৳{app.monthlyFee.toLocaleString()}
                      </div>
                      <span className="ml-6 text-xs text-gray-400">/ month</span>
                    </td>

                    {/* Date */}
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <CalendarDays size={15} className="text-gray-400" />
                        {app.appliedAt}
                      </div>
                    </td>

                    {/* Status */}
                    <td className="px-6 py-5">
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold capitalize ${
                          statusStyles[app.status as keyof typeof statusStyles]
                        }`}
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-current" />
                        {app.status}
                      </span>
                    </td>

                    {/* Delete */}
                    <td className="px-6 py-5 text-center">
                      <DeleteApplication app={app} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Footer */}
          <div className="border-t border-gray-100 bg-gray-50/50 px-6 py-4">
            <p className="text-xs text-gray-500">
              Showing {applications.length} applications
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentMyApplicationPage;
