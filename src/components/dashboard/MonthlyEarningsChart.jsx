"use client";

import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export default function MonthlyEarningsChart({ data }) {
  return (
    <div className="h-80 rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-5">
        <h2 className="text-base font-bold text-slate-950">Monthly Earnings</h2>
        <p className="mt-1 text-sm text-slate-500">
          Successful booking payments from the last 12 months.
        </p>
      </div>
      <ResponsiveContainer height="80%" width="100%">
        <LineChart data={data} margin={{ left: 0, right: 16, top: 8, bottom: 0 }}>
          <CartesianGrid stroke="#e2e8f0" strokeDasharray="4 4" />
          <XAxis dataKey="month" stroke="#64748b" tickLine={false} />
          <YAxis
            stroke="#64748b"
            tickFormatter={(value) => `$${value}`}
            tickLine={false}
            width={64}
          />
          <Tooltip
            formatter={(value) => [`$${value}`, "Earnings"]}
            labelClassName="font-semibold text-slate-950"
          />
          <Line
            activeDot={{ r: 6 }}
            dataKey="earnings"
            dot={{ r: 3 }}
            stroke="#0f766e"
            strokeWidth={3}
            type="monotone"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
