
import type { ReactNode } from "react";
import Link from "next/link";
import { headers } from "next/headers";
import { notFound } from "next/navigation";

import {
  ArrowLeftIcon,
  BookOpenIcon,
  CalendarDaysIcon,
  FileTextIcon,
  GraduationCapIcon,
  HomeIcon,
  InfoIcon,
  MailIcon,
  MapPinIcon,
  TriangleAlertIcon,
  WalletIcon,
  WifiIcon,
} from "lucide-react";

import { auth } from "@/lib/auth";
import { getTuitionById } from "@/lib/tutionsApi/addTution";
import { TuitionType } from "@/lib/tutionFormData";


import { Badge } from "@/components/ui/badge";
import BannerImage from "@/components/ExtraActivityPages/BannerImage";
import ApplySection from "@/components/ExtraActivityPages/ApplySection";
// import ApplySection from "@/components/TuitionDetails/ApplySection";

// Reusable information card
function InfoTile({
  icon,
  label,
  value,
  highlight = false,
}: {
  icon: ReactNode;
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={`rounded-xl border p-4 ${
        highlight
          ? "border-[#6D28D9] bg-[#6D28D9]"
          : "border-[#E9DDFB] bg-[#F5F3FF]/60"
      }`}
    >
      <div
        className={`flex items-center gap-2 text-xs font-semibold ${
          highlight ? "text-purple-200" : "text-[#6D28D9]"
        }`}
      >
        {icon}
        <span>{label}</span>
      </div>

      <p
        className={`mt-2 text-sm font-bold ${
          highlight ? "text-white" : "text-[#2E1065]"
        }`}
      >
        {value}
      </p>
    </div>
  );
}

// Get tuition status
function getStatus(tuition: TuitionType) {
  if (!tuition.isActive) {
    return {
      label: "Inactive",
      className: "bg-gray-100 text-gray-600",
    };
  }

  if (tuition.approvalStatus === "approved") {
    return {
      label: "Available Now",
      className: "bg-green-100 text-green-700",
    };
  }

  if (tuition.approvalStatus === "pending") {
    return {
      label: "Pending Review",
      className: "bg-amber-100 text-amber-700",
    };
  }

  return {
    label: "Rejected",
    className: "bg-red-100 text-red-700",
  };
}

