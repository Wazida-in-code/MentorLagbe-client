import Link from "next/link";
import {
  CalendarDaysIcon,
  MapPinIcon,
  SearchXIcon,
  TriangleAlertIcon,
  WalletIcon,
} from "lucide-react";
import { getTuition } from "@/lib/tutionsApi/addTution";
import { TuitionType } from "@/lib/tutionFormData";
import { Badge } from "@/components/ui/badge";
import TuitionControls from "@/components/ExtraActivityPages/TuitionControls";
import BannerImage from "@/components/ExtraActivityPages/BannerImage";

// One tuition card — a plain function so it is easy to read top to bottom.
function TuitionCard({ tuition }: { tuition: TuitionType }) {
  const isOnline = tuition.mode === "Online";

  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl border border-[#E9DDFB] bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg">
      {/* Banner */}
      <div className="relative h-44 w-full overflow-hidden bg-[#F5F3FF]">
        <BannerImage src={tuition.bannerImage} alt={tuition.title} />
        <Badge
          className={`absolute right-3 top-3 h-auto px-3 py-1 text-xs font-bold shadow-sm ${
            isOnline
              ? "bg-green-500 text-white hover:bg-green-500"
              : "bg-[#6D28D9] text-white hover:bg-[#6D28D9]"
          }`}
        >
          {tuition.mode}
        </Badge>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-5">
        <div className="flex flex-wrap gap-2">
          <Badge className="bg-[#EDE9FE] text-[#5B21B6] hover:bg-[#EDE9FE]">
            {tuition.subject}
          </Badge>
          <Badge
            variant="outline"
            className="border-amber-200 text-amber-700"
          >
            {tuition.classLevel}
          </Badge>
        </div>

        <h2 className="mt-3 line-clamp-2 text-base font-bold text-[#2E1065]">
          {tuition.title}
        </h2>

        {/* Facts */}
        <div className="mt-3 space-y-2 text-sm text-gray-600">
          <p className="flex items-center gap-2">
            <MapPinIcon className="h-4 w-4 shrink-0 text-[#6D28D9]" />
            {tuition.location || "Location not specified"}
          </p>
          <p className="flex items-center gap-2">
            <WalletIcon className="h-4 w-4 shrink-0 text-[#6D28D9]" />
            <span className="font-bold text-[#6D28D9]">
              ৳{tuition.monthlyFee}
            </span>
            <span className="text-gray-400">/ month</span>
          </p>
          <p className="flex items-center gap-2">
            <CalendarDaysIcon className="h-4 w-4 shrink-0 text-[#6D28D9]" />
            {tuition.daysPerWeek} days per week
          </p>
        </div>

        {/* Button pushed to the bottom of the card */}
        <Link
          href={`/tuitions/${tuition._id}`}
          className="mt-5 block rounded-xl bg-[#6D28D9] py-2.5 text-center text-sm font-semibold text-white transition-all hover:bg-[#5B21B6]"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}

export default async function BrowseTuitionPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const currentParams = await searchParams;
  const urlParams = new URLSearchParams(
    currentParams as Record<string, string>
  );

  const search = (urlParams.get("search") || "").toLowerCase();
  const subject = urlParams.get("subject") || "";
  const classLevel = urlParams.get("classLevel") || "";
  const mode = urlParams.get("mode") || "";

  // Fetch from your existing backend — no new API endpoint.
  let tuitions: TuitionType[] = [];
  let fetchError = false;

  try {
    const data = await getTuition(urlParams.toString());
    if (Array.isArray(data)) {
      tuitions = data;
    } else {
      fetchError = true;
    }
  } catch {
    fetchError = true;
  }

  const visibleTuitions = tuitions.filter((tuition) => {
    if (tuition.approvalStatus !== "approved" || tuition.isActive !== true) {
      return false;
    }
    if (subject && tuition.subject !== subject) return false;
    if (classLevel && tuition.classLevel !== classLevel) return false;
    if (mode && tuition.mode !== mode) return false;
    if (
      search &&
      !tuition.title.toLowerCase().includes(search) &&
      !tuition.subject.toLowerCase().includes(search)
    ) {
      return false;
    }
    return true;
  });

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      {/* Heading */}
      <div className="text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-[#E9DDFB] bg-white px-4 py-1.5 text-xs font-semibold text-[#6D28D9] shadow-sm">
          Browse Tuitions
        </span>
        <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-[#2E1065] md:text-5xl">
          Find Your{" "}
          <span className="bg-gradient-to-r from-[#6D28D9] to-[#A78BFA] bg-clip-text text-transparent">
            Perfect Tuition
          </span>
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-gray-500 md:text-base">
          Discover tuition opportunities that match your subjects, class level
          and schedule — search, filter, and find the right match in seconds.
        </p>
      </div>

      <div className="mt-8">
        <TuitionControls key={urlParams.toString()} />
      </div>

      {/* Results / error / empty states */}
      {fetchError ? (
        <div className="mt-10 rounded-2xl border border-red-100 bg-white p-10 text-center shadow-sm">
          <TriangleAlertIcon className="mx-auto h-10 w-10 text-red-500" />
          <h2 className="mt-4 text-lg font-bold text-[#2E1065]">
            Couldn&apos;t load tuitions
          </h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-gray-500">
            Something went wrong while fetching the list. Please try again in a
            moment.
          </p>
          <Link
            href="/browse-tuition"
            className="mt-5 inline-block rounded-xl bg-[#6D28D9] px-6 py-2.5 text-sm font-semibold text-white transition-all hover:bg-[#5B21B6]"
          >
            Try Again
          </Link>
        </div>
      ) : visibleTuitions.length === 0 ? (
        <div className="mt-10 rounded-2xl border border-[#E9DDFB] bg-white p-10 text-center shadow-sm">
          <SearchXIcon className="mx-auto h-10 w-10 text-[#6D28D9]" />
          <h2 className="mt-4 text-lg font-bold text-[#2E1065]">
            No tuitions found
          </h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-gray-500">
            We couldn&apos;t find any tuition posts matching your search. Try
            different words or clear the filters.
          </p>
          <Link
            href="/browse-tuition"
            className="mt-5 inline-block rounded-xl bg-[#6D28D9] px-6 py-2.5 text-sm font-semibold text-white transition-all hover:bg-[#5B21B6]"
          >
            Clear Filters
          </Link>
        </div>
      ) : (
        <>
          <p className="mt-6 text-sm text-gray-500">
            Showing {visibleTuitions.length} tuition{" "}
            {visibleTuitions.length === 1 ? "post" : "posts"}
          </p>
          <div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {visibleTuitions.map((tuition) => (
              <TuitionCard key={tuition._id} tuition={tuition} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
