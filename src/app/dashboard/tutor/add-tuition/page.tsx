"use client";
import Link from "next/link";
import { PlusIcon } from "lucide-react";
import { toast } from "sonner";
import { useState, type ChangeEvent, type FormEvent } from "react";
import { createTution } from "@/lib/tutionsApi/addTution";
import { useRouter } from "next/navigation";
import { TuitionDataType } from "@/lib/tutionFormData";

const inputClass =
  "w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-[#2E1065] placeholder:text-gray-400 focus:border-[#6D28D9] focus:outline-none focus:ring-2 focus:ring-[#6D28D9]/20";

export default function AddTuitionPage() {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState("");
  const router = useRouter();

  async function handleImageChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0] ?? null;
    setImageFile(file);

    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    const imgbbApi = `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`;

    const res = await fetch(imgbbApi, {
      method: "POST",
      body: formData,
    });

    const result = await res.json();
    console.log(result);
    setImageUrl(result?.data?.url ?? "");
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    console.log(data);
    if (!data.title || data.title.toString().trim().length < 10) {
      toast.error("Please write a title of at least 10 characters.");
      return;
    }
    if (!data.subject) {
      toast.error("Please enter the subject.");
      return;
    }
    if (!data.classLevel) {
      toast.error("Please choose a class level.");
      return;
    }
    if (!data.monthlyFee || Number(data.monthlyFee) <= 0) {
      toast.error("Please enter a valid monthly fee.");
      return;
    }
    const days = Number(data.daysPerWeek);
    if (!data.daysPerWeek || days < 1 || days > 7) {
      toast.error("Days per week must be between 1 and 7.");
      return;
    }
    if (!data.description || data.description.toString().trim().length < 20) {
      toast.error("Please write at least 20 characters about the tuition.");
      return;
    }
    if (!data.tutorName) {
      toast.error("Please enter your name.");
      return;
    }
    if (imageFile && !imageUrl) {
      toast.error("Please wait for the image to upload.");
      return;
    }
    if (!data.tutorEmail || !data.tutorEmail.toString().includes("@")) {
      toast.error("Please enter a valid email address.");
      return;
    }
    const tuition: TuitionDataType = {
      title: data.title.toString(),
      subject: data.subject.toString(),
      classLevel: data.classLevel.toString(),
      mode: data.mode.toString(),
      location: data.location.toString(),
      monthlyFee: Number(data.monthlyFee),
      daysPerWeek: days,
      bannerImage: imageUrl,
      description: data.description.toString(),
      tutorName: data.tutorName.toString(),
      tutorEmail: data.tutorEmail.toString(),
    };

    const result = await createTution(tuition);
    console.log("New tuition:", result);
    if (result.insertedId) {
      toast.success("Tuition Added Successfully!");
    } else {
      toast.error("Failed to add the tuition");
    }
    router.push("/dashboard/tutor/my-tuitions");
  }

  return (
    <div className="mx-auto max-w-3xl">
      {/* Back link */}
      <Link
        href="/dashboard/tutor"
        className="mb-4 inline-flex items-center gap-1 text-sm font-semibold text-[#6D28D9] hover:underline"
      >
        ← Back to dashboard
      </Link>

      {/* Page heading */}
      <h1 className="text-2xl font-bold text-[#2E1065] md:text-3xl">
        Post a New Tuition
      </h1>
      <p className="mt-1 text-sm text-[#6B7280]">
        Fill in the details below — we will review your post before it becomes
        visible to students.
      </p>

      <form
        onSubmit={handleSubmit}
        noValidate
        className="mt-6 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-[0_4px_24px_rgba(109,40,217,0.07)]"
      >
        <div className="h-1.5 w-full bg-gradient-to-r from-[#6D28D9] via-[#A78BFA] to-[#C4B5FD]" />

        <div className="space-y-8 p-5 md:p-8">
          <section>
            <h2 className="text-sm font-bold uppercase tracking-wide text-[#6D28D9]">
              ✍️ The Basics
            </h2>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <div className="md:col-span-2">
                <label
                  htmlFor="title"
                  className="mb-1.5 block text-sm font-semibold text-[#2E1065]"
                >
                  Title <span className="text-red-500">*</span>
                </label>
                <input
                  id="title"
                  name="title"
                  type="text"
                  placeholder="e.g. Expert Math Tutor for Class 9-10 — Dhanmondi"
                  className={inputClass}
                />
              </div>
              <div>
                <label
                  htmlFor="subject"
                  className="mb-1.5 block text-sm font-semibold text-[#2E1065]"
                >
                  Subject <span className="text-red-500">*</span>
                </label>
                <input
                  id="subject"
                  name="subject"
                  type="text"
                  placeholder="e.g. Mathematics"
                  className={inputClass}
                />
              </div>
              <div>
                <label
                  htmlFor="classLevel"
                  className="mb-1.5 block text-sm font-semibold text-[#2E1065]"
                >
                  Class Level <span className="text-red-500">*</span>
                </label>
                <select
                  id="classLevel"
                  name="classLevel"
                  defaultValue=""
                  className={inputClass}
                >
                  <option value="" disabled>
                    Choose a level
                  </option>
                  <option value="Class 6">Class 6</option>
                  <option value="Class 7">Class 7</option>
                  <option value="Class 8">Class 8</option>
                  <option value="Class 9">Class 9</option>
                  <option value="Class 10">Class 10</option>
                  <option value="SSC">SSC</option>
                  <option value="HSC">HSC</option>
                  <option value="Admission">Admission</option>
                </select>
              </div>
            </div>
          </section>
          <section>
            <h2 className="text-sm font-bold uppercase tracking-wide text-[#6D28D9]">
              👤 Tutor Information
            </h2>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <div>
                <label
                  htmlFor="tutorName"
                  className="mb-1.5 block text-sm font-semibold text-[#2E1065]"
                >
                  Tutor Name <span className="text-red-500">*</span>
                </label>
                <input
                  id="tutorName"
                  name="tutorName"
                  type="text"
                  placeholder="Your full name"
                  className={inputClass}
                />
              </div>
              <div>
                <label
                  htmlFor="tutorEmail"
                  className="mb-1.5 block text-sm font-semibold text-[#2E1065]"
                >
                  Tutor Email <span className="text-red-500">*</span>
                </label>
                <input
                  id="tutorEmail"
                  name="tutorEmail"
                  type="email"
                  placeholder="you@example.com"
                  className={inputClass}
                />
              </div>
            </div>
            <p className="mt-2 text-xs text-[#6B7280]">
              Students will contact you through this email.
            </p>
          </section>
          <section>
            <h2 className="text-sm font-bold uppercase tracking-wide text-[#6D28D9]">
              📍 Mode &amp; Location
            </h2>
            <div className="mt-4 grid grid-cols-2 gap-3">
              <label className="cursor-pointer">
                <input
                  type="radio"
                  name="mode"
                  value="Online"
                  defaultChecked
                  className="peer sr-only"
                />
                <div className="rounded-xl border-2 border-gray-200 bg-white p-4 text-center transition peer-checked:border-[#6D28D9] peer-checked:bg-[#F5F3FF] peer-focus-visible:ring-2 peer-focus-visible:ring-[#6D28D9]/40">
                  <span className="text-xl">💻</span>
                  <span className="mt-1 block text-sm font-semibold text-[#2E1065]">
                    Online
                  </span>
                  <span className="mt-0.5 block text-xs text-[#6B7280]">
                    Video call / Zoom
                  </span>
                </div>
              </label>
              <label className="cursor-pointer">
                <input
                  type="radio"
                  name="mode"
                  value="Offline"
                  className="peer sr-only"
                />
                <div className="rounded-xl border-2 border-gray-200 bg-white p-4 text-center transition peer-checked:border-[#6D28D9] peer-checked:bg-[#F5F3FF] peer-focus-visible:ring-2 peer-focus-visible:ring-[#6D28D9]/40">
                  <span className="text-xl">🏠</span>
                  <span className="mt-1 block text-sm font-semibold text-[#2E1065]">
                    Offline
                  </span>
                  <span className="mt-0.5 block text-xs text-[#6B7280]">
                    In person
                  </span>
                </div>
              </label>
            </div>
            <div className="mt-4">
              <label
                htmlFor="location"
                className="mb-1.5 block text-sm font-semibold text-[#2E1065]"
              >
                Location
              </label>
              <input
                id="location"
                name="location"
                type="text"
                placeholder="e.g. Dhanmondi, Dhaka (not needed for online)"
                className={inputClass}
              />
            </div>
          </section>
          <section>
            <h2 className="text-sm font-bold uppercase tracking-wide text-[#6D28D9]">
              💰 Fee &amp; Schedule
            </h2>
            <div className="mt-4 grid gap-4 md:grid-cols-3">
              {/* Monthly Fee */}
              <div>
                <label
                  htmlFor="monthlyFee"
                  className="mb-1.5 block text-sm font-semibold text-[#2E1065]"
                >
                  Monthly Fee <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm font-bold text-[#6D28D9]">
                    ৳
                  </span>
                  <input
                    id="monthlyFee"
                    name="monthlyFee"
                    type="number"
                    min="0"
                    placeholder="5000"
                    className={`${inputClass} pl-9`}
                  />
                </div>
              </div>

              {/* Days Per Week */}
              <div>
                <label
                  htmlFor="daysPerWeek"
                  className="mb-1.5 block text-sm font-semibold text-[#2E1065]"
                >
                  Days Per Week <span className="text-red-500">*</span>
                </label>
                <input
                  id="daysPerWeek"
                  name="daysPerWeek"
                  type="number"
                  min="1"
                  max="7"
                  placeholder="2"
                  className={inputClass}
                />
              </div>

              {/* Banner Image */}
              <div>
                <label
                  htmlFor="bannerImage"
                  className="mb-1.5 block text-sm font-semibold text-[#2E1065]"
                >
                  Banner Image
                </label>
                <input
                  id="bannerImage"
                  name="bannerImage"
                  type="file"
                  accept="image/*"
                  className="block w-full cursor-pointer rounded-xl border-2 border-dashed border-[#C4B5FD] bg-[#F5F3FF]/50 px-3 py-3 text-sm text-transparent hover:border-[#6D28D9] file:mr-2 file:cursor-pointer file:rounded-full file:border-0 file:bg-[#6D28D9] file:px-3 file:py-2 file:text-xs file:font-semibold file:text-white"
                  onChange={handleImageChange}
                />
                <span className="mt-1 block max-w-full truncate text-sm text-muted-foreground">
                  {imageFile ? imageFile.name : "No image selected"}
                </span>
              </div>
            </div>
          </section>
          <section>
            <h2 className="text-sm font-bold uppercase tracking-wide mb-5 text-[#6D28D9]">
              🖼️ Description
            </h2>
            <div>
              <div>
                <textarea
                  id="description"
                  name="description"
                  rows={5}
                  placeholder="Tell students what you cover, your teaching style, your experience…"
                  className={`${inputClass} resize-y`}
                />
              </div>
            </div>
          </section>
        </div>
        <div className="flex flex-col gap-3 border-t border-gray-100 bg-[#F5F3FF]/60 px-5 py-4 sm:flex-row sm:items-center sm:justify-end md:px-8">
          <button
            type="submit"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#6D28D9] to-[#7C3AED] px-7 py-3 text-sm font-bold text-white shadow-md shadow-[#6D28D9]/30 transition hover:from-[#5B21B6] hover:to-[#6D28D9]"
          >
            <PlusIcon className="h-4 w-4" />
            Submit for review
          </button>
        </div>
      </form>
    </div>
  );
}