export default async function TuitionDetailsPage({params}: {params: Promise<{ id: string }>}) {
  const { id } = await params;

  // Find the selected tuition
  let tuition;
  try {
    tuition = await getTuitionById(id);
  } catch {
    return (
      <div className="mx-auto max-w-6xl px-4 py-8">
        <div className="rounded-2xl border bg-white p-10 text-center shadow-sm">
          <TriangleAlertIcon className="mx-auto h-10 w-10 text-red-500" />

          <h1 className="mt-4 text-lg font-bold text-[#2E1065]">
            Couldn&apos;t load this tuition
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Something went wrong. Please try again.
          </p>

          <Link
            href={`/browse-tuition/${id}`}
            className="mt-5 inline-block rounded-xl bg-[#6D28D9] px-6 py-2.5 text-sm font-semibold text-white"
          >
            Try Again
          </Link>
        </div>
      </div>
    );
  }

  if (!tuition) {
    notFound();
  }

  // Get logged-in user information
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const role = session?.user?.role ?? null;

 
  // Prepare tuition information
  const status = getStatus(tuition);
  const isOnline = tuition.mode === "Online";

  const postedOn = new Date(
    String(tuition.createdAt)
  ).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      {/* Back link */}
      <Link
        href="/browse-tuition"
        className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#6D28D9] hover:underline"
      >
        <ArrowLeftIcon className="h-4 w-4" />
        Back to tuitions
      </Link>

      {/* Banner and tuition title */}
      <div className="relative mt-4">
        <div className="h-56 overflow-hidden rounded-2xl bg-[#F5F3FF] md:h-80">
          <BannerImage
            src={tuition.bannerImage}
            alt={tuition.title}
          />
        </div>

        <div className="relative -mt-12 rounded-2xl border border-[#E9DDFB] bg-white p-6 shadow-lg">
          {/* Tuition badges */}
          <div className="flex flex-wrap gap-2">
            <Badge className="bg-[#EDE9FE] text-[#5B21B6]">
              {tuition.subject}
            </Badge>

            <Badge variant="outline">
              {tuition.classLevel}
            </Badge>

            <Badge
              className={
                isOnline
                  ? "bg-green-500 text-white"
                  : "bg-[#6D28D9] text-white"
              }
            >
              {tuition.mode}
            </Badge>

            <Badge className={status.className}>
              {status.label}
            </Badge>
          </div>

          <h1 className="mt-3 text-2xl font-extrabold leading-tight text-[#2E1065] md:text-4xl">
            {tuition.title}
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Posted on {postedOn} • by {tuition.tutorName}
          </p>
        </div>
      </div>

      {/* Main content */}
      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        {/* Left side */}
        <div className="space-y-6 lg:col-span-2">

          {/* Tuition information */}
          <div className="rounded-2xl border border-[#E9DDFB] bg-white p-6 shadow-sm">
            <h2 className="flex items-center gap-2 text-lg font-bold text-[#2E1065]">
              <InfoIcon className="h-5 w-5 text-[#6D28D9]" />
              Tuition Information
            </h2>

            <div className="mt-5 grid grid-cols-2 gap-4 md:grid-cols-3">
              <InfoTile
                icon={<BookOpenIcon className="h-4 w-4" />}
                label="Subject"
                value={tuition.subject}
              />

              <InfoTile
                icon={<GraduationCapIcon className="h-4 w-4" />}
                label="Class Level"
                value={tuition.classLevel}
              />

              <InfoTile
                icon={<CalendarDaysIcon className="h-4 w-4" />}
                label="Schedule"
                value={`${tuition.daysPerWeek} days per week`}
              />

              <InfoTile
                icon={<MapPinIcon className="h-4 w-4" />}
                label="Location"
                value={tuition.location || (isOnline ? "Online" : "Not specified")}
              />

              <InfoTile
                icon={
                  isOnline
                    ? <WifiIcon className="h-4 w-4" />
                    : <HomeIcon className="h-4 w-4" />
                }
                label="Tuition Mode"
                value={tuition.mode}
              />

              <InfoTile
                highlight
                icon={<WalletIcon className="h-4 w-4" />}
                label="Monthly Fee"
                value={`৳${tuition.monthlyFee} / month`}
              />
            </div>
          </div>

          {/* Description */}
          <div className="rounded-2xl border border-[#E9DDFB] bg-white p-6 shadow-sm">
            <h2 className="flex items-center gap-2 text-lg font-bold text-[#2E1065]">
              <FileTextIcon className="h-5 w-5 text-[#6D28D9]" />
              Description
            </h2>

            <p className="mt-4 whitespace-pre-line text-sm leading-7 text-gray-600">
              {tuition.description}
            </p>
          </div>
        </div>

        {/* Right sidebar */}
        <div className="space-y-6 lg:sticky lg:top-6 lg:self-start">

          {/* Tutor information */}
          <div className="rounded-2xl border border-[#E9DDFB] bg-white p-6 shadow-sm">
            <h2 className="text-sm font-bold uppercase tracking-wide text-[#6D28D9]">
              About the Tutor
            </h2>

            <div className="mt-4 flex items-center gap-4">
              <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#6D28D9] text-xl font-bold text-white">
                {tuition.tutorName.charAt(0).toUpperCase()}
              </span>

              <div className="min-w-0">
                <p className="truncate font-bold text-[#2E1065]">
                  {tuition.tutorName}
                </p>

                <a
                  href={`mailto:${tuition.tutorEmail}`}
                  className="mt-0.5 flex items-center gap-1.5 text-sm text-[#6D28D9] hover:underline"
                >
                  <MailIcon className="h-4 w-4 shrink-0" />
                  <span className="truncate">
                    {tuition.tutorEmail}
                  </span>
                </a>
              </div>
            </div>

            <p className="mt-4 border-t border-[#F3EEFB] pt-4 text-xs text-gray-500">
              Contact the tutor directly by email about this tuition.
            </p>
          </div>

          <ApplySection tuition={tuition} />

        </div>
      </div>
    </div>
  );
}
