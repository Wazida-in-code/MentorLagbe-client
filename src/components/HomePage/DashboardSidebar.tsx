'use client'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useSession } from "@/lib/auth-client";
import { BookOpen, CreditCard, FileText, LayoutDashboard, PlusCircle, UserRound, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const menuItemsByRole = {
  student: [
    {
      id: 1,
      name: "Overview",
      url: "/dashboard/student",
      icon: LayoutDashboard,
    },
    {
      id: 2,
      name: "My Applications",
      url: "/dashboard/student/my-applications",
      icon: FileText,
    },
  ],

  tutor: [
    {
      id: 1,
      name: "Overview",
      url: "/dashboard/tutor",
      icon: LayoutDashboard,
    },
    {
      id: 2,
      name: "Post a Tuition",
      url: "/dashboard/tutor/add-tuition",
      icon: PlusCircle,
    },
    {
      id: 3,
      name: "My Tuitions",
      url: "/dashboard/tutor/my-tuitions",
      icon: BookOpen,
    },
    {
      id: 4,
      name: "Manage Applicants",
      url: "/dashboard/tutor/applicants",
      icon: Users,
    },
  ],

  admin: [
    {
      id: 1,
      name: "Overview",
      url: "/dashboard/admin",
      icon: LayoutDashboard,
    },
    {
      id: 2,
      name: "Manage Users",
      url: "/dashboard/admin/users",
      icon: Users,
    },
    {
      id: 3,
      name: "Manage Tuitions",
      url: "/dashboard/admin/tuitions",
      icon: BookOpen,
    },
    {
      id: 4,
      name: "Transactions",
      url: "/dashboard/admin/transactions",
      icon: CreditCard,
    },
  ],
};

const commonMenuItems = [
  {
    id: 5,
    name: "Update Profile",
    url: "/dashboard/profile",
    icon: UserRound,
  },
];
export function DashboardSidebar() {
  const { data: session } = useSession();
  const user = session?.user;
  const role = user?.role || "student";
  const menuItems = [
    ...(menuItemsByRole[role] ?? menuItemsByRole.student),
    ...commonMenuItems,
  ];

  const name = user?.name || "Guest";
  const image = user?.image || "";
  const roleLabel = role.charAt(0).toUpperCase() + role.slice(1);

  let roleColor = "bg-[#EDE9FE] text-[#5B21B6]"; // student: purple
  if (role === "tutor") roleColor = "bg-green-100 text-green-700";
  if (role === "admin") roleColor = "bg-amber-100 text-amber-700";

  return (
    <Sidebar>
      <SidebarHeader>
        {/* Profile box: avatar + name + role in a brand-colored card */}
        <div className="rounded-xl bg-gradient-to-br from-[#6D28D9] to-[#4C1D95] p-4 shadow-md">
          <div className="flex items-center gap-3">
            {image ? (
              <Image width={2055}
                height={765}
                src={image}
                alt={name}
                className="h-12 w-12 shrink-0 rounded-full border-2 border-white/70 object-cover"
              />
            ) : (
              // No picture yet: show the first letter of the name.
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-white/70 bg-white/20 text-lg font-bold text-white">
                {name.charAt(0).toUpperCase()}
              </span>
            )}
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-white">
                {name}
              </p>
              <span
                className={`mt-1 inline-block rounded-full px-2 py-0.5 text-[11px] font-semibold ${roleColor}`}
              >
                {roleLabel}
              </span>
            </div>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup />
        <SidebarGroup />
        <SidebarGroup>
          <SidebarMenu>
            {
              menuItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton render={<Link href={item.url} />}>
                    <item.icon />
                    <span>{item.name}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))
            }
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
