"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// The three roles an admin can pick from.
const roles = ["student", "tutor", "admin"];

function capitalize(text: string) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

export default function RoleSelector({
  userId,
  currentRole,
}: {
  userId: string;
  currentRole: string;
}) {
  // UI ONLY for now — it logs the choice and waits for the real backend later.
  function handleRoleChange(newRole: string | null) {
    console.log("Role change requested:", { userId, newRole });
  }

  return (
    <Select value={currentRole} onValueChange={handleRoleChange}>
      <SelectTrigger
        aria-label={`Change role for ${userId}`}
        className="h-9 w-[132px] rounded-lg border-[#E9DDFB] bg-white text-xs font-medium text-[#4C1D95] hover:border-[#6D28D9]"
      >
        <SelectValue>{(value) => capitalize(String(value))}</SelectValue>
      </SelectTrigger>
      <SelectContent>
        {roles.map((role) => (
          <SelectItem key={role} value={role}>
            {capitalize(role)}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
