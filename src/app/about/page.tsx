
import Link from "next/link";
import {
  GraduationCap,
  Target,
  Heart,
  Users,
  BookOpen,
  ShieldCheck,
  Search,
  MessageCircle,
  ArrowRight,
  Sparkles,
  Lightbulb,
  Handshake,
  Rocket,
} from "lucide-react";
import Navbar from "@/components/HomePage/Navbar";

const values = [
  {
    icon: ShieldCheck,
    title: "Trust & Safety",
    description:
      "We believe every student deserves a safe and reliable learning environment. We aim to make finding the right tutor easier and more transparent.",
  },
  {
    icon: Heart,
    title: "Student First",
    description:
      "Every learner has different goals. We focus on helping students find learning opportunities that match their needs.",
  },
  {
    icon: Users,
    title: "Strong Community",
    description:
      "We bring students and tutors together to build meaningful educational connections.",
  },
  {
    icon: Lightbulb,
    title: "Continuous Growth",
    description:
      "We believe learning never stops. Our platform encourages knowledge sharing and personal development.",
  },
];

const steps = [
  {
    number: "01",
    icon: Search,
    title: "Explore Tuitions",
    description:
      "Browse available tuition opportunities and discover teaching options that match your interests.",
  },
  {
    number: "02",
    icon: MessageCircle,
    title: "Connect & Apply",
    description:
      "Find suitable opportunities and submit your application with your preferred schedule.",
  },
  {
    number: "03",
    icon: Handshake,
    title: "Find Your Match",
    description:
      "Connect with the right student or tutor and take the next step in your learning journey.",
  },
];

const benefits = [
  {
    icon: BookOpen,
    title: "Easy Tuition Discovery",
    description:
      "Explore different tuition opportunities in one convenient place.",
  },
  {
    icon: GraduationCap,
    title: "For Students & Tutors",
    description:
      "A shared platform where learners and educators can connect.",
  },
  {
    icon: ShieldCheck,
    title: "Simple Management",
    description:
      "Manage your profile, applications, and tuition activities from your dashboard.",
  },
];

