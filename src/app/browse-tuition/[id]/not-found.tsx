import Link from "next/link";
import { SearchXIcon } from "lucide-react";

// Friendly page for invalid ids or tuitions that don't exist.
export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-lg flex-col items-center justify-center px-4 py-16 text-center">
      <span className="flex h-16 w-16 items-center justify-center rounded-full bg-[#F5F3FF]">
        <SearchXIcon className="h-8 w-8 text-[#6D28D9]" />
      </span>
      <h1 className="mt-5 text-2xl font-bold text-[#2E1065]">
        Tuition not found
      </h1>
      <p className="mt-2 text-sm text-gray-500">
        This tuition doesn&apos;t exist, was removed, or the link is wrong.
      </p>
      <Link
        href="/browse-tuition"
        className="mt-6 rounded-xl bg-[#6D28D9] px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-[#5B21B6]"
      >
        Browse Tuitions
      </Link>
    </div>
  );
}
