"use client";

import { useState } from "react";
import { BookOpenIcon } from "lucide-react";

export default function BannerImage({
  src,
  alt,
}: {
  src?: string;
  alt: string;
}) {
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#EDE9FE] to-[#DDD6FE]">
        <BookOpenIcon className="h-10 w-10 text-[#6D28D9]" />
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element -- banners can be hosted on any site (imgbb, etc.)
    <img
      src={src}
      alt={alt}
      onError={() => setFailed(true)}
      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
    />
  );
}
