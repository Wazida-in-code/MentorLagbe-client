
"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { TableCell, TableRow } from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { updateUserRole } from "@/lib/user";

const roles = ["student", "tutor", "admin"];

const roleStyles: Record<string, string> = {
  student: "border-purple-100 bg-purple-50 text-purple-600",
  tutor: "border-blue-100 bg-blue-50 text-blue-600",
  admin: "border-amber-100 bg-amber-50 text-amber-600",
};

type Props = {
  userId: string;
  name: string;
  email: string;
  image?: string | null;
  currentRole: string;
  joined: string;
};

export default function UserTableRow({
  userId,
  name,
  email,
  image,
  currentRole,
  joined,
}: Props) {
  const [role, setRole] = useState(currentRole);

  const initials = name
    .split(" ")
    .map((part) => part.charAt(0))
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const handleRoleChange = async (newRole: string | null) => {
    if (!newRole) return;

    try {
      await updateUserRole(
        userId,
        newRole as "student" | "tutor" | "admin"
      );

      setRole(newRole);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <TableRow className="transition-colors hover:bg-purple-50/40">
      {/* User */}
      <TableCell>
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src={image ?? undefined} alt={name} />
            <AvatarFallback className="bg-[#EDE9FE] text-xs font-semibold text-[#6D28D9]">
              {initials}
            </AvatarFallback>
          </Avatar>

          <span className="font-medium text-[#2E1065]">{name}</span>
        </div>
      </TableCell>

      {/* Email */}
      <TableCell className="text-sm text-gray-500">
        {email}
      </TableCell>

      {/* Role Badge */}
      <TableCell>
        <Badge
          className={
            roleStyles[role] ??
            "border-gray-100 bg-gray-50 text-gray-600"
          }
        >
          {role.charAt(0).toUpperCase() + role.slice(1)}
        </Badge>
      </TableCell>

      {/* Joined Date */}
      <TableCell className="text-sm text-gray-500">
        {joined}
      </TableCell>

      {/* Actions */}
      <TableCell className="text-right">
        <Select value={role} onValueChange={handleRoleChange}>
          <SelectTrigger className="ml-auto h-9 w-[132px] rounded-lg border-[#E9DDFB] bg-white text-xs font-medium text-[#4C1D95]">
            <SelectValue />
          </SelectTrigger>

          <SelectContent>
            {roles.map((item) => (
              <SelectItem key={item} value={item}>
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </TableCell>
    </TableRow>
  );
}
