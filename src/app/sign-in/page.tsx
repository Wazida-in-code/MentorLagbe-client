"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { toast } from "sonner";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// One message slot per field, filled in during validation.
type FormErrors = {
  email?: string;
  password?: string;
};

export default function SignInPage() {
  const router = useRouter();

  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  // Toggle for the password visibility eye
  const [showPassword, setShowPassword] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    // Collect every form value in one step.
    const formData = new FormData(event.currentTarget);
    const { email, password } = Object.fromEntries(formData.entries()) as {
      email: string;
      password: string;
    };

    // Simple client-side validation before talking to the server.
    const newErrors: FormErrors = {};
    if (!email.trim()) {
      newErrors.email = "Please enter your email address.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      newErrors.email = "Please enter a valid email address.";
    }
    if (!password) {
      newErrors.password = "Please enter your password.";
    } else if (password.length < 8) {
      // Better Auth's minimum password length is 8 characters.
      newErrors.password = "Password must be at least 8 characters long.";
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    // Check the credentials with Better Auth. On success it sets the
    // session cookie, so the redirect lands on a signed-in home page.
    setSubmitting(true);
    const { error } = await authClient.signIn.email({
      email: email.trim(),
      password,
    });
    setSubmitting(false);

    // Server-side problems (wrong email/password, rate limit, network)
    // are shown as a toast.
    if (error) {
      toast.error(error.message || "Sign in failed. Please try again.");
      return;
    }

    toast.success("Signed in successfully!");
    router.push("/");
  }

  return (
    <main className="flex min-h-full items-center justify-center bg-[#F5F3FF] px-4 py-12 sm:px-6">
      <div className="w-full max-w-md rounded-xl border border-[#C4B5FD]/40 bg-white p-6 shadow-sm sm:p-8">
        {/* Brand logo */}
        <div className="flex justify-center">
          <Image
            src="/logo.png"
            alt="MentorLagbe"
            width={2055}
            height={765}
            className="h-10 w-auto"
          />
        </div>

        <h1 className="mt-6 text-center text-2xl font-bold text-[#2E1065]">
          Welcome back
        </h1>
        <p className="mt-2 text-center text-sm text-[#6B7280]">
          Sign in to your MentorLagbe account.
        </p>

        <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-5">
          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              autoComplete="email"
              aria-invalid={!!errors.email}
              className="h-10"
            />
            {errors.email && (
              <p className="text-sm text-destructive">{errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Your password"
                autoComplete="current-password"
                aria-invalid={!!errors.password}
                className="h-10 pr-10"
              />
              {/* Eye button: shows/hides the password.
                  type="button" keeps it from submitting the form. */}
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="absolute inset-y-0 right-0 flex cursor-pointer items-center px-3 text-[#6B7280] transition-colors hover:text-[#2E1065]"
              >
                {showPassword ? (
                  <EyeOffIcon className="size-4" />
                ) : (
                  <EyeIcon className="size-4" />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="text-sm text-destructive">{errors.password}</p>
            )}
          </div>

          <Button
            type="submit"
            disabled={submitting}
            className="h-11 w-full rounded-full bg-[#6D28D9] text-sm font-semibold text-white hover:bg-[#5B21B6]"
          >
            {submitting ? "Signing in..." : "Sign In"}
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-[#6B7280]">
          Don&apos;t have an account?{" "}
          <Link
            href="/sign-up"
            className="font-semibold text-[#6D28D9] hover:underline"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </main>
  );
}