export default function AboutPage() {
  return (
    <main>
      <Navbar />
      <div className="bg-white text-[#202033] overflow-hidden">

      {/* Hero Section */}
      <section className="relative bg-[#F5F3FF]">
        <div className="absolute -top-20 -right-20 w-72 h-72 bg-purple-200/40 rounded-full blur-3xl" />
        <div className="absolute bottom-0 -left-20 w-64 h-64 bg-indigo-200/40 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">

          <div className="max-w-3xl mx-auto text-center">

            <span className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2 text-sm font-semibold text-[#6D28D9] shadow-sm">
              <Sparkles size={16} />
              About MentorLagbe
            </span>

            <h1 className="mt-7 text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight">
              Connecting Dreams Through
              <span className="block text-[#6D28D9]">
                Quality Education
              </span>
            </h1>

            <p className="mt-6 text-base sm:text-lg leading-8 text-gray-600 max-w-2xl mx-auto">
              MentorLagbe is a platform designed to bring students and tutors
              together. We make discovering tuition opportunities and
              connecting with the right educators easier.
            </p>

            <div className="mt-9 flex flex-col sm:flex-row justify-center gap-4">
              <Link
                href="/browse-tuition"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#6D28D9] px-7 py-3.5 font-semibold text-white hover:bg-[#5B21B6] transition"
              >
                Explore Tuitions
                <ArrowRight size={18} />
              </Link>

              <Link
                href="/sign-up"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-purple-200 bg-white px-7 py-3.5 font-semibold text-[#6D28D9] hover:bg-purple-50 transition"
              >
                Get More Fecility
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-14 items-center">

          <div>
            <span className="text-sm font-bold uppercase tracking-widest text-[#6D28D9]">
              Who We Are
            </span>

            <h2 className="mt-4 text-3xl sm:text-4xl font-bold leading-tight">
              Making Learning Connections
              <span className="text-[#6D28D9]"> Easier Than Ever</span>
            </h2>

            <p className="mt-6 text-gray-600 leading-8">
              Finding the right tutor or the right tuition opportunity
              should not be complicated. MentorLagbe provides a place
              where students can discover available tuitions and tutors
              can explore teaching opportunities.
            </p>

            <p className="mt-4 text-gray-600 leading-8">
              Our goal is to simplify the connection between learners
              and educators through an accessible and user-friendly
              platform.
            </p>

            <div className="mt-8 flex items-start gap-4">
              <div className="p-3 rounded-xl bg-purple-100 text-[#6D28D9]">
                <GraduationCap size={28} />
              </div>

              <div>
                <h3 className="font-bold text-lg">
                  Education Without Barriers
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  Making tuition discovery and teaching opportunities
                  more accessible.
                </p>
              </div>
            </div>
          </div>

          {/* Decorative Illustration */}
          <div className="relative">
            <div className="absolute inset-0 bg-purple-100 rounded-[2rem] rotate-3" />

            <div className="relative bg-gradient-to-br from-[#6D28D9] to-[#4C1D95] rounded-[2rem] p-8 sm:p-12 text-white min-h-[330px] flex flex-col justify-center">

              <div className="absolute top-8 right-8 opacity-20">
                <Sparkles size={70} />
              </div>

              <div className="w-16 h-16 bg-white/15 rounded-2xl flex items-center justify-center mb-7">
                <GraduationCap size={38} />
              </div>

              <h3 className="text-3xl sm:text-4xl font-bold leading-tight">
                Every Great Journey
                <span className="block text-purple-200">
                  Begins With Learning.
                </span>
              </h3>

              <p className="mt-5 text-purple-100 leading-7 max-w-sm">
                Discover opportunities, share knowledge, and grow
                together with MentorLagbe.
              </p>

              <div className="mt-9 flex items-center gap-3">
                <div className="h-1 w-16 bg-white rounded-full" />
                <div className="h-1 w-8 bg-white/40 rounded-full" />
                <div className="h-1 w-8 bg-white/40 rounded-full" />
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* Mission and Vision */}
      <section className="bg-[#FAF9FF] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-sm font-bold uppercase tracking-widest text-[#6D28D9]">
              Our Purpose
            </span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-bold">
              What Drives Us Forward
            </h2>
            <p className="mt-4 text-gray-500 leading-7">
              We are focused on creating meaningful connections
              between students and educators.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-7">

            <div className="bg-white p-8 sm:p-10 rounded-3xl border border-purple-100 shadow-sm hover:shadow-lg transition">
              <div className="w-14 h-14 rounded-2xl bg-purple-100 text-[#6D28D9] flex items-center justify-center">
                <Target size={30} />
              </div>

              <h3 className="mt-6 text-2xl font-bold">Our Mission</h3>

              <p className="mt-4 text-gray-600 leading-8">
                Our mission is to simplify the process of finding
                suitable tuition opportunities and connecting students
                with educators who can support their academic goals.
              </p>
            </div>

            <div className="bg-white p-8 sm:p-10 rounded-3xl border border-purple-100 shadow-sm hover:shadow-lg transition">
              <div className="w-14 h-14 rounded-2xl bg-indigo-100 text-indigo-600 flex items-center justify-center">
                <Rocket size={30} />
              </div>

              <h3 className="mt-6 text-2xl font-bold">Our Vision</h3>

              <p className="mt-4 text-gray-600 leading-8">
                Our vision is to build an accessible learning community
                where students and tutors can discover opportunities,
                exchange knowledge, and grow together.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-sm font-bold uppercase tracking-widest text-[#6D28D9]">
              What Matters To Us
            </span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-bold">
              Our Core Values
            </h2>
            <p className="mt-4 text-gray-500 leading-7">
              The principles that guide our platform and the
              community we want to build.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value) => {
              const Icon = value.icon;

              return (
                <div
                  key={value.title}
                  className="group p-7 rounded-2xl border border-gray-100 bg-white hover:border-purple-200 hover:shadow-xl transition-all duration-300"
                >
                  <div className="w-14 h-14 rounded-2xl bg-purple-50 text-[#6D28D9] flex items-center justify-center group-hover:bg-[#6D28D9] group-hover:text-white transition">
                    <Icon size={27} />
                  </div>

                  <h3 className="mt-6 text-lg font-bold">
                    {value.title}
                  </h3>

                  <p className="mt-3 text-sm text-gray-500 leading-7">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* How It Works */}
      <section className="bg-[#F5F3FF] py-20 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-sm font-bold uppercase tracking-widest text-[#6D28D9]">
              Simple Process
            </span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-bold">
              How MentorLagbe Works
            </h2>
            <p className="mt-4 text-gray-500">
              Getting started with your learning journey is simple.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-7">
            {steps.map((step) => {
              const Icon = step.icon;

              return (
                <div
                  key={step.number}
                  className="relative bg-white p-8 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300"
                >
                  <div className="flex items-center justify-between">
                    <div className="w-14 h-14 rounded-2xl bg-purple-100 text-[#6D28D9] flex items-center justify-center">
                      <Icon size={28} />
                    </div>

                    <span className="text-4xl font-black text-purple-100">
                      {step.number}
                    </span>
                  </div>

                  <h3 className="mt-7 text-xl font-bold">
                    {step.title}
                  </h3>

                  <p className="mt-3 text-gray-500 text-sm leading-7">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* Platform Benefits */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-sm font-bold uppercase tracking-widest text-[#6D28D9]">
              Why MentorLagbe
            </span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-bold">
              One Platform, More Possibilities
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {benefits.map((benefit) => {
              const Icon = benefit.icon;

              return (
                <div
                  key={benefit.title}
                  className="text-center px-5"
                >
                  <div className="mx-auto w-16 h-16 rounded-2xl bg-purple-100 text-[#6D28D9] flex items-center justify-center">
                    <Icon size={30} />
                  </div>

                  <h3 className="mt-5 text-xl font-bold">
                    {benefit.title}
                  </h3>

                  <p className="mt-3 text-sm text-gray-500 leading-7">
                    {benefit.description}
                  </p>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* CTA */}
      <section className="px-4 sm:px-6 lg:px-8 pb-20">
        <div className="relative overflow-hidden max-w-7xl mx-auto rounded-[2rem] bg-gradient-to-r from-[#6D28D9] to-[#4C1D95] px-6 py-16 sm:px-12 text-center text-white">

          <div className="absolute -top-16 -right-10 w-64 h-64 rounded-full bg-white/10 blur-2xl" />
          <div className="absolute -bottom-24 -left-10 w-64 h-64 rounded-full bg-purple-300/20 blur-2xl" />

          <div className="relative">
            <div className="mx-auto w-14 h-14 flex items-center justify-center rounded-2xl bg-white/15">
              <GraduationCap size={32} />
            </div>

            <h2 className="mt-6 text-3xl sm:text-4xl font-bold">
              Ready to Start Your Journey?
            </h2>

            <p className="mt-4 max-w-xl mx-auto text-purple-100 leading-7">
              Whether you are looking for a tutor or searching
              for teaching opportunities, MentorLagbe is here
              to help you take the next step.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
              <Link
                href="/browse-tuition"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-7 py-3.5 font-bold text-[#6D28D9] hover:bg-purple-50 transition"
              >
                Find a Tuition
                <ArrowRight size={18} />
              </Link>

              <Link
                href="/sign-up"
                className="inline-flex items-center justify-center rounded-xl border border-white/40 px-7 py-3.5 font-semibold text-white hover:bg-white/10 transition"
              >
                Join MentorLagbe
              </Link>
            </div>
          </div>

        </div>
      </section>
      </div>
    </main>
  );
}
