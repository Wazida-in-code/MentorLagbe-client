"use client";

import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { BookOpen, Clock, CheckCircle, XCircle, Search } from "lucide-react";
import { getAllTuition, updateTuitionStatus } from "@/lib/tutionsApi/addTution";

type Tuition = {
  _id: string;
  subject: string;
  classLevel: string;
  location: string;
  monthlyFee: number;
  tutorName: string;
  approvalStatus: "pending" | "approved" | "rejected";
};

const ManageTuitionPage = () => {
  const [tuitions, setTuitions] = useState<Tuition[]>([]);
  const [activeTab, setActiveTab] = useState("All Tuitions");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  // GET: Fetch all tuitions
  useEffect(() => {
    const fetchTuitions = async () => {
      try {
        const data = await getAllTuition();
        setTuitions(data);
      } catch {
        toast.error("Failed to fetch tuitions");
      } finally {
        setLoading(false);
      }
    };

    fetchTuitions();
  }, []);

  // PATCH: Update tuition approval status
  const handleStatusChange = async (
    id: string,
    approvalStatus: Tuition["approvalStatus"],
  ) => {
    try {
      setUpdatingId(id);

      await updateTuitionStatus(id, approvalStatus);

      setTuitions((prev) =>
        prev.map((tuition) =>
          tuition._id === id ? { ...tuition, approvalStatus } : tuition,
        ),
      );

      toast.success("Tuition status updated successfully!");
    } catch {
      toast.error("Failed to update tuition status");
    } finally {
      setUpdatingId(null);
    }
  };

  // Filter tuitions by tab and search
  const filteredTuitions = tuitions.filter((tuition) => {
    const matchesTab =
      activeTab === "All Tuitions" ||
      tuition.approvalStatus === activeTab.toLowerCase();

    const matchesSearch =
      tuition.subject?.toLowerCase().includes(search.toLowerCase()) ||
      tuition.location?.toLowerCase().includes(search.toLowerCase());

    return matchesTab && matchesSearch;
  });

  const tabs = [
    {
      name: "Pending",
      icon: Clock,
      count: tuitions.filter((t) => t.approvalStatus === "pending").length,
      color: "amber",
    },
    {
      name: "Approved",
      icon: CheckCircle,
      count: tuitions.filter((t) => t.approvalStatus === "approved").length,
      color: "green",
    },
    {
      name: "Rejected",
      icon: XCircle,
      count: tuitions.filter((t) => t.approvalStatus === "rejected").length,
      color: "red",
    },
    {
      name: "All Tuitions",
      icon: BookOpen,
      count: tuitions.length,
      color: "purple",
    },
  ];

  return (
    <div className="space-y-5">
      {/* Header */}
      <div>
        <h1 className="text-xl font-bold text-gray-800">Manage Tuitions</h1>
        <p className="mt-1 text-sm text-gray-500">
          Review and manage all tuition posts from one place.
        </p>
      </div>

      {/* Tabs */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {tabs.map((tab) => {
          const Icon = tab.icon;

          return (
            <button
              key={tab.name}
              onClick={() => setActiveTab(tab.name)}
              className={`flex items-center gap-3 rounded-xl border p-3 text-left transition ${
                activeTab === tab.name
                  ? "border-purple-300 bg-purple-50 shadow-sm"
                  : "border-gray-200 bg-white hover:border-purple-200"
              }`}
            >
              <div className="rounded-lg bg-purple-100 p-2 text-purple-600">
                <Icon size={18} />
              </div>

              <div>
                <p className="text-xs text-gray-500">{tab.name}</p>
                <p className="text-lg font-bold text-gray-800">{tab.count}</p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Tuition Table */}
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        <div className="flex flex-col justify-between gap-3 border-b border-gray-100 p-4 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-base font-semibold text-gray-800">
              {activeTab}
            </h2>

            <p className="mt-1 text-xs text-gray-500">
              {filteredTuitions.length} tuition posts found
            </p>
          </div>

          <div className="relative">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder="Search tuition..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-lg border border-gray-200 py-2 pl-9 pr-3 text-xs outline-none transition focus:border-purple-400 sm:w-56"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px] text-left text-xs">
            <thead className="bg-[#F5F3FF] text-gray-600">
              <tr>
                <th className="px-4 py-3 font-semibold">#</th>
                <th className="px-4 py-3 font-semibold">Subject</th>
                <th className="px-4 py-3 font-semibold">Class</th>
                <th className="px-4 py-3 font-semibold">Tutor</th>
                <th className="px-4 py-3 font-semibold">Location</th>
                <th className="px-4 py-3 font-semibold">Salary</th>
                <th className="px-4 py-3 font-semibold">Status</th>
                <th className="px-4 py-3 font-semibold">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-gray-500">
                    Loading tuitions...
                  </td>
                </tr>
              ) : filteredTuitions.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-gray-500">
                    <BookOpen
                      className="mx-auto mb-2 text-gray-300"
                      size={30}
                    />
                    <p>No tuitions found.</p>
                  </td>
                </tr>
              ) : (
                filteredTuitions.map((tuition, index) => (
                  <tr key={tuition._id} className="transition hover:bg-gray-50">
                    <td className="px-5 py-4 text-gray-500">{index + 1}</td>

                    <td className="px-5 py-4 font-semibold text-gray-800">
                      {tuition.subject}
                    </td>

                    <td className="px-5 py-4 text-gray-600">{tuition.classLevel}</td>

                    <td className="px-5 py-4 text-gray-600">
                      {tuition.tutorName}
                    </td>

                    <td className="px-5 py-4 text-gray-600">
                      {tuition.location}
                    </td>

                    <td className="px-5 py-4 font-medium text-gray-700">
                      ৳{tuition.monthlyFee}
                    </td>

                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex rounded-full px-2.5 py-1 text-[11px] font-semibold capitalize ${
                          tuition.approvalStatus === "approved"
                            ? "bg-green-100 text-green-700"
                            : tuition.approvalStatus === "rejected"
                              ? "bg-red-100 text-red-700"
                              : "bg-amber-100 text-amber-700"
                        }`}
                      >
                        {tuition.approvalStatus}
                      </span>
                    </td>

                    <td className="px-5 py-4">
                      <select
                        value={tuition.approvalStatus}
                        disabled={updatingId === tuition._id}
                        onChange={(e) =>
                          handleStatusChange(
                            tuition._id,
                            e.target.value as Tuition["approvalStatus"],
                          )
                        }
                        className="rounded-lg border border-gray-200 bg-white px-2 py-1.5 text-xs font-medium capitalize outline-none transition focus:border-purple-400 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        <option value="pending">Pending</option>
                        <option value="approved">Approved</option>
                        <option value="rejected">Rejected</option>
                      </select>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageTuitionPage;
