import Link from "next/link";
import Image from "next/image";
import { Eye, Pencil, Plus, Trash2 } from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Badge } from "@/components/ui/badge";
import { getTuition } from "@/lib/tutionsApi/addTution";
import DeleteTuition from "@/components/ExtraActivityPages/DeleteTuition";
import { TuitionType } from "@/lib/tutionFormData";

const MyTuitionPage = async() => {
    const tuitions: TuitionType[] = await getTuition()
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 rounded-2xl border border-[#E9DDFB] bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:p-6">
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-2xl font-bold tracking-tight text-[#2E1065]">
              My Tuitions
            </h1>

            <span className="rounded-full bg-[#F5F3FF] px-3 py-1 text-xs font-semibold text-[#6D28D9]">
              {tuitions.length} Posts
            </span>
          </div>

          <p className="text-sm text-gray-500">
            Manage your tuition posts and monitor their approval status.
          </p>

          <p className="text-xs font-medium text-gray-400">
            Showing {tuitions.length} tuition posts
          </p>
        </div>

        <Link
          href="/dashboard/tutor/add-tuition"
          className="inline-flex items-center justify-center gap-2 self-start rounded-xl bg-[#6D28D9] px-5 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-[#5B21B6] hover:shadow-md sm:self-center"
        >
          <Plus className="h-4 w-4" />
          Add New Tuition
        </Link>
      </div>

      {/* Tuition Table */}
      <div className="overflow-hidden rounded-xl border border-[#E9DDFB] bg-white shadow-sm">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-[#F5F3FF] hover:bg-[#F5F3FF]">
                <TableHead className="min-w-[280px] text-[#4C1D95]">
                  Tuition
                </TableHead>
                <TableHead className="text-[#4C1D95]">
                  Approval Status
                </TableHead>
                <TableHead className="text-[#4C1D95]">Active Status</TableHead>
                <TableHead className="text-center text-[#4C1D95]">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {tuitions.length > 0 ? (
                tuitions.map((tuition) => (
                  <TableRow key={tuition._id}>
                    {/* Tuition Details */}
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="relative h-14 w-20 shrink-0 overflow-hidden rounded-lg bg-[#F5F3FF]">
                          <Image
                            src={tuition.bannerImage || "/default-tuition.png"}
                            alt={tuition.title}
                            fill
                            sizes="80px"
                            className="object-cover"
                            unoptimized
                          />
                        </div>

                        <div className="min-w-0">
                          <p className="line-clamp-2 font-semibold text-[#2E1065]">
                            {tuition.title}
                          </p>
                          <p className="mt-1 text-xs text-gray-500">
                            {tuition.subject} • {tuition.classLevel}
                          </p>
                        </div>
                      </div>
                    </TableCell>

                    {/* Approval Status */}
                    <TableCell>
                      <Badge
                        className={
                          tuition.approvalStatus === "approved"
                            ? "bg-green-100 text-green-700 hover:bg-green-100"
                            : tuition.approvalStatus === "pending"
                              ? "bg-amber-100 text-amber-700 hover:bg-amber-100"
                              : "bg-red-100 text-red-700 hover:bg-red-100"
                        }
                      >
                        {tuition.approvalStatus}
                      </Badge>
                    </TableCell>

                    {/* Active Status */}
                    <TableCell>
                      <Badge
                        className={
                          tuition.isActive
                            ? "bg-green-100 text-green-700 hover:bg-green-100"
                            : "bg-gray-100 text-gray-600 hover:bg-gray-100"
                        }
                      >
                        {tuition.isActive ? "Active" : "Inactive"}
                      </Badge>
                    </TableCell>

                    {/* Actions */}
                    <TableCell>
                      <div className="flex items-center justify-center gap-1">
                        {/* View */}
                        <Link
                          href={`/browse-tuition/${tuition._id}`}
                          title="View tuition"
                          className="inline-flex h-9 w-9 items-center justify-center rounded-md text-blue-600 hover:bg-blue-50"
                        >
                          <Eye className="h-4 w-4" />
                        </Link>

                        {/* Edit */}
                        <Link
                          href={`/dashboard/tutor/edit-tuition/${tuition._id}`}
                          title="Edit tuition"
                          className="inline-flex h-9 w-9 items-center justify-center rounded-md text-[#6D28D9] hover:bg-purple-50"
                        >
                          <Pencil className="h-4 w-4" />
                        </Link>

                        {/* Delete */}
                        <DeleteTuition tuition={tuition} />
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={4}
                    className="h-32 text-center text-gray-500"
                  >
                    You haven&apos;t posted any tuition yet.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default MyTuitionPage;
