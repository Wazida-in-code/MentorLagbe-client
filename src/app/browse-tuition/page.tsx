import TuitionCard from "@/components/ExtraActivityPages/TuitionCard";
import TuitionControls from "@/components/ExtraActivityPages/TuitionControls";
import Navbar from "@/components/HomePage/Navbar";
import { TuitionType } from "@/lib/tutionFormData";
import { getBrowseTuition } from "@/lib/tutionsApi/addTution";
import { SearchXIcon, TriangleAlertIcon } from "lucide-react";
import Link from "next/link";

export default async function BrowseTuitionPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const currentParams = await searchParams;

  const page = Math.max(1, Number(currentParams.page) || 1);

  const urlParams = new URLSearchParams();

  const search = typeof currentParams.search === "string"
    ? currentParams.search
    : "";

  const subject = typeof currentParams.subject === "string"
    ? currentParams.subject
    : "";

  const classLevel = typeof currentParams.classLevel === "string"
    ? currentParams.classLevel
    : "";

  const mode = typeof currentParams.mode === "string"
    ? currentParams.mode
    : "";

  urlParams.set("page", String(page));

  if (search) urlParams.set("search", search);
  if (subject) urlParams.set("subject", subject);
  if (classLevel) urlParams.set("classLevel", classLevel);
  if (mode) urlParams.set("mode", mode);

  let tuitions: TuitionType[] = [];
  let totalPages = 0;
  let totalTuitions = 0;
  let fetchError = false;

  try {
    const data = await getBrowseTuition(urlParams.toString());

    tuitions = data.tuitions;
    totalPages = data.totalPages;
    totalTuitions = data.totalTuitions;
  } catch {
    fetchError = true;
  }

  // Keep the same heading and TuitionControls from your original page.
  return (
    <div>
      <Navbar />
      <div className="mx-auto max-w-6xl px-4 py-10">
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

      {fetchError ? (
        <div className="mt-10 rounded-2xl border border-red-100 bg-white p-10 text-center shadow-sm">
          <TriangleAlertIcon className="mx-auto h-10 w-10 text-red-500" />
          <h2 className="mt-4 text-lg font-bold text-[#2E1065]">
            Couldn&apos;t load tuitions
          </h2>
          <p className="mt-2 text-sm text-gray-500">
            Something went wrong. Please try again.
          </p>
          <Link
            href="/browse-tuition"
            className="mt-5 inline-block rounded-xl bg-[#6D28D9] px-6 py-2.5 text-sm font-semibold text-white"
          >
            Try Again
          </Link>
        </div>
      ) : tuitions.length === 0 ? (
        <div className="mt-10 rounded-2xl border border-[#E9DDFB] bg-white p-10 text-center shadow-sm">
          <SearchXIcon className="mx-auto h-10 w-10 text-[#6D28D9]" />
          <h2 className="mt-4 text-lg font-bold text-[#2E1065]">
            No tuitions found
          </h2>
          <p className="mt-2 text-sm text-gray-500">
            Try different search words or clear the filters.
          </p>
          <Link
            href="/browse-tuition"
            className="mt-5 inline-block rounded-xl bg-[#6D28D9] px-6 py-2.5 text-sm font-semibold text-white"
          >
            Clear Filters
          </Link>
        </div>
      ) : (
        <>
          <p className="mt-6 text-sm text-gray-500">
            Showing {tuitions.length} of {totalTuitions} tuition posts
          </p>

          <div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {tuitions.map((tuition) => (
              <TuitionCard key={tuition._id} tuition={tuition} />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-10 flex flex-wrap items-center justify-center gap-2">

              {/* Previous */}
              <Link
                href={{
                  pathname: "/browse-tuition",
                  query: {
                    ...Object.fromEntries(urlParams.entries()),
                    page: String(page - 1),
                  },
                }}
                aria-disabled={page === 1}
                className={`rounded-lg border px-4 py-2 text-sm font-medium ${
                  page === 1
                    ? "pointer-events-none opacity-40"
                    : "border-[#E9DDFB] text-[#6D28D9] hover:bg-[#F3EDFF]"
                }`}
              >
                Previous
              </Link>

              {/* Page numbers */}
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (pageNumber) => (
                  <Link
                    key={pageNumber}
                    href={{
                      pathname: "/browse-tuition",
                      query: {
                        ...Object.fromEntries(urlParams.entries()),
                        page: String(pageNumber),
                      },
                    }}
                    className={`rounded-lg border px-4 py-2 text-sm font-semibold ${
                      page === pageNumber
                        ? "border-[#6D28D9] bg-[#6D28D9] text-white"
                        : "border-[#E9DDFB] text-[#6D28D9] hover:bg-[#F3EDFF]"
                    }`}
                  >
                    {pageNumber}
                  </Link>
                )
              )}

              {/* Next */}
              <Link
                href={{
                  pathname: "/browse-tuition",
                  query: {
                    ...Object.fromEntries(urlParams.entries()),
                    page: String(page + 1),
                  },
                }}
                aria-disabled={page === totalPages}
                className={`rounded-lg border px-4 py-2 text-sm font-medium ${
                  page === totalPages
                    ? "pointer-events-none opacity-40"
                    : "border-[#E9DDFB] text-[#6D28D9] hover:bg-[#F3EDFF]"
                }`}
              >
                Next
              </Link>

            </div>
          )}
        </>
      )}
      </div>
    </div>
  );
}
