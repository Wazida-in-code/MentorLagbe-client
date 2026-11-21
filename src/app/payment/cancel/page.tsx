
import Link from "next/link";
import { XCircle, ArrowLeft, CreditCard } from "lucide-react";

export default function PaymentCancelPage() {
  return (
    <main className="flex min-h-[70vh] items-center justify-center bg-[#FAF8FF] px-4 py-10">
      <div className="w-full max-w-md rounded-2xl border border-[#E7DDFB] bg-white p-7 text-center shadow-sm">

        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-50 text-red-500">
          <XCircle size={30} />
        </div>

        <h1 className="mt-5 text-2xl font-bold text-[#302448]">
          Payment Cancelled
        </h1>

        <p className="mt-3 text-sm leading-6 text-gray-500">
          Your payment was not completed. No worries!
          You can return and try again whenever you&apos;re ready.
        </p>

        <Link
          href="/pricing"
          className="mt-7 flex w-full items-center justify-center gap-2 rounded-xl bg-[#8060C8] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#6D4FB2]"
        >
          <CreditCard size={17} />
          Try Again
        </Link>

        <Link
          href="/"
          className="mt-4 inline-flex items-center gap-2 text-sm text-gray-500 hover:text-[#8060C8]"
        >
          <ArrowLeft size={15} />
          Back to Home
        </Link>

      </div>
    </main>
  );
}
