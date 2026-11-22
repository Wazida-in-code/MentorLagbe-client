
import { getTransaction } from "@/lib/transaction";
import { TransactionType } from "@/lib/tutionFormData";
import {
  CreditCard,
  ReceiptText,
  Users,
  CheckCircle2,
  ArrowUpRight,
  CalendarDays,
  Crown,
} from "lucide-react";

const TransactionsPage = async () => {
  const res = await getTransaction();
  const transactions:TransactionType[] = Array.isArray(res) ? res : [];

  const totalAmount = transactions.reduce(
    (total, item) => total + Number(item.amount || 0),
    0
  );

  const totalPaid = transactions.filter(
    (item) => item.payment_status === "paid"
  ).length;

  return (
    <main className="min-h-screen bg-slate-50/70 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl space-y-7">

        {/* Header */}
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <p className="text-sm font-semibold tracking-wider text-indigo-600">
              FINANCE MANAGEMENT
            </p>
            <h1 className="mt-2 text-2xl font-bold text-slate-900 sm:text-3xl">
              Transactions
            </h1>
            <p className="mt-2 text-sm text-slate-500">
              Manage and monitor all subscription payments.
            </p>
          </div>

          <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-600 shadow-sm">
            <CalendarDays size={17} className="text-indigo-500" />
            Payment History
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-slate-500">
                Total Transactions
              </p>
              <div className="rounded-xl bg-indigo-50 p-3 text-indigo-600">
                <ReceiptText size={21} />
              </div>
            </div>
            <h2 className="mt-4 text-3xl font-bold text-slate-900">
              {transactions.length}
            </h2>
            <p className="mt-1 text-xs text-slate-400">
              All subscription records
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-slate-500">
                Total Revenue
              </p>
              <div className="rounded-xl bg-emerald-50 p-3 text-emerald-600">
                <CreditCard size={21} />
              </div>
            </div>
            <h2 className="mt-4 text-3xl font-bold text-slate-900">
              ৳{totalAmount.toLocaleString("en-BD")}
            </h2>
            <p className="mt-1 text-xs text-slate-400">
              Recorded payment amount
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-slate-500">
                Successful Payments
              </p>
              <div className="rounded-xl bg-purple-50 p-3 text-purple-600">
                <Users size={21} />
              </div>
            </div>
            <h2 className="mt-4 text-3xl font-bold text-slate-900">
              {totalPaid}
            </h2>
            <p className="mt-1 text-xs text-slate-400">
              Successfully paid transactions
            </p>
          </div>
        </div>

        {/* Transactions Table */}
        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

          <div className="flex flex-col justify-between gap-2 border-b border-slate-100 p-5 sm:flex-row sm:items-center">
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                All Transactions
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                A complete overview of subscription payments.
              </p>
            </div>

            <span className="w-fit rounded-full bg-indigo-50 px-3 py-1.5 text-xs font-semibold text-indigo-600">
              {transactions.length} Records
            </span>
          </div>

          {transactions.length === 0 ? (
            <div className="flex flex-col items-center justify-center px-5 py-20 text-center">
              <div className="rounded-2xl bg-slate-100 p-4 text-slate-400">
                <ReceiptText size={32} />
              </div>
              <h3 className="mt-4 font-semibold text-slate-800">
                No transactions yet
              </h3>
              <p className="mt-1 text-sm text-slate-500">
                Payment records will appear here.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[1050px] text-left">
                <thead>
                  <tr className="bg-slate-50 text-xs font-semibold uppercase tracking-wider text-slate-500">
                    <th className="px-5 py-4">User Information</th>
                    <th className="px-5 py-4">Role</th>
                    <th className="px-5 py-4">Plan</th>
                    <th className="px-5 py-4">Amount</th>
                    <th className="px-5 py-4">Transaction ID</th>
                    <th className="px-5 py-4">Payment Date</th>
                    <th className="px-5 py-4">Status</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100">
                  {transactions.map((item) => (
                    <tr
                      key={item._id}
                      className="transition-colors hover:bg-slate-50/80"
                    >
                      {/* User */}
                      <td className="px-5 py-5">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-sm font-bold uppercase text-indigo-700">
                            {item.userName?.charAt(0) || "U"}
                          </div>
                          <div>
                            <p className="font-semibold text-slate-800">
                              {item.userName}
                            </p>
                            <p className="mt-1 text-xs text-slate-500">
                              {item.customer_email}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Role */}
                      <td className="px-5 py-5">
                        <span className="rounded-lg bg-blue-50 px-3 py-1.5 text-xs font-semibold capitalize text-blue-700">
                          {item.userRole}
                        </span>
                      </td>

                      {/* Plan */}
                      <td className="px-5 py-5">
                        <div className="flex items-center gap-2">
                          <Crown size={16} className="text-amber-500" />
                          <span className="font-medium capitalize text-slate-700">
                            {item.userPlan}
                          </span>
                        </div>
                      </td>

                      {/* Amount */}
                      <td className="px-5 py-5">
                        <span className="font-bold text-slate-900">
                          ৳{Number(item.amount).toLocaleString("en-BD")}
                        </span>
                      </td>

                      {/* Transaction ID */}
                      <td className="px-5 py-5">
                        <div className="flex items-center gap-2">
                          <span
                            title={item.payment_intent}
                            className="max-w-[145px] truncate rounded-md bg-slate-100 px-2 py-1 font-mono text-xs text-slate-600"
                          >
                            {item.payment_intent}
                          </span>
                          <ArrowUpRight
                            size={14}
                            className="shrink-0 text-slate-400"
                          />
                        </div>
                      </td>

                      {/* Date */}
                      <td className="px-5 py-5">
                        <p className="text-sm font-medium text-slate-700">
                          {item.payment_date
                            ? new Date(item.payment_date).toLocaleDateString(
                                "en-BD",
                                {
                                  day: "2-digit",
                                  month: "short",
                                  year: "numeric",
                                }
                              )
                            : "N/A"}
                        </p>
                        <p className="mt-1 text-xs text-slate-400">
                          {item.payment_date
                            ? new Date(item.payment_date).toLocaleTimeString(
                                "en-BD",
                                {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                }
                              )
                            : ""}
                        </p>
                      </td>

                      {/* Status */}
                      <td className="px-5 py-5">
                        {item.payment_status === "paid" ? (
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700">
                            <CheckCircle2 size={14} />
                            Paid
                          </span>
                        ) : (
                          <span className="rounded-full bg-amber-50 px-3 py-1.5 text-xs font-semibold capitalize text-amber-700">
                            {item.payment_status || "Pending"}
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        <p className="text-center text-xs text-slate-400">
          Showing all available subscription payment records.
        </p>

      </div>
    </main>
  );
};

export default TransactionsPage;
