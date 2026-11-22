
import React from "react";
import { TuitionType } from "@/lib/tutionFormData";
import { sixTuitions } from "@/lib/tutionsApi/addTution";
import Link from "next/link";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";

const SixTuitions = async () => {
  const tuitions = await sixTuitions();

  return (
    <section className="w-full overflow-hidden py-12 sm:py-16 lg:py-20">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Section Heading */}
        <div className="mb-8 text-center sm:mb-10">
          <h2 className="text-2xl font-bold leading-tight text-[#292044] sm:text-3xl md:text-4xl">
            Explore Latest Tuitions
          </h2>

          <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-gray-500 sm:text-base">
            Find the perfect teaching opportunity for you.
          </p>
        </div>

        {/* Tuition Cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6">

          {tuitions.map((tuition: TuitionType) => (
            <div
              key={tuition._id}
              className="flex min-w-0 flex-col rounded-2xl border border-[#E9DDFB] bg-purple-50 p-4 shadow-sm transition-all duration-300 hover:shadow-md sm:p-5 lg:p-6 lg:hover:-translate-y-1"
            >

              {/* Subject & Class */}
              <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
                <span className="max-w-full break-words rounded-full bg-[#F3EDFF] px-3 py-1 text-xs font-medium text-[#8B5CF6] sm:text-sm">
                  {tuition.subject}
                </span>

                <span className="text-xs text-gray-500 sm:text-sm">
                  {tuition.classLevel}
                </span>
              </div>

              {/* Title */}
              <h3 className="mb-2 break-words text-lg font-bold text-[#292044] sm:text-xl">
                {tuition.title}
              </h3>

              {/* Description */}
              <p className="mb-4 line-clamp-2 break-words text-sm leading-relaxed text-gray-500">
                {tuition.description}
              </p>

              {/* Tuition Information */}
              <div className="space-y-3 text-sm text-gray-600">
                <p className="flex min-w-0 items-start gap-2 break-words">
                  <span>📍</span>
                  <span>{tuition.location}</span>
                </p>

                <p className="flex items-center gap-2">
                  <span>🕒</span>
                  <span>{tuition.daysPerWeek} Days / Week</span>
                </p>

                <p className="flex items-center gap-2">
                  <span>💰</span>
                  <span>৳{tuition.monthlyFee}</span>
                </p>
              </div>

              {/* View Details */}
              <div className="mt-auto pt-5">
                <div className="border-t border-[#E9DDFB] pt-4">
                  <Link
                    href={`/browse-tuition/${tuition._id}`}
                    className="block w-full rounded-xl bg-[#6D28D9] px-4 py-3 text-center text-sm font-semibold text-white transition-colors duration-300 hover:bg-[#5B21B6]"
                  >
                    View Details
                  </Link>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* See More Button */}
        <div className="mt-8 flex justify-center sm:mt-10">
          <Link href="/browse-tuition" className="w-full sm:w-auto">
            <Button className="w-full rounded-xl bg-[#9563E9] px-7 py-5 text-sm font-semibold text-white shadow-md shadow-purple-200 transition-all duration-300 hover:bg-[#7C4DCE] sm:py-6 sm:text-base lg:hover:-translate-y-1 lg:hover:shadow-lg">
              See More
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>

      </div>
    </section>
  );
};

export default SixTuitions;
