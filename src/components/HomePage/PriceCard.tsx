
import React from "react";
import Link from "next/link";
import {
  Check,
  Sparkles,
  GraduationCap,
  BookOpen,
  Crown,
  ArrowRight,
  Zap,
  ShieldCheck,
  Star,
} from "lucide-react";

const plans = [
  {
    name: "Free Plan",
    subtitle: "A great place to start your journey",
    price: "0",
    period: "Forever",
    icon: BookOpen,
    popular: false,
    color: "from-slate-400 to-slate-500",
    button: "Get Started",
    description: "Everything you need to explore MentorLagbe.",
    features: [
      "Browse all available tuitions",
      "Apply for tuition opportunities",
      "Access personal dashboard",
      "Manage basic applications",
      "Post up to 2 tuition listings",
    ],
  },
  {
    name: "Pro Student",
    subtitle: "Unlock more learning opportunities",
    price: "10",
    period: "per month",
    icon: GraduationCap,
    popular: true,
    color: "from-violet-500 to-purple-600",
    button: "Subscribe with Stripe",
    description: "Take your tuition search to the next level.",
    features: [
      "Everything in Free",
      "Unlimited tuition applications",
      "Priority application visibility",
      "Advanced application tracking",
      "Exclusive student opportunities",
      "Premium customer support",
    ],
  },
  {
    name: "Pro Tutor",
    subtitle: "Grow your tutoring career",
    price: "15",
    period: "per month",
    icon: Crown,
    popular: false,
    color: "from-fuchsia-500 to-pink-600",
    button: "Subscribe with Stripe",
    description: "More visibility. More students. More growth.",
    features: [
      "Everything in Free",
      "Unlimited tuition listings",
      "Priority listing visibility",
      "Advanced tuition management",
      "Reach more potential students",
      "Premium customer support",
    ],
  },
];

const PriceCard = () => {
  return (
    <section className="relative w-full overflow-hidden bg-[#F8F7FF] px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
      {/* Background Decorations */}
      <div className="pointer-events-none absolute -left-32 top-20 h-72 w-72 rounded-full bg-purple-300/20 blur-[100px]" />
      <div className="pointer-events-none absolute -right-32 bottom-10 h-80 w-80 rounded-full bg-violet-300/30 blur-[110px]" />

      <div className="relative mx-auto w-full max-w-7xl">
        {/* Heading */}
        <div className="mx-auto mb-12 max-w-2xl text-center sm:mb-16">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-purple-200 bg-white px-4 py-2 text-xs font-semibold text-purple-600 shadow-sm sm:px-5 sm:text-sm">
            <Sparkles size={16} />
            Simple & Transparent Pricing
          </div>

          <h2 className="text-3xl font-extrabold tracking-tight text-[#25213B] sm:text-4xl md:text-5xl lg:text-6xl">
            Choose Your Plan,
            <span className="mt-2 block bg-gradient-to-r from-violet-600 via-purple-500 to-fuchsia-500 bg-clip-text text-transparent">
              Shape Your Future.
            </span>
          </h2>

          <p className="mt-5 text-sm leading-7 text-gray-500 sm:mt-6 sm:text-base sm:leading-8 lg:text-lg">
            Whether you&apos;re looking for the perfect tutor or growing your
            teaching career, we have a plan that fits your journey.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid w-full grid-cols-1 items-stretch gap-7 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {plans.map((plan) => {
            const Icon = plan.icon;

            return (
              <div
                key={plan.name}
                className={`group relative flex min-w-0 flex-col rounded-[2rem] border p-6 transition-all duration-500 hover:-translate-y-2 sm:p-7 lg:p-8 ${
                  plan.popular
                    ? "border-purple-400 bg-white shadow-[0_25px_70px_-15px_rgba(139,92,246,0.3)] lg:z-10 lg:scale-105"
                    : "border-purple-100 bg-white/90 shadow-[0_15px_45px_-20px_rgba(100,70,160,0.2)] hover:border-purple-300 hover:shadow-xl"
                }`}
              >
                {/* Popular Badge */}
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <div className="flex items-center gap-2 whitespace-nowrap rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-500 px-4 py-2 text-[10px] font-bold uppercase tracking-wider text-white shadow-lg shadow-purple-300 sm:px-5 sm:text-xs">
                      <Star size={13} fill="currentColor" />
                      Most Popular
                    </div>
                  </div>
                )}

                {/* Plan Icon */}
                <div
                  className={`mb-6 flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${plan.color} text-white shadow-lg transition-transform duration-300 group-hover:rotate-6 group-hover:scale-110 sm:h-14 sm:w-14`}
                >
                  <Icon size={25} />
                </div>

                <h3 className="text-xl font-bold text-[#292440] sm:text-2xl">
                  {plan.name}
                </h3>

                <p className="mt-2 min-h-12 text-sm leading-6 text-gray-500">
                  {plan.subtitle}
                </p>

                {/* Price */}
                <div className="my-6 flex flex-wrap items-end gap-2 border-b border-purple-100 pb-6 sm:my-7 sm:pb-7">
                  <span className="mb-1 text-xl font-semibold text-gray-400">
                    $
                  </span>
                  <span className="text-5xl font-extrabold tracking-tight text-[#28233F] sm:text-6xl">
                    {plan.price}
                  </span>
                  <span className="mb-2 text-xs text-gray-400 sm:text-sm">
                    / {plan.period}
                  </span>
                </div>

                <p className="mb-6 text-sm font-semibold leading-6 text-[#38314F]">
                  {plan.description}
                </p>

                {/* Features */}
                <div className="flex-1 space-y-3 sm:space-y-4">
                  {plan.features.map((feature) => (
                    <div key={feature} className="flex items-start gap-3">
                      <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-purple-100 text-purple-600">
                        <Check size={13} strokeWidth={3} />
                      </div>

                      <span className="break-words text-sm leading-6 text-gray-600">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <Link
                  href={
                    plan.name === "Free Plan"
                      ? "/sign-up"
                      : `/payment?plan=${plan.name === "Pro Student" ? "student" : "tutor"}`
                  }
                  className={`mt-8 flex w-full min-w-0 items-center justify-center gap-2 rounded-xl px-3 py-3.5 text-center text-xs font-bold transition-all duration-300 sm:mt-9 sm:px-5 sm:py-4 sm:text-sm ${
                    plan.popular
                      ? "bg-gradient-to-r from-violet-600 to-purple-600 text-white shadow-lg shadow-purple-200 hover:from-violet-700 hover:to-purple-700 hover:shadow-purple-300"
                      : "border border-purple-200 bg-purple-50 text-purple-700 hover:border-purple-500 hover:bg-purple-600 hover:text-white"
                  }`}
                >
                  {plan.button}
                  <ArrowRight size={16} className="shrink-0" />
                </Link>
              </div>
            );
          })}
        </div>

        {/* Bottom Note */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-x-6 gap-y-4 text-xs text-gray-500 sm:mt-14 sm:text-sm">
          <div className="flex items-center gap-2">
            <ShieldCheck size={18} className="shrink-0 text-purple-500" />
            Secure Stripe Payments
          </div>

          <div className="flex items-center gap-2">
            <Zap size={18} className="shrink-0 text-purple-500" />
            Upgrade Anytime
          </div>

          <div className="flex items-center gap-2">
            <Check size={18} className="shrink-0 text-purple-500" />
            Transparent Pricing
          </div>
        </div>
      </div>
    </section>
  );
};

export default PriceCard;
