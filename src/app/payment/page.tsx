import Navbar from "@/components/HomePage/Navbar";
import { getSession } from "@/lib/server";
import {
  Check,
  ShieldCheck,
  CreditCard,
  ArrowRight,
  GraduationCap,
  Sparkles,
} from "lucide-react";
import { redirect } from "next/navigation";

export default async function PricingPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { canceled } = await searchParams;
  if (canceled) {
    redirect("/payment/cancel");
  }

  const session = await getSession();

  if (!session) {
    redirect("/sign-in");
  }

  const role = session.user.role;

  const isTutor = role === "tutor";

  const price = isTutor ? 15 : 10;

  const features = isTutor
  ? [
      "Post unlimited tuition opportunities",
      "Manage your tuition applications",
      "Get noticed by more students",
      "Priority profile visibility",
      "Dedicated tutor dashboard",
    ]
  : [
      "Access premium student features",
      "Apply for more tuition opportunities",
      "Connect with more tutors",
      "Priority application visibility",
      "Dedicated student dashboard",
    ];

  return (
    <div>
      <Navbar />
    <main className="min-h-screen bg-[#FAF8FF] px-4 py-10 sm:py-12">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-7 text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#EEE7FF] px-3 py-1.5 text-xs font-semibold text-[#8060C8]">
            <Sparkles size={13} />
            Upgrade Your Experience
          </span>

          <h1 className="mt-3 text-2xl font-bold text-[#29213D] sm:text-3xl">
            MentorLagbe Pro
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Unlock more opportunities and grow your tutoring career.
          </p>
        </div>

        {/* Pricing Card */}
        <div className="mx-auto max-w-lg overflow-hidden rounded-2xl border border-[#E7DDFB] bg-white shadow-sm">
          {/* Card Header */}
          <div className="flex items-center justify-between bg-gradient-to-r from-[#8060C8] to-[#A58AE8] px-6 py-5 text-white">
            <div>
              <p className="text-xs font-medium text-purple-100">
                PREMIUM MEMBERSHIP
              </p>
              <h2 className="mt-1 text-xl font-bold">Pro Plan</h2>
            </div>

            <GraduationCap size={30} />
          </div>

          <div className="p-6">
            {/* Price */}
            <p className="text-xs font-medium text-gray-500">
              {isTutor ? "Tutor Membership" : "Student Membership"}
            </p>

            <div className="mt-1 flex items-baseline gap-1.5">
              <span className="text-4xl font-extrabold text-[#302448]">
                ${price}
              </span>
              <span className="text-sm text-gray-500">/ month</span>
            </div>

            <div className="my-5 border-t border-[#EEEAF5]" />

            {/* Features */}
            <h3 className="mb-3 text-sm font-bold text-[#302448]">
              What&apos;s included?
            </h3>

            <div className="space-y-2.5">
              {features.map((feature) => (
                <div key={feature} className="flex items-center gap-2.5">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#F0EAFE] text-[#8060C8]">
                    <Check size={12} strokeWidth={3} />
                  </span>
                  <span className="text-xs text-gray-600 sm:text-sm">
                    {feature}
                  </span>
                </div>
              ))}
            </div>

            {/* Payment Summary */}
            <div className="mt-6 rounded-xl bg-[#FAF8FF] p-4">
              <h3 className="mb-3 text-sm font-semibold text-[#302448]">
                Payment Summary
              </h3>

              <div className="flex justify-between text-xs text-gray-500">
                <span>Pro Membership (1 month)</span>
                <span>${price}</span>
              </div>

              <div className="my-3 border-t border-dashed border-[#DED4F0]" />

              <div className="flex justify-between text-sm font-bold text-[#302448]">
                <span>Total Payable</span>
                <span>${price}</span>
              </div>
            </div>

            {/* Pay Button */}
            <form action="/api/checkout_sessions" method="POST">
              <section>
                <button
                  type="submit"
                  role="link"
                  className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-[#8060C8] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#6D4FB2]"
                >
                  <CreditCard size={17} />
                  Checkout
                  <ArrowRight size={16} />
                </button>
              </section>
            </form>

            {/* Secure Payment */}
            <div className="mt-4 flex items-center justify-center gap-1.5 text-[11px] text-gray-400">
              <ShieldCheck size={14} className="text-green-600" />
              Secure payment powered by Stripe (coming soon)
            </div>
          </div>
        </div>

        <p className="mt-5 text-center text-xs text-gray-400">
          Need help? Contact MentorLagbe support.
        </p>
      </div>
    </main>
    </div>
  );
}
