"use client";

import type { FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { SearchIcon, XIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// The filter choices for the dropdowns.
const subjects = [
  "Mathematics",
  "Physics",
  "Chemistry",
  "Biology",
  "English",
  "ICT",
  "Science",
];
const classLevels = [
  "Class 6",
  "Class 7",
  "Class 8",
  "Class 9",
  "Class 10",
  "Class 11-12",
];
const modes = ["Online", "Offline"];

// "all" only exists inside the dropdown — it means "no filter".
const ALL = "all";

export default function TuitionControls() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const search = searchParams.get("search") ?? "";
  const subject = searchParams.get("subject") ?? "";
  const classLevel = searchParams.get("classLevel") ?? "";
  const mode = searchParams.get("mode") ?? "";

  // Change one query parameter while keeping all the others as they are.
  function goTo(changes: Record<string, string>) {
    const params = new URLSearchParams(searchParams.toString());

    for (const key of Object.keys(changes)) {
      if (changes[key]) {
        params.set(key, changes[key]); // pick a new value
      } else {
        params.delete(key); // empty value = remove the filter
      }
    }

    const query = params.toString();
    router.push(query ? `/browse-tuition?${query}` : "/browse-tuition");
  }

  function handleSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const value = formData.get("search")?.toString().trim() ?? "";
    goTo({ search: value });
  }

  return (
    <div className="rounded-2xl border border-[#E9DDFB] bg-white p-5 shadow-sm">
      {/* Search bar */}
      <form onSubmit={handleSearch} className="relative">
        <SearchIcon className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        <Input
          name="search"
          defaultValue={search}
          placeholder="Search by tuition title or subject..."
          className="h-12 rounded-xl border-[#E9DDFB] bg-[#F5F3FF]/50 pl-11 pr-32 text-sm text-[#2E1065] placeholder:text-gray-400"
        />
        <Button
          type="submit"
          className="absolute right-2 top-1/2 h-9 -translate-y-1/2 rounded-xl bg-[#6D28D9] px-5 font-semibold text-white hover:bg-[#5B21B6]"
        >
          Search
        </Button>
      </form>

      {/* Filter dropdowns */}
      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <Select
          value={subject || ALL}
          onValueChange={(value) =>
            goTo({ subject: value && value !== ALL ? value : "" })
          }
        >
          {/* h-11! forces our height past the component's built-in h-8 */}
          <SelectTrigger
            aria-label="Filter by subject"
            className="h-11! w-full rounded-xl border-[#E9DDFB] bg-[#F5F3FF]/50 text-sm text-[#2E1065]"
          >
            <SelectValue>
              {(value) => (value === ALL ? "All Subjects" : value)}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={ALL}>All Subjects</SelectItem>
            {subjects.map((item) => (
              <SelectItem key={item} value={item}>
                {item}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={classLevel || ALL}
          onValueChange={(value) =>
            goTo({ classLevel: value && value !== ALL ? value : "" })
          }
        >
          <SelectTrigger
            aria-label="Filter by class level"
            className="h-11! w-full rounded-xl border-[#E9DDFB] bg-[#F5F3FF]/50 text-sm text-[#2E1065]"
          >
            <SelectValue>
              {(value) => (value === ALL ? "All Class Levels" : value)}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={ALL}>All Class Levels</SelectItem>
            {classLevels.map((item) => (
              <SelectItem key={item} value={item}>
                {item}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={mode || ALL}
          onValueChange={(value) =>
            goTo({ mode: value && value !== ALL ? value : "" })
          }
        >
          <SelectTrigger
            aria-label="Filter by mode"
            className="h-11! w-full rounded-xl border-[#E9DDFB] bg-[#F5F3FF]/50 text-sm text-[#2E1065]"
          >
            <SelectValue>
              {(value) => (value === ALL ? "All Modes" : value)}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={ALL}>All Modes</SelectItem>
            {modes.map((item) => (
              <SelectItem key={item} value={item}>
                {item}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Clear filters */}
      <Button
        type="button"
        variant="ghost"
        onClick={() => router.push("/browse-tuition")}
        className="mt-4 gap-1.5 text-[#6D28D9] hover:text-[#5B21B6]"
      >
        <XIcon className="h-4 w-4" />
        Clear Filters
      </Button>
    </div>
  );
}
