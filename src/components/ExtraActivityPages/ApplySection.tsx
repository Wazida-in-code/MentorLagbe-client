"use client";
import { useState } from "react";
import { useSession } from "@/lib/auth-client";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { TuitionType } from "@/lib/tutionFormData";
import { toast } from "sonner";
import {
  createApplication,
  getApplicationsCount,
} from "@/lib/tutionsApi/applications";
import { Send } from "lucide-react";

const ApplySection = ({ tuition }: { tuition: TuitionType }) => {
  const { data: session } = useSession();
  const router = useRouter();
  const user = session?.user;

  const [preferredSchedule, setPreferredSchedule] = useState("");
  const [studentNote, setStudentNote] = useState("");
  const [studentPhone, setStudentPhone] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleApplyBtn = async () => {
    if (!user) {
      router.push("/sign-in");
      return;
    }

    if (user.role !== "student") {
      toast.error("Only students can apply for tuitions");
      return;
    }

    if (!studentPhone.trim() || !preferredSchedule.trim()) {
      toast.error("Please fill in your phone and preferred schedule");
      return;
    }

    const countResult = await getApplicationsCount(`userId=${user.id}`);

    if (countResult.count >= 2) {
      router.push("/payment");
      return;
    } else {
      const application = {
        tuitionId: tuition._id,
        userId: user.id,
        email: user.email,
        tuitionTitle: tuition.title,
        subject: tuition.subject,
        monthlyFee: tuition.monthlyFee,
        tutorEmail: tuition.tutorEmail,
        studentPhone: studentPhone.trim(),
        studentName: user.name,
        preferredSchedule: preferredSchedule.trim(),
        studentNote: studentNote.trim(),
      };

      try {
        setSubmitting(true);
        const res = await createApplication(application);

        if (res.insertedId) {
          toast.success("Application submitted successfully!");
          router.push("/browse-tuition");
        } else if (res.message === "Already applied") {
          toast.error("You have already applied for this tuition");
        } else {
          toast.error("Failed to submit application");
        }
      } catch (error) {
        toast.error("Something went wrong!");
      } finally {
        setSubmitting(false);
      }
    }
  };

  return (
    <div className="mt-6 rounded-2xl border border-purple-100 bg-white p-5 shadow-[0_8px_30px_rgba(109,40,217,0.06)] sm:p-6">
      <div className="mb-6">
        <div className="mb-2 flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-100 text-xl">
            🎓
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900">
              Apply for this Tuition
            </h3>
            <p className="text-xs text-gray-500">
              Take the next step in your learning journey.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-5">
        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-700">
            Your Phone Number
          </label>
          <input
            type="tel"
            value={studentPhone}
            onChange={(event) => setStudentPhone(event.target.value)}
            placeholder="Enter your contact number"
            className="w-full rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-3 text-sm outline-none transition focus:border-purple-500 focus:bg-white focus:ring-4 focus:ring-purple-100"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-700">
            Preferred Schedule
          </label>
          <input
            type="text"
            value={preferredSchedule}
            onChange={(event) => setPreferredSchedule(event.target.value)}
            placeholder="e.g. Sunday, Tuesday - 4 PM"
            className="w-full rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-3 text-sm outline-none transition focus:border-purple-500 focus:bg-white focus:ring-4 focus:ring-purple-100"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-700">
            Learning Note{" "}
            <span className="font-normal text-gray-400">(Optional)</span>
          </label>
          <textarea
            value={studentNote}
            onChange={(event) => setStudentNote(event.target.value)}
            placeholder="Tell the tutor a little about your learning goals..."
            rows={4}
            className="w-full resize-none rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-3 text-sm outline-none transition focus:border-purple-500 focus:bg-white focus:ring-4 focus:ring-purple-100"
          />
        </div>
      </div>

      <Button
        onClick={handleApplyBtn}
        disabled={(!!user && user.role !== "student") || submitting}
        className="group mt-6 h-13 w-full rounded-xl bg-gradient-to-r from-[#7C3AED] via-[#6D28D9] to-[#5B21B6] text-sm font-bold text-white shadow-lg shadow-purple-300/40 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-purple-300/60 active:translate-y-0 disabled:translate-y-0 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <span className="flex items-center justify-center gap-2">
          {submitting ? (
            "Submitting..."
          ) : (
            <>
              Submit Application
              <Send className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </>
          )}
        </span>
      </Button>

      {user && user.role !== "student" && (
        <p className="mt-3 text-center text-sm text-red-500">
          Only students can apply for this tuition.
        </p>
      )}

      <p className="mt-4 flex items-center justify-center gap-2 text-xs text-gray-400">
        <span>🔒</span>
        Your information will be shared with the tutor.
      </p>
    </div>
  );
};

export default ApplySection;
