"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { MenuIcon, XIcon } from "lucide-react";


const navLinks = [
  { name: "Home", href: "/" },
  { name: "Browse Tuitions", href: "/tuitions" },
  { name: "Pro Plans", href: "/pricing" },
  { name: "About", href: "/about" },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-gray-100 bg-[#F5F3FF]">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" aria-label="MentorLagbe home">
          <Image
            src="/logo.png"
            alt="MentorLagbe logo"
            width={2055}
            height={765}
            className="h-10 w-auto sm:h-12"
          />
        </Link>

        <nav className="hidden items-center gap-2 lg:flex">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-lg px-3 py-2 text-sm transition-colors ${
                  isActive
                    ? "bg-[#6D28D9]/10 font-semibold text-[#6D28D9]"
                    : "font-medium text-gray-700 hover:bg-gray-100 hover:text-[#6D28D9]"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Link
            href="/sign-up"
            className="rounded-full bg-[#6D28D9] px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#5B21B6]"
          >
            Sign Up
          </Link>
          <Link
            href="/sign-in"
            className="rounded-full bg-[#C4B5FD] px-5 py-2 text-sm font-semibold text-[#4C1D95] transition-colors hover:bg-[#B4A3FD]"
          >
            Sign In
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen}
          className="rounded-lg p-2 text-gray-700 transition-colors hover:bg-gray-100 lg:hidden"
        >
          {isMenuOpen ? (
            <XIcon className="h-6 w-6" />
          ) : (
            <MenuIcon className="h-6 w-6" />
          )}
        </button>
      </div>

      {isMenuOpen && (
        <div className="border-t border-gray-100 bg-[#F5F3FF] px-4 pb-4 pt-2 lg:hidden">
          <nav className="flex flex-col gap-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  // Close the menu after navigating
                  onClick={() => setIsMenuOpen(false)}
                  className={`rounded-lg px-3 py-2 text-sm transition-colors ${
                    isActive
                      ? "bg-[#6D28D9]/10 font-semibold text-[#6D28D9]"
                      : "font-medium text-gray-700 hover:bg-gray-100 hover:text-[#6D28D9]"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Auth buttons inside the mobile menu */}
          <div className="mt-3 flex flex-col gap-3">
            <Link
              href="/sign-up"
              onClick={() => setIsMenuOpen(false)}
              className="rounded-full bg-[#6D28D9] px-5 py-2 text-center text-sm font-semibold text-white transition-colors hover:bg-[#5B21B6]"
            >
              Sign Up
            </Link>
            <Link
              href="/sign-in"
              onClick={() => setIsMenuOpen(false)}
              className="rounded-full bg-[#C4B5FD] px-5 py-2 text-center text-sm font-semibold text-[#4C1D95] transition-colors hover:bg-[#B4A3FD]"
            >
              Sign In
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
