import { CalendarDaysIcon, MapPinIcon, WalletIcon } from "lucide-react";
import Link from "next/link";
import BannerImage from "./BannerImage";
import { TuitionType } from "@/lib/tutionFormData";

export default function TuitionCard({ tuition }: { tuition: TuitionType }) {
  const isOnline = tuition.mode === "Online";

  return (
    <div className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[#E9DDFB] bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-[#C4B5FD] hover:shadow-xl hover:shadow-purple-100/60">

      {/* Banner Image */}
      <div className="relative h-48 overflow-hidden bg-[#F5F3FF]">
        <BannerImage
          src={tuition.bannerImage}
          alt={tuition.title}
        />

        {/* Mode Badge */}
        <span
          className={`absolute right-4 top-4 rounded-full px-4 py-1.5 text-xs font-semibold shadow-md ${
            isOnline
              ? "bg-green-500 text-white hover:bg-green-500"
              : "bg-[#6D28D9] text-white hover:bg-[#6D28D9]"
          }`}
        >
          {isOnline ? "● Online" : "● Offline"}
        </span>

        {/* Image Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#2E1065]/20 to-transparent pointer-events-none" />
      </div>

      {/* Card Content */}
      <div className="flex flex-1 flex-col p-5">

        {/* Subject and Class */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-[#EDE9FE] px-3 py-1 text-[#6D28D9] hover:bg-[#EDE9FE]">
            {tuition.subject}
          </span>

          <span className="rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-amber-700">
            {tuition.classLevel}
          </span>
        </div>

        {/* Title */}
        <h2 className="mt-4 line-clamp-2 text-xl font-bold leading-snug text-[#2E1065] transition-colors group-hover:text-[#6D28D9]">
          {tuition.title}
        </h2>

        {/* Description */}
        <p className="mt-2 line-clamp-2 text-sm leading-6 text-gray-500">
          {tuition.description}
        </p>

        {/* Tuition Information */}
        <div className="mt-5 space-y-3 rounded-xl bg-[#FAF8FF] p-4">

          <div className="flex items-center gap-3 text-sm text-gray-600">
            <MapPinIcon className="h-4 w-4 shrink-0 text-[#8B5CF6]" />
            <span className="line-clamp-1">
              {tuition.location || "Location not specified"}
            </span>
          </div>

          <div className="flex items-center gap-3 text-sm text-gray-600">
            <CalendarDaysIcon className="h-4 w-4 shrink-0 text-[#8B5CF6]" />
            <span>{tuition.daysPerWeek} Days / Week</span>
          </div>

          <div className="flex items-center gap-3 text-sm text-gray-600">
            <WalletIcon className="h-4 w-4 shrink-0 text-[#8B5CF6]" />
            <span className="font-bold text-[#6D28D9]">
              ৳{tuition.monthlyFee}
              <span className="ml-1 font-normal text-gray-500">
                / month
              </span>
            </span>
          </div>
        </div>

        {/* Details Button */}
        <div className="mt-auto pt-5">
          <Link
            href={`/browse-tuition/${tuition._id}`}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#6D28D9] py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-[#5B21B6] hover:shadow-lg hover:shadow-purple-200"
          >
            View Details
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
