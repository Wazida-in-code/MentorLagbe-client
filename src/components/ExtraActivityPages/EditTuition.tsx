"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Pencil } from "lucide-react";
import { Button } from "../ui/button";
import { FormEvent, useState } from "react";
import { TuitionType } from "@/lib/tutionFormData";
import { updateTuition } from "@/lib/tutionsApi/addTution";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const inputClass =
  "w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-[#2E1065] placeholder:text-gray-400 focus:border-[#6D28D9] focus:outline-none focus:ring-2 focus:ring-[#6D28D9]/20";

const labelClass = "mb-1 block text-sm font-medium text-gray-700";

const EditTuition = ({ tuition }: { tuition: TuitionType }) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const updatedTuition = Object.fromEntries(formData.entries());
    const res = await updateTuition(tuition._id, updatedTuition);
    if (res.modifiedCount > 0) {
      toast.success("Tuition updated successfully!");
      setOpen(false);
      router.refresh();
    } else {
      toast.error("No changes were made!");
    }

    console.log(res, "Respons");
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button
          variant="outline"
          size="icon"
          className="h-9 w-9 cursor-pointer border-purple-200 text-[#6D28D9] hover:bg-purple-50"
        >
          <Pencil className="h-4 w-4" />
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-2xl gap-0 overflow-hidden border-purple-100 p-0">
        {/* Header */}
        <DialogHeader className="border-b border-purple-100 bg-[#F5F3FF] px-5 py-4 text-left">
          <DialogTitle className="flex items-center gap-2 text-lg font-bold text-[#4C1D95]">
            <Pencil className="h-5 w-5" />
            Edit Tuition
          </DialogTitle>
          <DialogDescription className="text-xs text-gray-500">
            Update your tuition information and save your changes.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="max-h-[65vh] space-y-3 overflow-y-auto p-4">
            <div>
              <label className={labelClass}>Tuition Title</label>
              <input
                name="title"
                defaultValue={tuition.title}
                className={inputClass}
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={labelClass}>Subject</label>
                <input
                  name="subject"
                  defaultValue={tuition.subject}
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>Class Level</label>
                <select
                  name="classLevel"
                  defaultValue={tuition.classLevel}
                  className={inputClass}
                >
                  {[
                    "Class 6",
                    "Class 7",
                    "Class 8",
                    "Class 9",
                    "Class 10",
                    "SSC",
                    "HSC",
                    "Admission",
                  ].map((level) => (
                    <option key={level}>{level}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={labelClass}>Tutor Name</label>
                <input
                  name="tutorName"
                  defaultValue={tuition.tutorName}
                  readOnly
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>Tutor Email</label>
                <input
                  name="tutorEmail"
                  defaultValue={tuition.tutorEmail}
                  readOnly
                  className={inputClass}
                />
              </div>
            </div>

            <div>
              <label className={labelClass}>Teaching Mode</label>
              <select
                name="mode"
                defaultValue={tuition.mode}
                className={inputClass}
              >
                <option value="Online">Online</option>
                <option value="Offline">Offline</option>
              </select>
            </div>

            <div>
              <label className={labelClass}>Location</label>
              <input
                name="location"
                defaultValue={tuition.location}
                className={inputClass}
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={labelClass}>Monthly Fee (৳)</label>
                <input
                  type="number"
                  name="monthlyFee"
                  defaultValue={tuition.monthlyFee}
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>Days Per Week</label>
                <input
                  type="number"
                  name="daysPerWeek"
                  defaultValue={tuition.daysPerWeek}
                  className={inputClass}
                />
              </div>
            </div>

            <div>
              <label className={labelClass}>Description</label>
              <textarea
                name="description"
                rows={3}
                defaultValue={tuition.description}
                className={inputClass}
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 border-t bg-gray-50 p-3">
            <Button type="submit" className="bg-[#6D28D9] hover:bg-[#5B21B6]">
              Save Changes
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditTuition;
