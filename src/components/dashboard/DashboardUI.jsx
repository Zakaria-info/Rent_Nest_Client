import Link from "next/link";
import { Button } from "@heroui/react";
import ArrowRight from "@gravity-ui/icons/ArrowRight";

export function DashboardPageShell({ title, description, actions, children }) {
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 text-slate-950">
      <section className="mx-auto flex max-w-7xl flex-col gap-6">
        <header className="flex flex-col gap-4 rounded-lg border border-slate-200 bg-white p-6 shadow-sm md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-normal md:text-3xl">
              {title}
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
              {description}
            </p>
          </div>
          {actions ? <div className="flex flex-wrap gap-2">{actions}</div> : null}
        </header>
        {children}
      </section>
    </main>
  );
}

export function DashboardNav({ links }) {
  return (
    <nav className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {links.map((link) => (
        <Link
          className="group flex items-center justify-between rounded-lg border border-slate-200 bg-white p-4 text-sm font-semibold text-slate-800 shadow-sm transition hover:border-teal-300 hover:text-teal-700"
          href={link.href}
          key={link.href}
        >
          <span>{link.label}</span>
          <ArrowRight className="size-4 transition group-hover:translate-x-0.5" />
        </Link>
      ))}
    </nav>
  );
}

export function DataTable({ columns, rows, emptyText = "No records found." }) {
  return (
    <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
          <thead className="bg-slate-100 text-xs font-bold uppercase tracking-normal text-slate-600">
            <tr>
              {columns.map((column) => (
                <th className="whitespace-nowrap px-4 py-3" key={column.key}>
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {rows.length ? (
              rows.map((row) => (
                <tr className="align-top" key={row.id}>
                  {columns.map((column) => (
                    <td className="whitespace-nowrap px-4 py-4 text-slate-700" key={column.key}>
                      {column.render ? column.render(row) : row[column.key]}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td className="px-4 py-8 text-center text-slate-500" colSpan={columns.length}>
                  {emptyText}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function StatusBadge({ status }) {
  const styles = {
    Approved: "bg-emerald-50 text-emerald-700 ring-emerald-200",
    Confirmed: "bg-emerald-50 text-emerald-700 ring-emerald-200",
    Paid: "bg-emerald-50 text-emerald-700 ring-emerald-200",
    Successful: "bg-emerald-50 text-emerald-700 ring-emerald-200",
    Pending: "bg-amber-50 text-amber-700 ring-amber-200",
    Unpaid: "bg-amber-50 text-amber-700 ring-amber-200",
    Rejected: "bg-rose-50 text-rose-700 ring-rose-200",
    Active: "bg-sky-50 text-sky-700 ring-sky-200",
  };

  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${
        styles[status] || "bg-slate-100 text-slate-700 ring-slate-200"
      }`}
    >
      {status}
    </span>
  );
}

export function SummaryCard({ icon: Icon, label, value }) {
  return (
    <article className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-4 grid size-11 place-items-center rounded-lg bg-teal-50 text-teal-700">
        <Icon className="size-5" />
      </div>
      <p className="text-sm font-semibold text-slate-500">{label}</p>
      <p className="mt-2 text-2xl font-bold text-slate-950">{value}</p>
    </article>
  );
}

export function Field({ label, children }) {
  return (
    <label className="flex flex-col gap-2 text-sm font-semibold text-slate-700">
      {label}
      {children}
    </label>
  );
}

export function TextInput(props) {
  return (
    <input
      {...props}
      className="h-11 rounded-lg border border-slate-300 bg-white px-3 text-sm font-normal text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
    />
  );
}

export function TextArea(props) {
  return (
    <textarea
      {...props}
      className="min-h-28 rounded-lg border border-slate-300 bg-white px-3 py-3 text-sm font-normal text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
    />
  );
}

export function SelectInput({ children, ...props }) {
  return (
    <select
      {...props}
      className="h-11 rounded-lg border border-slate-300 bg-white px-3 text-sm font-normal text-slate-900 outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
    >
      {children}
    </select>
  );
}

export function ActionButton({ children, color = "default", ...props }) {
  const colors = {
    default: "border-slate-300 bg-white text-slate-700 hover:bg-slate-50",
    primary: "border-teal-600 bg-teal-600 text-white hover:bg-teal-700",
    danger: "border-rose-200 bg-rose-50 text-rose-700 hover:bg-rose-100",
    success: "border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100",
  };

  return (
    <Button
      {...props}
      className={`h-9 rounded-lg border px-3 text-xs font-semibold ${colors[color]}`}
      type={props.type || "button"}
    >
      {children}
    </Button>
  );
}
