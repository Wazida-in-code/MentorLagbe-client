'use client'
import { TuitionType } from "@/lib/tutionFormData";
import { updateTuitionActive } from "@/lib/tutionsApi/addTution";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";

const UpdateTuitionActiveClose = ({tuition}:{tuition:TuitionType}) => {
    const router = useRouter()
      const handleStatusChange = async (tuition: TuitionType) => {
  const newStatus = !tuition.isActive;

  const result = await updateTuitionActive(
    tuition._id,
    newStatus
  );

  if (result.modifiedCount > 0) {
    toast.success(
      newStatus ? "Tuition activated!" : "Tuition closed!"
    );

    router.refresh();
  }
};
  return (
    <div>
      <Button
        onClick={() => handleStatusChange(tuition)}
         className={tuition.isActive ? "bg-green-100 text-green-700 hover:bg-green-100" : "bg-gray-100 text-gray-600 hover:bg-gray-100"}
      >
        {tuition.isActive ? "Close Tuition" : "Activate Tuition"}
      </Button>
    </div>
  );
};

export default UpdateTuitionActiveClose;
