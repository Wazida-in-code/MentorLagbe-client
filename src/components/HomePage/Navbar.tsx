"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { MenuIcon, XIcon, LogOutIcon } from "lucide-react";
import { authClient } from "@/lib/auth-client";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Browse Tuitions", href: "/browse-tuition" },
  { name: "Pro Plans", href: "/pricing" },
  { name: "About", href: "/about" },
];

const roleBadgeClasses: Record<string, string> = {
  student: "bg-[#EDE9FE] text-[#5B21B6]",
  tutor: "bg-green-100 text-green-700",
  admin: "bg-amber-100 text-amber-700",
};

function roleBadge(role?: string | null) {
  const key = (role ?? "student").toLowerCase();
  return {
    label: key.charAt(0).toUpperCase() + key.slice(1),
    className: roleBadgeClasses[key] ?? "bg-gray-100 text-gray-600",
  };
}

function UserAvatar({ name, image }: { name: string; image?: string | null }) {
  if (image) {
    return (
      <Image
        src={image}
        alt={name}
        width={32}
        height={32}
        className="h-8 w-8 shrink-0 rounded-full object-cover"
      />
    );
  }
  return (
    <span
      aria-hidden="true"
      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#6D28D9] text-sm font-semibold text-white"
    >
      {name.trim().charAt(0).toUpperCase() || "?"}
    </span>
  );
}

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [signingOut, setSigningOut] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  // null until the session request settles — renders the signed-out navbar.
  const { data: session, refetch } = authClient.useSession();

  const user = session?.user;
  const badge = user ? roleBadge(user.role) : null;
  const role = user?.role;
  const dashboardHref = role === "tutor" || role === "admin" ? `/dashboard/${role}` : "/dashboard/student";

  async function handleSignOut() {
    if (signingOut) return;
    setSigningOut(true);
    const { error } = await authClient.signOut();
    // Re-read the session so the navbar flips back to Sign In / Sign Up.
    await refetch();
    setSigningOut(false);
    if (error) {
      toast.error(error.message || "Sign out failed. Please try again.");
      return;
    }
    setIsMenuOpen(false);
    // Refresh first, then announce it.
    router.refresh();
    toast.success("Signed out successfully!");
  }

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
          {user && badge ? (
            <>
              <Link
                href={dashboardHref}
                className="whitespace-nowrap rounded-lg px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100 hover:text-[#6D28D9]"
              >
                Dashboard
              </Link>
              <a
                href="#"
                onClick={(e) => e.preventDefault()}
                className="whitespace-nowrap rounded-lg px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100 hover:text-[#6D28D9]"
              >
                Update Profile
              </a>
              {/* Signed in: avatar, name, role badge */}
              <div className="flex items-center gap-2">
                <UserAvatar name={user.name} image={user.image} />
                {/* Name joins from xl up — at lg it would overflow the bar. */}
                <span
                  title={user.name}
                  className="hidden max-w-[10rem] truncate text-sm font-semibold text-[#2E1065] xl:inline"
                >
                  {user.name}
                </span>
                <span
                  className={`shrink-0 rounded-full px-2 py-0.5 text-[11px] font-semibold ${badge.className}`}
                >
                  {badge.label}
                </span>
              </div>

              <button
                type="button"
                onClick={handleSignOut}
                disabled={signingOut}
                className="flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full border border-[#C4B5FD] bg-white px-4 py-2 text-sm font-semibold text-[#6D28D9] transition-colors hover:bg-[#F5F3FF] disabled:opacity-60"
              >
                <LogOutIcon className="h-4 w-4" />
                {signingOut ? "Signing out..." : "Sign Out"}
              </button>
            </>
          ) : (
            <>
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
            </>
          )}
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

          {/* Auth area: account details + sign out when signed in,
              Sign Up / Sign In buttons otherwise */}
          {user && badge ? (
            <div className="mt-3 flex flex-col gap-1">
              <div className="flex items-center gap-2 rounded-lg bg-white px-3 py-2">
                <UserAvatar name={user.name} image={user.image} />
                <span className="min-w-0 truncate text-sm font-semibold text-[#2E1065]">
                  {user.name}
                </span>
                <span
                  className={`shrink-0 rounded-full px-2 py-0.5 text-[11px] font-semibold ${badge.className}`}
                >
                  {badge.label}
                </span>
              </div>

              {/* Dashboard goes to this user's role route; Update Profile
                  stays a placeholder until its page exists. */}
              <Link
                href={dashboardHref}
                onClick={() => setIsMenuOpen(false)}
                className="rounded-lg px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100 hover:text-[#6D28D9]"
              >
                Dashboard
              </Link>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setIsMenuOpen(false);
                }}
                className="rounded-lg px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100 hover:text-[#6D28D9]"
              >
                Update Profile
              </a>

              <button
                type="button"
                onClick={handleSignOut}
                disabled={signingOut}
                className="mt-1 flex items-center justify-center gap-1.5 rounded-full border border-[#C4B5FD] bg-white px-4 py-2 text-sm font-semibold text-[#6D28D9] transition-colors hover:bg-[#F5F3FF] disabled:opacity-60"
              >
                <LogOutIcon className="h-4 w-4" />
                {signingOut ? "Signing out..." : "Sign Out"}
              </button>
            </div>
          ) : (
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
          )}
        </div>
      )}
    </header>
  );
}
