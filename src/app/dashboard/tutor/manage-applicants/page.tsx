
"use client";

import { useEffect, useState } from "react";
import {
  Users,
  Clock,
  CheckCircle2,
  XCircle,
  Search,
  CalendarDays,
  Check,
  X,
} from "lucide-react";
import { useSession } from "@/lib/auth-client";
import { getApplications } from "@/lib/tutionsApi/applications";
import { Application } from "@/lib/tutionFormData";

const ManageApplicantsPage = () => {
  const { data: session, isPending } = useSession();

  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  // Fetch tutor's applications
  useEffect(() => {
    if (isPending) return;

    const tutorEmail = session?.user?.email;

    if (!tutorEmail) {
      return;
    }

    const fetchApplications = async () => {
      try {
        const query = new URLSearchParams({
          tutorEmail: tutorEmail,
        }).toString();

        const data = await getApplications(query);
        setApplications(data);
      } catch (error) {
        console.error("Failed to fetch applications:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, [session, isPending]);

  // Search and filter
  const filteredApplications = applications.filter((app) => {
    const matchesSearch =
      app.studentName?.toLowerCase().includes(search.toLowerCase()) ||
      app.tuitionTitle?.toLowerCase().includes(search.toLowerCase()) ||
      app.email?.toLowerCase().includes(search.toLowerCase());

    const matchesFilter =
      filter === "all" || app.status === filter;

    return matchesSearch && matchesFilter;
  });

  // Statistics
  const stats = [
    {
      title: "Total Applicants",
      value: applications.length,
      icon: Users,
      color: "bg-purple-100 text-purple-600",
    },
    {
      title: "Pending",
      value: applications.filter((app) => app.status === "pending").length,
      icon: Clock,
      color: "bg-amber-100 text-amber-600",
    },
    {
      title: "Accepted",
      value: applications.filter((app) => app.status === "accepted").length,
      icon: CheckCircle2,
      color: "bg-green-100 text-green-600",
    },
    {
      title: "Rejected",
      value: applications.filter((app) => app.status === "rejected").length,
      icon: XCircle,
      color: "bg-red-100 text-red-600",
    },
  ];

  const getStatusStyle = (status:string) => {
    if (status === "accepted") {
      return "bg-green-50 text-green-700 border-green-200";
    }

    if (status === "rejected") {
      return "bg-red-50 text-red-600 border-red-200";
    }

    return "bg-amber-50 text-amber-700 border-amber-200";
  };

 if (isPending || (session?.user?.email && loading)) {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <p className="text-gray-500">Loading applications...</p>
    </div>
  );
}

  return (
    <div className="min-h-screen bg-[#F8F7FC] p-4 md:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl space-y-7">

        {/* Header */}
        <div>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span>Dashboard</span>
            <span>/</span>
            <span className="font-medium text-purple-600">
              Manage Applicants
            </span>
          </div>

          <div className="mt-4 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 md:text-3xl">
                Manage Applicants
              </h1>
              <p className="mt-2 text-sm text-gray-500">
                Review student applications and manage your tuition requests.
              </p>
            </div>

            <div className="flex items-center gap-2 rounded-xl border border-purple-100 bg-white px-4 py-3">
              <Users size={19} className="text-purple-600" />
              <span className="text-sm font-semibold text-gray-700">
                {applications.length} Applications
              </span>
            </div>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.title}
                className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      {stat.title}
                    </p>
                    <h2 className="mt-2 text-3xl font-bold text-gray-900">
                      {stat.value}
                    </h2>
                  </div>

                  <div className={`rounded-xl p-3 ${stat.color}`}>
                    <Icon size={24} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Applications Table */}
        <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">

          {/* Search and Filter */}
          <div className="border-b border-gray-100 p-5">
            <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
              <div>
                <h2 className="text-lg font-bold text-gray-900">
                  All Applications
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                  Manage students who applied to your tuition posts.
                </p>
              </div>

              <div className="relative w-full lg:max-w-xs">
                <Search
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search applicants..."
                  className="h-11 w-full rounded-xl border border-gray-200 bg-gray-50 pl-10 pr-4 text-sm outline-none focus:border-purple-400"
                />
              </div>
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              {["all", "pending", "accepted", "rejected"].map((item) => (
                <button
                  key={item}
                  onClick={() => setFilter(item)}
                  className={`rounded-lg px-4 py-2 text-sm font-semibold capitalize transition ${
                    filter === item
                      ? "bg-purple-600 text-white"
                      : "border border-gray-200 text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1100px] text-left">
              <thead className="bg-gray-50">
                <tr className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                  <th className="px-5 py-4">Student Info</th>
                  <th className="px-5 py-4">Contact Info</th>
                  <th className="px-5 py-4">Tuition Title</th>
                  <th className="px-5 py-4">Application Details</th>
                  <th className="px-5 py-4">Status</th>
                  <th className="px-5 py-4 text-center">Action</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {filteredApplications.map((app) => (
                  <tr key={app._id} className="transition hover:bg-purple-50/30">

                    {/* Student Info */}
                    <td className="px-5 py-5">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-purple-100 font-bold text-purple-700">
                          {(app.studentName || "S").charAt(0)}
                        </div>
                        <div>
                          <p className="whitespace-nowrap text-sm font-semibold text-gray-800">
                            {app.studentName || "Student"}
                          </p>
                          <p className="mt-1 text-xs text-gray-400">
                            Student
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Contact Info */}
                    <td className="px-5 py-5">
                      <p className="text-sm text-gray-700">{app.email}</p>
                      <p className="mt-1 text-xs text-gray-500">
                        {app.studentPhone}
                      </p>
                    </td>

                    {/* Tuition Title */}
                    <td className="px-5 py-5">
                      <p className="max-w-[190px] text-sm font-medium leading-5 text-gray-800">
                        {app.tuitionTitle}
                      </p>
                    </td>

                    {/* Application Details */}
                    <td className="px-5 py-5">
                      <div className="max-w-[220px] space-y-2">
                        <p className="flex items-start gap-2 text-xs text-gray-600">
                          <CalendarDays
                            size={15}
                            className="mt-0.5 shrink-0 text-purple-500"
                          />
                          {app.preferredSchedule}
                        </p>
                        <p className="line-clamp-2 text-xs leading-5 text-gray-500">
                          {app.studentNote}
                        </p>
                      </div>
                    </td>

                    {/* Status */}
                    <td className="px-5 py-5">
                      <span
                        className={`inline-flex items-center rounded-full border px-3 py-1.5 text-xs font-semibold capitalize ${getStatusStyle(app.status)}`}
                      >
                        <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-current" />
                        {app.status}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="px-5 py-5">
                      {app.status === "pending" ? (
                        <div className="flex items-center justify-center gap-2">
                          <button
                            type="button"
                            title="Accept Application"
                            className="flex h-9 w-9 items-center justify-center rounded-lg bg-green-50 text-green-600 transition hover:bg-green-600 hover:text-white"
                          >
                            <Check size={17} />
                          </button>

                          <button
                            type="button"
                            title="Reject Application"
                            className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-50 text-red-600 transition hover:bg-red-600 hover:text-white"
                          >
                            <X size={17} />
                          </button>
                        </div>
                      ) : (
                        <p className="text-center text-xs text-gray-400">
                          No action needed
                        </p>
                      )}
                    </td>
                  </tr>
                ))}

                {filteredApplications.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-5 py-12 text-center">
                      <Users className="mx-auto mb-3 text-gray-300" size={32} />
                      <p className="font-medium text-gray-600">
                        No applications found
                      </p>
                      <p className="mt-1 text-sm text-gray-400">
                        No student applications match your search.
                      </p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Footer */}
          <div className="flex flex-col items-center justify-between gap-3 border-t border-gray-100 px-5 py-4 sm:flex-row">
            <p className="text-xs text-gray-500">
              Showing {filteredApplications.length} applications
            </p>
            <p className="text-xs text-gray-400">
              MentorLagbe Dashboard
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageApplicantsPage;
