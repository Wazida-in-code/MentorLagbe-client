
import Link from "next/link";
import {
  CheckCircle2,
  ArrowRight,
  Sparkles,
  GraduationCap,
  ShieldCheck,
} from "lucide-react";


import { stripe } from '@/lib/stripe';
import { redirect } from 'next/navigation'

export default async function PaymentSuccessPage({ searchParams }:{
  searchParams: Promise<{session_id?:string}>}) {
  const { session_id } = await searchParams

  if (!session_id)
    throw new Error('Please provide a valid session_id (`cs_test_...`)')

  const {
    status,
    payment_status,
    customer_email,
    metadata,
    payment_intent,
  } = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ['line_items', 'payment_intent']
  })

  if (status === 'open') {
    return redirect('/')
  }

  if (status === 'complete' && payment_status === "paid") {
    console.log({status, payment_status,
    customer_email,
    metadata,
    payment_intent,});
    return (
          <main className="flex min-h-[75vh] items-center justify-center bg-[#FAF8FF] px-4 py-10">
      <div className="w-full max-w-md overflow-hidden rounded-2xl border border-[#E7DDFB] bg-white shadow-sm">

        {/* Success Header */}
        <div className="bg-gradient-to-r from-[#8060C8] to-[#A58AE8] px-6 py-7 text-center text-white">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-white/20">
            <CheckCircle2 size={38} />
          </div>

          <div className="mt-4 flex items-center justify-center gap-2 text-sm text-purple-100">
            <Sparkles size={15} />
            Payment Completed
          </div>

          <h1 className="mt-2 text-2xl font-bold">
            You&apos;re Now a Pro Member!
          </h1>

          <p className="mt-2 text-sm text-purple-100">
            Welcome to MentorLagbe Pro. Your journey just got better!
          </p>
        </div>

        {/* Success Content */}
        <div className="p-6 text-center">

          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-[#F0EAFE] text-[#8060C8]">
            <GraduationCap size={26} />
          </div>

          <h2 className="mt-4 text-lg font-bold text-[#302448]">
            Thank you for choosing MentorLagbe!
          </h2>

          <p className="mt-2 text-sm leading-6 text-gray-500">
            Your payment was successful. You can now enjoy your
            Pro membership and explore more opportunities.
          </p>

          {/* Membership Info */}
          <div className="mt-6 rounded-xl bg-[#FAF8FF] p-4 text-left">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">
                Membership
              </span>
              <span className="rounded-full bg-[#EEE7FF] px-3 py-1 text-xs font-semibold text-[#8060C8]">
                Pro Member
              </span>
            </div>

            <div className="mt-3 flex items-center justify-between">
              <span className="text-sm text-gray-500">
                Plan
              </span>
              <span className="text-sm font-semibold text-[#302448]">
                MentorLagbe Pro
              </span>
            </div>
          </div>

          {/* Dashboard Button */}
          <Link
            href="/dashboard/student"
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-[#8060C8] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#6D4FB2]"
          >
            Go to Dashboard
            <ArrowRight size={17} />
          </Link>

          <Link
            href="/"
            className="mt-4 inline-block text-sm text-gray-500 transition hover:text-[#8060C8]"
          >
            Back to Home
          </Link>

          <div className="mt-6 flex items-center justify-center gap-1.5 text-xs text-gray-400">
            <ShieldCheck size={14} className="text-green-600" />
            Thank you for being part of MentorLagbe
          </div>
        </div>
      </div>
    </main>
    )
  }
}