"use client";

import { ChangeEvent, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { toast } from "sonner";
import { GraduationCapIcon, BookOpenIcon, ImagePlus, EyeIcon, EyeOffIcon } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "cn";

// One message slot per field, filled in during validation.
type FormErrors = {
  name?: string;
  email?: string;
  password?: string;
  image?: string;
  role?: string;
};

export default function SignUpPage() {
  const router = useRouter();

  // Which role card is picked: "" (nothing yet), "student" or "tutor".
  const [role, setRole] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [serverError, setServerError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState("");
  // Toggle for the password visibility eye
  const [showPassword, setShowPassword] = useState(false);

  async function handleImageChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0] ?? null;
    setImageFile(file);

    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    const imgbbApi = `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`;

    const res = await fetch(imgbbApi, {
      method: "POST",
      body: formData,
    });

    const result = await res.json();
    console.log(result);
    setImageUrl(result?.data?.url ?? "");
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setServerError("");

    // Collect every form value in one step (the role rides along in a hidden input).
    const formData = new FormData(event.currentTarget);
    const { name, email, password, role } = Object.fromEntries(formData.entries()) as {name: string; email: string; password: string; role: string;};

    // Simple client-side validation before talking to the server.
    const newErrors: FormErrors = {};
    if (!name.trim()) {
      newErrors.name = "Please enter your full name.";
    }
    if (!email.trim()) {
      newErrors.email = "Please enter your email address.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      newErrors.email = "Please enter a valid email address.";
    }
    if (!password) {
      newErrors.password = "Please create a password.";
    } else if (password.length < 8) {
      // Better Auth's default minimum password length is 8 characters.
      newErrors.password = "Password must be at least 8 characters long.";
    }
    if (!role) {
      newErrors.role = "Please select Student or Tutor.";
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    // Mirror the backend rule: only "tutor" or "student" is ever sent —
    // anything else (e.g. tampered input) falls back to "student".
    const selectedRole = role === "tutor" ? "tutor" : "student";

    // Register with Better Auth. The backend stores the role and always
    // sets plan to "free" — users can never pick a plan or role themselves.
    setSubmitting(true);
    const { error } = await authClient.signUp.email({
      name: name.trim(),
      email: email.trim(),
      password,
      role: selectedRole,
      // imgbb URL from handleImageChange — stored as the user's avatar
      image: imageUrl,
    });
    setSubmitting(false);

    if (error) {
      setServerError(
        error.message || "Something went wrong. Please try again.",
      );
      return;
    }

    toast.success("Account created successfully!");
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
          Create your account
        </h1>
        <p className="mt-2 text-center text-sm text-[#6B7280]">
          Join MentorLagbe as a student or tutor.
        </p>

        {/* Server-side problems (duplicate email, network issues, ...) */}
        {serverError && (
          <Alert variant="destructive" className="mt-6">
            {serverError}
          </Alert>
        )}

        <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-5">
          {/* Full name */}
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              name="name"
              type="text"
              placeholder="Your full name"
              autoComplete="name"
              aria-invalid={!!errors.name}
              className="h-10"
            />
            {errors.name && (
              <p className="text-sm text-destructive">{errors.name}</p>
            )}
          </div>

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
                placeholder="At least 8 characters"
                autoComplete="new-password"
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

          {/* Profile Image */}
          <div className="space-y-2">
            <Label htmlFor="image">Profile Image</Label>

            <div className="flex items-center gap-3">
              <Label
                htmlFor="image"
                className="flex h-10 cursor-pointer items-center gap-2 rounded-md border border-primary/30 bg-primary/10 px-4 text-sm font-medium text-primary transition hover:bg-primary/20"
              >
                <ImagePlus size={18} />
                Choose Image
              </Label>

              <Input
                id="image"
                name="image"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />

              <span className="max-w-[200px] truncate text-sm text-muted-foreground">
                {imageFile ? imageFile.name : "No image selected"}
              </span>
            </div>
          </div>

          {/* Role picker: two cards on a dark background */}
          <div className="space-y-2">
            <Label>Sign up as</Label>
            <div
              role="group"
              aria-label="Select your role"
              className="grid grid-cols-2 gap-3 rounded-xl bg-[#111827] p-3"
            >
              <button
                type="button"
                onClick={() => setRole("student")}
                aria-pressed={role === "student"}
                className={cn(
                  "flex cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border p-3 transition-all duration-200 sm:p-4",
                  role === "student"
                    ? "border-[#6D28D9] bg-[#6D28D9]/20 text-white"
                    : "border-white/10 bg-[#1F2937] text-gray-400 hover:border-white/30 hover:text-gray-200",
                )}
              >
                <GraduationCapIcon className="size-7" />
                <span className="text-sm font-semibold">Student</span>
              </button>
              <button
                type="button"
                onClick={() => setRole("tutor")}
                aria-pressed={role === "tutor"}
                className={cn(
                  "flex cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border p-3 transition-all duration-200 sm:p-4",
                  role === "tutor"
                    ? "border-[#6D28D9] bg-[#6D28D9]/20 text-white"
                    : "border-white/10 bg-[#1F2937] text-gray-400 hover:border-white/30 hover:text-gray-200",
                )}
              >
                <BookOpenIcon className="size-7" />
                <span className="text-sm font-semibold">Tutor</span>
              </button>
            </div>
            {/* The picked role travels with the rest of the form data */}
            <input type="hidden" name="role" value={role} />
            {errors.role && (
              <p className="text-sm text-destructive">{errors.role}</p>
            )}
          </div>

          <Button
            type="submit"
            disabled={submitting}
            className="h-11 w-full rounded-full bg-[#6D28D9] text-sm font-semibold text-white hover:bg-[#5B21B6]"
          >
            {submitting ? "Creating account..." : "Sign Up"}
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-[#6B7280]">
          Already have an account?{" "}
          <Link
            href="/sign-in"
            className="font-semibold text-[#6D28D9] hover:underline"
          >
            Sign In
          </Link>
        </p>
      </div>
    </main>
  );
}
