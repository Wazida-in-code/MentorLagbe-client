import Link from "next/link";
import { redirect } from "next/navigation";
import type { ReactNode } from "react";
import {
  GraduationCapIcon,
  PresentationIcon,
  SearchIcon,
  ShieldCheckIcon,
  TriangleAlertIcon,
  UsersIcon,
} from "lucide-react";
import { getSession } from "@/lib/server";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import RoleSelector from "@/components/AdminUsers/RoleSelector";
import { getUsers } from "@/lib/user";
import { User } from "@/lib/tutionFormData";

// Badge colors for each role.
const roleStyles: Record<string, string> = {
  student: "border-purple-100 bg-purple-50 text-[#6D28D9]",
  tutor: "border-emerald-100 bg-emerald-50 text-emerald-700",
  admin: "border-amber-100 bg-amber-50 text-amber-700",
};

// The filter pills above the table.
const roleFilters = [
  { value: "all", label: "All Users" },
  { value: "student", label: "Students" },
  { value: "tutor", label: "Tutors" },
  { value: "admin", label: "Admins" },
];

// One statistics card (same idea as the student/tutor dashboards).
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
  value: number;
  description: string;
  iconBg: string;
  iconColor: string;
}) {
  return (
    <div className="rounded-2xl border border-[#E9DDFB] bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-medium text-gray-500">{title}</p>
          <p className="mt-2 text-3xl font-bold text-[#2E1065]">{value}</p>
        </div>
        <span
          className={`flex h-11 w-11 items-center justify-center rounded-xl ${iconBg} ${iconColor}`}
        >
          {icon}
        </span>
      </div>
      <p className="mt-3 text-xs text-gray-400">{description}</p>
    </div>
  );
}

type PageProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function AdminUsersPage({ searchParams }: PageProps) {
  const session = await getSession();
  if (!session) redirect("/sign-in");

  const response = await getUsers().catch(() => null);

  if (!response) {
    return (
      <div className="min-h-screen bg-[#F8F7FC] px-4 py-8 md:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-2xl border border-rose-100 bg-white p-10 text-center shadow-sm">
            <TriangleAlertIcon className="mx-auto h-10 w-10 text-rose-500" />
            <h1 className="mt-4 text-lg font-bold text-gray-900">
              Couldn&apos;t load users
            </h1>
            <p className="mt-2 text-sm text-gray-500">
              This page requires an admin account. Please sign in with an admin
              account.
            </p>
            <Link
              href="/dashboard/admin"
              className="mt-5 inline-block rounded-xl bg-[#6D28D9] px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#5B21B6]"
            >
              Go Back
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Every user gets a role — better-auth defaults it to "student".
  const users:User[] = response.map((user:User) => ({
    ...user,
    role: user.role ?? "student",
}));
  // Page-level filters come from the URL (?q=...&role=...).
  const params = await searchParams;
  const q = (params.q ?? "").toString().trim();
  const role = (params.role ?? "all").toString();

  // Statistics always describe ALL users (not the filtered list).
  const totalStudents = users.filter((user) => user.role === "student").length;
  const totalTutors = users.filter((user) => user.role === "tutor").length;
  const totalAdmins = users.filter((user) => user.role === "admin").length;

  // Search by name or email + optional role filter.
  const needle = q.toLowerCase();
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      needle === "" ||
      user.name.toLowerCase().includes(needle) ||
      user.email.toLowerCase().includes(needle);
    const matchesRole = role === "all" || user.role === role;
    return matchesSearch && matchesRole;
  });

  return (
    <div className="min-h-screen bg-[#F8F7FC] px-4 py-8 md:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl space-y-7">
        {/* Page header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="mb-2 flex items-center gap-2 text-sm font-medium text-purple-600">
              <ShieldCheckIcon size={18} />
              Admin Panel
              <span aria-hidden="true" className="ml-1 flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-[#7C3AED]" />
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
              </span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 md:text-3xl">
              Manage Users
            </h1>
            <p className="mt-2 text-sm text-gray-500 md:text-base">
              Manage your MentorLagbe community and user roles.
            </p>
          </div>
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-[#E9DDFB] bg-white px-4 py-2 text-sm font-semibold text-[#6D28D9] shadow-sm">
            <UsersIcon size={15} />
            {users.length} members
          </span>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          <StatCard
            icon={<UsersIcon size={20} />}
            title="Total Users"
            value={users.length}
            description="Registered members"
            iconBg="bg-purple-50"
            iconColor="text-purple-600"
          />
          <StatCard
            icon={<GraduationCapIcon size={20} />}
            title="Total Students"
            value={totalStudents}
            description="Learning on MentorLagbe"
            iconBg="bg-blue-50"
            iconColor="text-blue-600"
          />
          <StatCard
            icon={<PresentationIcon size={20} />}
            title="Total Tutors"
            value={totalTutors}
            description="Teaching on MentorLagbe"
            iconBg="bg-emerald-50"
            iconColor="text-emerald-600"
          />
          <StatCard
            icon={<ShieldCheckIcon size={20} />}
            title="Total Admins"
            value={totalAdmins}
            description="Platform administrators"
            iconBg="bg-amber-50"
            iconColor="text-amber-600"
          />
        </div>

        {/* Search + role filters */}
        <div className="rounded-2xl border border-[#E9DDFB] bg-white p-5 shadow-sm">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <form
              method="get"
              action="/dashboard/admin/users"
              className="flex w-full items-center gap-2 lg:max-w-md"
            >
              <input type="hidden" name="role" value={role} />
              <div className="relative flex-1">
                <SearchIcon className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input
                  name="q"
                  defaultValue={q}
                  placeholder="Search by name or email..."
                  className="h-11 rounded-xl border-[#E9DDFB] bg-[#F5F3FF]/50 pl-11 pr-4 text-sm text-[#2E1065] placeholder:text-gray-400"
                />
              </div>
              <Button
                type="submit"
                className="h-11 rounded-xl bg-[#6D28D9] px-5 font-semibold text-white hover:bg-[#5B21B6]"
              >
                Search
              </Button>
            </form>

            <div className="flex flex-wrap gap-2">
              {roleFilters.map((filter) => (
                <Link
                  key={filter.value}
                  href={`/dashboard/admin/users?q=${encodeURIComponent(q)}&role=${filter.value}`}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                    role === filter.value
                      ? "bg-[#6D28D9] text-white shadow-sm"
                      : "border border-[#E9DDFB] bg-white text-[#4C1D95] hover:bg-[#F5F3FF]"
                  }`}
                >
                  {filter.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Users table */}
        <div className="overflow-hidden rounded-2xl border border-[#E9DDFB] bg-white shadow-sm">
          <div className="overflow-x-auto">
            <Table className="w-full min-w-[880px]">
              <TableHeader>
                <TableRow className="bg-[#F5F3FF] hover:bg-[#F5F3FF]">
                  <TableHead className="text-[#4C1D95]">User</TableHead>
                  <TableHead className="text-[#4C1D95]">Email</TableHead>
                  <TableHead className="text-[#4C1D95]">Role</TableHead>
                  <TableHead className="text-[#4C1D95]">Joined Date</TableHead>
                  <TableHead className="text-right text-[#4C1D95]">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((user) => {
                    const joined = new Date(user.createdAt).toLocaleDateString(
                      "en-US",
                      { month: "short", day: "numeric", year: "numeric" },
                    );
                    const initials = user.name
                      .split(" ")
                      .map((part) => part.charAt(0))
                      .slice(0, 2)
                      .join("")
                      .toUpperCase();

                    return (
                      <TableRow
                        key={user._id}
                        className="transition-colors hover:bg-purple-50/40"
                      >
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar>
                              <AvatarImage
                                src={user.image ?? undefined}
                                alt={user.name}
                              />
                              <AvatarFallback className="bg-[#EDE9FE] text-xs font-semibold text-[#6D28D9]">
                                {initials}
                              </AvatarFallback>
                            </Avatar>
                            <span className="font-medium text-[#2E1065]">
                              {user.name}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell className="text-sm text-gray-500">
                          {user.email}
                        </TableCell>
                        <TableCell>
                          <Badge
                            className={
                              roleStyles[user.role] ??
                              "border-gray-100 bg-gray-50 text-gray-600"
                            }
                          >
                            {user.role.charAt(0).toUpperCase() +
                              user.role.slice(1)}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-sm text-gray-500">
                          {joined}
                        </TableCell>
                        <TableCell className="text-right">
                          <RoleSelector
                            userId={user.id}
                            currentRole={user.role}
                          />
                        </TableCell>
                      </TableRow>
                    );
                  })
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={5}
                      className="h-32 text-center text-gray-500"
                    >
                      No users found{q ? ` for "${q}"` : ""}.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
}
