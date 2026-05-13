import { useMemo, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const COLORS = [
  "#2563eb",
  "#f97316",
  "#94a3b8",
  "#eab308",
  "#3b82f6",
  "#22c55e",
  "#1e3a8a",
  "#a855f7",
];

const monthlyExpense2026 = [
  {
    month: "January",
    production: 2747856956,
    tooling: 21982589,
    consumable: 80649453,
    maintenance: 12825677,
    tools: 21982589,
    services: 24043220,
    asset: 82750000,
    fabrication: 0,
    yen: 0,
    usd: 0,
  },
  {
    month: "February",
    production: 2882061733,
    tooling: 123162201,
    consumable: 79955562,
    maintenance: 6217200,
    tools: 13355540,
    services: 39668469,
    asset: 36000000,
    fabrication: 0,
    yen: 523400,
    usd: 0,
  },
  {
    month: "March",
    production: 2901871990,
    tooling: 233447904,
    consumable: 106095437,
    maintenance: 5334128,
    tools: 45900000,
    services: 3500000,
    asset: 0,
    fabrication: 0,
    yen: 688500,
    usd: 0,
  },
  {
    month: "April",
    production: 3027298585,
    tooling: 87428443,
    consumable: 179661499,
    maintenance: 14003231,
    tools: 17028970,
    services: 10066440,
    asset: 24899800,
    fabrication: 0,
    yen: 0,
    usd: 0,
  },
  {
    month: "May",
    production: 0,
    tooling: 0,
    consumable: 0,
    maintenance: 0,
    tools: 0,
    services: 0,
    asset: 0,
    fabrication: 0,
    yen: 0,
    usd: 0,
  },
  {
    month: "June",
    production: 0,
    tooling: 0,
    consumable: 0,
    maintenance: 0,
    tools: 0,
    services: 0,
    asset: 0,
    fabrication: 0,
    yen: 0,
    usd: 0,
  },
  {
    month: "July",
    production: 0,
    tooling: 0,
    consumable: 0,
    maintenance: 0,
    tools: 0,
    services: 0,
    asset: 0,
    fabrication: 0,
    yen: 0,
    usd: 0,
  },
  {
    month: "August",
    production: 0,
    tooling: 0,
    consumable: 0,
    maintenance: 0,
    tools: 0,
    services: 0,
    asset: 0,
    fabrication: 0,
    yen: 0,
    usd: 0,
  },
  {
    month: "September",
    production: 0,
    tooling: 0,
    consumable: 0,
    maintenance: 0,
    tools: 0,
    services: 0,
    asset: 0,
    fabrication: 0,
    yen: 0,
    usd: 0,
  },
  {
    month: "October",
    production: 0,
    tooling: 0,
    consumable: 0,
    maintenance: 0,
    tools: 0,
    services: 0,
    asset: 0,
    fabrication: 0,
    yen: 0,
    usd: 0,
  },
  {
    month: "November",
    production: 0,
    tooling: 0,
    consumable: 0,
    maintenance: 0,
    tools: 0,
    services: 0,
    asset: 0,
    fabrication: 0,
    yen: 0,
    usd: 0,
  },
  {
    month: "December",
    production: 0,
    tooling: 0,
    consumable: 0,
    maintenance: 0,
    tools: 0,
    services: 0,
    asset: 0,
    fabrication: 0,
    yen: 0,
    usd: 0,
  },
];

const yearlyPurchase = [
  {
    year: 2023,
    production: 33307852565,
    tooling: 1353461949,
    consumable: 1880502076,
    maintenance: 263226001,
    tools: 757827706,
    services: 2819588770,
    asset: 127734461,
    fabrication: 2250000,
    jpy: 0,
    usd: 0,
  },
  {
    year: 2024,
    production: 26122927988,
    tooling: 1323311369,
    consumable: 1056546902,
    maintenance: 174195966,
    tools: 602549176,
    services: 1072822320,
    asset: 1362960000,
    fabrication: 2852850,
    jpy: 0,
    usd: 0,
  },
  {
    year: 2025,
    production: 28295019510,
    tooling: 2410317181,
    consumable: 1327389145,
    maintenance: 148063578,
    tools: 235522293,
    services: 1231508541,
    asset: 1403773413,
    fabrication: 20566550,
    jpy: 0,
    usd: 0,
  },
  {
    year: 2026,
    production: 11559089264,
    tooling: 466021137,
    consumable: 446361951,
    maintenance: 38380236,
    tools: 98267099,
    services: 77278129,
    asset: 143649800,
    fabrication: 0,
    jpy: 1211900,
    usd: 0,
  },
];

const categoryLabels = [
  { key: "production", label: "Production / Material Press" },
  { key: "tooling", label: "Tooling Project" },
  { key: "consumable", label: "Consumable" },
  { key: "maintenance", label: "Maintenance Dies" },
  { key: "tools", label: "Tools & Spare Part" },
  { key: "services", label: "Services" },
  { key: "asset", label: "Asset" },
  { key: "fabrication", label: "Others - Fabrication" },
];

export default function PurchaseReport() {
  const [selectedYear, setSelectedYear] = useState(2026);
  const [selectedMonth, setSelectedMonth] = useState("ALL");
  const [selectedCategory, setSelectedCategory] = useState("ALL");

  const expenseData = monthlyExpense2026.map((item) => ({
    ...item,
    subtotal:
      item.production +
      item.tooling +
      item.consumable +
      item.maintenance +
      item.tools +
      item.services +
      item.asset +
      item.fabrication,
  }));

  const activeExpenseData = useMemo(() => {
    return expenseData.filter((item) => {
      return selectedMonth === "ALL" || item.month === selectedMonth;
    });
  }, [selectedMonth]);

  const totalExpense = activeExpenseData.reduce(
    (sum, item) => sum + item.subtotal,
    0
  );

  const totalYen = activeExpenseData.reduce(
    (sum, item) => sum + item.yen,
    0
  );

  const totalUsd = activeExpenseData.reduce(
    (sum, item) => sum + item.usd,
    0
  );

  const currentYearPurchase =
    yearlyPurchase.find((item) => item.year === selectedYear) ||
    yearlyPurchase[yearlyPurchase.length - 1];

  const categorySummary = categoryLabels.map((cat) => ({
    name: cat.label,
    key: cat.key,
    value: currentYearPurchase[cat.key] || 0,
  }));

  const yearlyChartData = yearlyPurchase.map((item) => ({
    year: String(item.year),
    production: item.production,
    tooling: item.tooling,
    consumable: item.consumable,
    maintenance: item.maintenance,
    tools: item.tools,
    services: item.services,
    asset: item.asset,
    fabrication: item.fabrication,
  }));

  const monthlyCategoryChart = expenseData.map((expense) => ({
    month: expense.month.slice(0, 3),
    production: expense.production,
    tooling: expense.tooling,
    consumable: expense.consumable,
    maintenance: expense.maintenance,
    tools: expense.tools,
    services: expense.services,
    asset: expense.asset,
    fabrication: expense.fabrication,
    subtotal: expense.subtotal,
  }));

  const selectedCategoryInfo =
    categoryLabels.find((item) => item.key === selectedCategory) || null;

  const selectedMonthlyCategoryTotal =
    selectedCategory === "ALL"
      ? expenseData.reduce((sum, item) => sum + item.subtotal, 0)
      : expenseData.reduce((sum, item) => sum + (item[selectedCategory] || 0), 0);

  const topCategory = categorySummary.reduce(
    (max, item) => (item.value > max.value ? item : max),
    categorySummary[0]
  );

  const formatRupiah = (value) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value || 0);
  };

  const formatNumber = (value) => {
    return new Intl.NumberFormat("id-ID").format(value || 0);
  };

  const formatShort = (value) => {
    if (!value) return "0";
    if (value >= 1_000_000_000) {
      return `${(value / 1_000_000_000).toFixed(1)} M`;
    }
    if (value >= 1_000_000) {
      return `${(value / 1_000_000).toFixed(1)} Jt`;
    }
    if (value >= 1_000) {
      return `${(value / 1_000).toFixed(1)} Rb`;
    }
    return value;
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (!active || !payload || payload.length === 0) return null;

    return (
      <div className="rounded-xl border border-gray-100 bg-white p-4 shadow-lg">
        <p className="mb-2 font-semibold text-gray-800">{label}</p>

        <div className="space-y-1">
          {payload.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between gap-6 text-sm"
            >
              <span style={{ color: item.color }}>{item.name}</span>
              <span className="font-semibold text-gray-700">
                {formatRupiah(item.value)}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const handleExport = () => {
    alert("Export Excel/PDF nanti bisa dihubungkan ke backend.");
  };

  return (
    <div className="min-h-screen bg-slate-50 p-1">
      <div className="space-y-6">
        {/* HEADER */}
        <div className="overflow-hidden rounded-3xl bg-gradient-to-r from-slate-950 via-blue-950 to-slate-900 p-6 text-white shadow-sm">
          <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-center">
            <div>
              <p className="text-sm font-medium text-blue-200">
                Report Module
              </p>

              <h1 className="mt-2 text-3xl font-bold tracking-tight">
                Purchasing Report
              </h1>

              <p className="mt-2 max-w-3xl text-sm text-slate-300">
                Ringkasan pembelian, pengeluaran bulanan, komposisi kategori,
                dan tren yearly purchase berdasarkan format kalkulasi
                purchasing.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(Number(e.target.value))}
                className="rounded-xl border border-white/10 bg-white/10 px-4 py-2 text-sm text-white outline-none backdrop-blur focus:ring-2 focus:ring-blue-300"
              >
                {yearlyPurchase.map((item) => (
                  <option
                    key={item.year}
                    value={item.year}
                    className="text-slate-900"
                  >
                    Fiscal Year {item.year}
                  </option>
                ))}
              </select>

              <button
                onClick={handleExport}
                className="rounded-xl bg-white px-4 py-2 text-sm font-semibold text-slate-900 shadow-sm transition hover:bg-blue-50"
              >
                Export Report
              </button>
            </div>
          </div>
        </div>

        {/* FILTER */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2 lg:max-w-3xl">
              {/* MONTH FILTER */}
              <div>
                <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Month
                </label>

                <select
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-700 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                >
                  <option value="ALL">All Month</option>
                  {expenseData.map((item) => (
                    <option key={item.month} value={item.month}>
                      {item.month}
                    </option>
                  ))}
                </select>
              </div>

              {/* CATEGORY FILTER */}
              <div>
                <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Chart Category
                </label>

                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-700 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                >
                  <option value="ALL">All Category</option>
                  {categoryLabels.map((item) => (
                    <option key={item.key} value={item.key}>
                      {item.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <button
              onClick={() => {
                setSelectedMonth("ALL");
                setSelectedCategory("ALL");
              }}
              className="w-full rounded-xl border border-gray-200 px-5 py-2.5 text-sm font-semibold text-gray-600 transition hover:bg-gray-50 lg:w-auto"
            >
              Reset Filter
            </button>
          </div>
        </div>

        {/* KPI CARDS */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-500">Total Expense</p>
              <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-600">
                IDR
              </span>
            </div>

            <h2 className="mt-3 text-2xl font-bold text-gray-900">
              {formatRupiah(totalExpense)}
            </h2>

            <p className="mt-2 text-xs text-gray-400">
              Total pengeluaran purchasing berdasarkan filter bulan.
            </p>
          </div>

          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-500">Total Yen</p>
              <span className="rounded-full bg-yellow-50 px-3 py-1 text-xs font-semibold text-yellow-600">
                JPY
              </span>
            </div>

            <h2 className="mt-3 text-2xl font-bold text-gray-900">
              ¥ {formatNumber(totalYen)}
            </h2>

            <p className="mt-2 text-xs text-gray-400">
              Total transaksi purchasing dalam mata uang Yen.
            </p>
          </div>

          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-500">Total USD</p>
              <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-600">
                USD
              </span>
            </div>

            <h2 className="mt-3 text-2xl font-bold text-gray-900">
              $ {formatNumber(totalUsd)}
            </h2>

            <p className="mt-2 text-xs text-gray-400">
              Total transaksi purchasing dalam mata uang USD.
            </p>
          </div>

          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-500">Top Category</p>
              <span className="rounded-full bg-orange-50 px-3 py-1 text-xs font-semibold text-orange-600">
                Highest
              </span>
            </div>

            <h2 className="mt-3 text-xl font-bold text-gray-900">
              {topCategory?.name}
            </h2>

            <p className="mt-2 text-xs text-gray-400">
              Nominal terbesar: {formatRupiah(topCategory?.value)}
            </p>
          </div>
        </div>

        {/* CHART AREA */}
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
          {/* MONTHLY CATEGORY CHART */}
          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm xl:col-span-2">
            <div className="mb-5 flex flex-col justify-between gap-4 md:flex-row md:items-start">
              <div>
                <h2 className="font-bold text-gray-800">
                  Monthly Expense by Category
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  {selectedCategory === "ALL"
                    ? "Menampilkan data pengeluaran semua kategori per bulan dalam satu tahun."
                    : `Menampilkan data ${selectedCategoryInfo?.label} dari Januari sampai Desember.`}
                </p>
              </div>

              <div className="flex flex-col items-start gap-2 md:items-end">
                <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-600">
                  {selectedCategory === "ALL"
                    ? "All Category"
                    : selectedCategoryInfo?.label}
                </span>

                <span className="text-xs text-gray-500">
                  Total Chart:{" "}
                  <b className="text-gray-800">
                    {formatRupiah(selectedMonthlyCategoryTotal)}
                  </b>
                </span>
              </div>
            </div>

            <div className="h-96 w-full">
              <ResponsiveContainer>
                <BarChart data={monthlyCategoryChart}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                  <YAxis tickFormatter={formatShort} tick={{ fontSize: 12 }} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />

                  {selectedCategory === "ALL" ? (
                    <>
                      {categoryLabels.map((item, index) => (
                        <Bar
                          key={item.key}
                          dataKey={item.key}
                          name={item.label}
                          fill={COLORS[index % COLORS.length]}
                          radius={[6, 6, 0, 0]}
                          barSize={18}
                        />
                      ))}
                    </>
                  ) : (
                    <Bar
                      dataKey={selectedCategory}
                      name={selectedCategoryInfo?.label}
                      fill={
                        COLORS[
                          categoryLabels.findIndex(
                            (item) => item.key === selectedCategory
                          ) % COLORS.length
                        ]
                      }
                      radius={[8, 8, 0, 0]}
                      barSize={42}
                    />
                  )}
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* PIE CATEGORY */}
          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <div className="mb-5">
              <h2 className="font-bold text-gray-800">
                Expense Composition
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Komposisi kategori purchase tahun {selectedYear}.
              </p>
            </div>

            <div className="h-72 w-full">
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={categorySummary}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={62}
                    outerRadius={105}
                    paddingAngle={3}
                  >
                    {categorySummary.map((_, index) => (
                      <Cell
                        key={index}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>

                  <Tooltip formatter={(value) => formatRupiah(value)} />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="mt-3 max-h-48 space-y-2 overflow-y-auto pr-1">
              {categorySummary.map((item, index) => (
                <div
                  key={item.name}
                  className="flex items-center justify-between gap-3 text-sm"
                >
                  <div className="flex items-center gap-2">
                    <span
                      className="h-3 w-3 rounded-full"
                      style={{
                        backgroundColor: COLORS[index % COLORS.length],
                      }}
                    />

                    <span className="text-gray-600">{item.name}</span>
                  </div>

                  <span className="font-semibold text-gray-800">
                    {formatShort(item.value)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* YEARLY CHART */}
        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <div className="mb-5 flex flex-col justify-between gap-3 md:flex-row md:items-center">
            <div>
              <h2 className="font-bold text-gray-800">
                Yearly Purchase Comparison
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Perbandingan purchase 2023 sampai 2026 berdasarkan kategori
                utama.
              </p>
            </div>

            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
              Fiscal Year 2023 - 2026
            </span>
          </div>

          <div className="h-96 w-full">
            <ResponsiveContainer>
              <BarChart data={yearlyChartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="year" />
                <YAxis tickFormatter={formatShort} />
                <Tooltip content={<CustomTooltip />} />
                <Legend />

                <Bar
                  dataKey="production"
                  name="Production / Material Press"
                  fill="#2563eb"
                  radius={[6, 6, 0, 0]}
                />

                <Bar
                  dataKey="tooling"
                  name="Tooling Project"
                  fill="#f97316"
                  radius={[6, 6, 0, 0]}
                />

                <Bar
                  dataKey="consumable"
                  name="Consumable"
                  fill="#94a3b8"
                  radius={[6, 6, 0, 0]}
                />

                <Bar
                  dataKey="services"
                  name="Services"
                  fill="#22c55e"
                  radius={[6, 6, 0, 0]}
                />

                <Bar
                  dataKey="asset"
                  name="Asset"
                  fill="#1e3a8a"
                  radius={[6, 6, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* DETAIL TABLES */}
        <div className="grid grid-cols-1 gap-6">
          {/* MONTHLY EXPENSE TABLE */}
          <div className="rounded-2xl border border-gray-100 bg-white shadow-sm">
            <div className="border-b border-gray-100 p-5">
              <h2 className="font-bold text-gray-800">
                Monthly Expense Detail
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Detail lengkap pengeluaran per bulan berdasarkan semua kategori purchasing.
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-slate-50 text-xs uppercase tracking-wide text-gray-500">
                  <tr>
                    <th className="whitespace-nowrap px-5 py-3 text-left">
                      Month
                    </th>
                    <th className="whitespace-nowrap px-5 py-3 text-right">
                      Production / Material Press
                    </th>
                    <th className="whitespace-nowrap px-5 py-3 text-right">
                      Tooling Project
                    </th>
                    <th className="whitespace-nowrap px-5 py-3 text-right">
                      Consumable
                    </th>
                    <th className="whitespace-nowrap px-5 py-3 text-right">
                      Maintenance Dies
                    </th>
                    <th className="whitespace-nowrap px-5 py-3 text-right">
                      Tools & Spare Part
                    </th>
                    <th className="whitespace-nowrap px-5 py-3 text-right">
                      Services
                    </th>
                    <th className="whitespace-nowrap px-5 py-3 text-right">
                      Asset
                    </th>
                    <th className="whitespace-nowrap px-5 py-3 text-right">
                      Others - Fabrication
                    </th>
                    <th className="whitespace-nowrap px-5 py-3 text-right">
                      JPY
                    </th>
                    <th className="whitespace-nowrap px-5 py-3 text-right">
                      USD
                    </th>
                    <th className="whitespace-nowrap px-5 py-3 text-right">
                      Subtotal IDR
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-100">
                  {activeExpenseData.map((item) => (
                    <tr key={item.month} className="transition hover:bg-slate-50">
                      <td className="whitespace-nowrap px-5 py-3 font-semibold text-gray-800">
                        {item.month}
                      </td>

                      <td className="whitespace-nowrap px-5 py-3 text-right text-gray-600">
                        {formatRupiah(item.production)}
                      </td>

                      <td className="whitespace-nowrap px-5 py-3 text-right text-gray-600">
                        {formatRupiah(item.tooling)}
                      </td>

                      <td className="whitespace-nowrap px-5 py-3 text-right text-gray-600">
                        {formatRupiah(item.consumable)}
                      </td>

                      <td className="whitespace-nowrap px-5 py-3 text-right text-gray-600">
                        {formatRupiah(item.maintenance)}
                      </td>

                      <td className="whitespace-nowrap px-5 py-3 text-right text-gray-600">
                        {formatRupiah(item.tools)}
                      </td>

                      <td className="whitespace-nowrap px-5 py-3 text-right text-gray-600">
                        {formatRupiah(item.services)}
                      </td>

                      <td className="whitespace-nowrap px-5 py-3 text-right text-gray-600">
                        {formatRupiah(item.asset)}
                      </td>

                      <td className="whitespace-nowrap px-5 py-3 text-right text-gray-600">
                        {formatRupiah(item.fabrication)}
                      </td>

                      <td className="whitespace-nowrap px-5 py-3 text-right text-gray-600">
                        ¥ {formatNumber(item.yen)}
                      </td>

                      <td className="whitespace-nowrap px-5 py-3 text-right text-gray-600">
                        $ {formatNumber(item.usd)}
                      </td>

                      <td className="whitespace-nowrap px-5 py-3 text-right font-bold text-blue-600">
                        {formatRupiah(item.subtotal)}
                      </td>
                    </tr>
                  ))}
                </tbody>

                <tfoot className="bg-slate-100">
                  <tr>
                    <td className="whitespace-nowrap px-5 py-3 font-bold text-gray-800">
                      Total
                    </td>

                    <td className="whitespace-nowrap px-5 py-3 text-right font-bold text-gray-700">
                      {formatRupiah(activeExpenseData.reduce((sum, item) => sum + item.production, 0))}
                    </td>

                    <td className="whitespace-nowrap px-5 py-3 text-right font-bold text-gray-700">
                      {formatRupiah(activeExpenseData.reduce((sum, item) => sum + item.tooling, 0))}
                    </td>

                    <td className="whitespace-nowrap px-5 py-3 text-right font-bold text-gray-700">
                      {formatRupiah(activeExpenseData.reduce((sum, item) => sum + item.consumable, 0))}
                    </td>

                    <td className="whitespace-nowrap px-5 py-3 text-right font-bold text-gray-700">
                      {formatRupiah(activeExpenseData.reduce((sum, item) => sum + item.maintenance, 0))}
                    </td>

                    <td className="whitespace-nowrap px-5 py-3 text-right font-bold text-gray-700">
                      {formatRupiah(activeExpenseData.reduce((sum, item) => sum + item.tools, 0))}
                    </td>

                    <td className="whitespace-nowrap px-5 py-3 text-right font-bold text-gray-700">
                      {formatRupiah(activeExpenseData.reduce((sum, item) => sum + item.services, 0))}
                    </td>

                    <td className="whitespace-nowrap px-5 py-3 text-right font-bold text-gray-700">
                      {formatRupiah(activeExpenseData.reduce((sum, item) => sum + item.asset, 0))}
                    </td>

                    <td className="whitespace-nowrap px-5 py-3 text-right font-bold text-gray-700">
                      {formatRupiah(activeExpenseData.reduce((sum, item) => sum + item.fabrication, 0))}
                    </td>

                    <td className="whitespace-nowrap px-5 py-3 text-right font-bold text-gray-700">
                      ¥ {formatNumber(totalYen)}
                    </td>

                    <td className="whitespace-nowrap px-5 py-3 text-right font-bold text-gray-700">
                      $ {formatNumber(totalUsd)}
                    </td>

                    <td className="whitespace-nowrap px-5 py-3 text-right font-bold text-blue-700">
                      {formatRupiah(totalExpense)}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>

          {/* YEARLY PURCHASE TABLE */}
          <div className="rounded-2xl border border-gray-100 bg-white shadow-sm">
            <div className="border-b border-gray-100 p-5">
              <h2 className="font-bold text-gray-800">
                Yearly Purchase Detail
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Detail lengkap fiscal year purchasing berdasarkan semua kategori.
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-slate-50 text-xs uppercase tracking-wide text-gray-500">
                  <tr>
                    <th className="whitespace-nowrap px-5 py-3 text-left">
                      Year
                    </th>
                    <th className="whitespace-nowrap px-5 py-3 text-right">
                      Production / Material Press
                    </th>
                    <th className="whitespace-nowrap px-5 py-3 text-right">
                      Tooling Project
                    </th>
                    <th className="whitespace-nowrap px-5 py-3 text-right">
                      Consumable
                    </th>
                    <th className="whitespace-nowrap px-5 py-3 text-right">
                      Maintenance Dies
                    </th>
                    <th className="whitespace-nowrap px-5 py-3 text-right">
                      Tools & Spare Part
                    </th>
                    <th className="whitespace-nowrap px-5 py-3 text-right">
                      Services
                    </th>
                    <th className="whitespace-nowrap px-5 py-3 text-right">
                      Asset
                    </th>
                    <th className="whitespace-nowrap px-5 py-3 text-right">
                      Others - Fabrication
                    </th>
                    <th className="whitespace-nowrap px-5 py-3 text-right">
                      JPY
                    </th>
                    <th className="whitespace-nowrap px-5 py-3 text-right">
                      USD
                    </th>
                    <th className="whitespace-nowrap px-5 py-3 text-right">
                      Subtotal IDR
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-100">
                  {yearlyPurchase.map((item) => {
                    const yearlySubtotal =
                      item.production +
                      item.tooling +
                      item.consumable +
                      item.maintenance +
                      item.tools +
                      item.services +
                      item.asset +
                      item.fabrication;

                    return (
                      <tr
                        key={item.year}
                        className={`transition hover:bg-slate-50 ${
                          item.year === selectedYear ? "bg-blue-50/60" : ""
                        }`}
                      >
                        <td className="whitespace-nowrap px-5 py-3 font-bold text-gray-800">
                          {item.year}
                        </td>

                        <td className="whitespace-nowrap px-5 py-3 text-right text-gray-600">
                          {formatRupiah(item.production)}
                        </td>

                        <td className="whitespace-nowrap px-5 py-3 text-right text-gray-600">
                          {formatRupiah(item.tooling)}
                        </td>

                        <td className="whitespace-nowrap px-5 py-3 text-right text-gray-600">
                          {formatRupiah(item.consumable)}
                        </td>

                        <td className="whitespace-nowrap px-5 py-3 text-right text-gray-600">
                          {formatRupiah(item.maintenance)}
                        </td>

                        <td className="whitespace-nowrap px-5 py-3 text-right text-gray-600">
                          {formatRupiah(item.tools)}
                        </td>

                        <td className="whitespace-nowrap px-5 py-3 text-right text-gray-600">
                          {formatRupiah(item.services)}
                        </td>

                        <td className="whitespace-nowrap px-5 py-3 text-right text-gray-600">
                          {formatRupiah(item.asset)}
                        </td>

                        <td className="whitespace-nowrap px-5 py-3 text-right text-gray-600">
                          {formatRupiah(item.fabrication)}
                        </td>

                        <td className="whitespace-nowrap px-5 py-3 text-right text-gray-600">
                          ¥ {formatNumber(item.jpy)}
                        </td>

                        <td className="whitespace-nowrap px-5 py-3 text-right text-gray-600">
                          $ {formatNumber(item.usd)}
                        </td>

                        <td className="whitespace-nowrap px-5 py-3 text-right font-bold text-blue-600">
                          {formatRupiah(yearlySubtotal)}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>

                <tfoot className="bg-slate-100">
                  <tr>
                    <td className="whitespace-nowrap px-5 py-3 font-bold text-gray-800">
                      Total
                    </td>

                    <td className="whitespace-nowrap px-5 py-3 text-right font-bold text-gray-700">
                      {formatRupiah(yearlyPurchase.reduce((sum, item) => sum + item.production, 0))}
                    </td>

                    <td className="whitespace-nowrap px-5 py-3 text-right font-bold text-gray-700">
                      {formatRupiah(yearlyPurchase.reduce((sum, item) => sum + item.tooling, 0))}
                    </td>

                    <td className="whitespace-nowrap px-5 py-3 text-right font-bold text-gray-700">
                      {formatRupiah(yearlyPurchase.reduce((sum, item) => sum + item.consumable, 0))}
                    </td>

                    <td className="whitespace-nowrap px-5 py-3 text-right font-bold text-gray-700">
                      {formatRupiah(yearlyPurchase.reduce((sum, item) => sum + item.maintenance, 0))}
                    </td>

                    <td className="whitespace-nowrap px-5 py-3 text-right font-bold text-gray-700">
                      {formatRupiah(yearlyPurchase.reduce((sum, item) => sum + item.tools, 0))}
                    </td>

                    <td className="whitespace-nowrap px-5 py-3 text-right font-bold text-gray-700">
                      {formatRupiah(yearlyPurchase.reduce((sum, item) => sum + item.services, 0))}
                    </td>

                    <td className="whitespace-nowrap px-5 py-3 text-right font-bold text-gray-700">
                      {formatRupiah(yearlyPurchase.reduce((sum, item) => sum + item.asset, 0))}
                    </td>

                    <td className="whitespace-nowrap px-5 py-3 text-right font-bold text-gray-700">
                      {formatRupiah(yearlyPurchase.reduce((sum, item) => sum + item.fabrication, 0))}
                    </td>

                    <td className="whitespace-nowrap px-5 py-3 text-right font-bold text-gray-700">
                      ¥ {formatNumber(yearlyPurchase.reduce((sum, item) => sum + item.jpy, 0))}
                    </td>

                    <td className="whitespace-nowrap px-5 py-3 text-right font-bold text-gray-700">
                      $ {formatNumber(yearlyPurchase.reduce((sum, item) => sum + item.usd, 0))}
                    </td>

                    <td className="whitespace-nowrap px-5 py-3 text-right font-bold text-blue-700">
                      {formatRupiah(
                        yearlyPurchase.reduce(
                          (sum, item) =>
                            sum +
                            item.production +
                            item.tooling +
                            item.consumable +
                            item.maintenance +
                            item.tools +
                            item.services +
                            item.asset +
                            item.fabrication,
                          0
                        )
                      )}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>

        {/* CATEGORY DETAIL */}
        <div className="rounded-2xl border border-gray-100 bg-white shadow-sm">
          <div className="border-b border-gray-100 p-5">
            <h2 className="font-bold text-gray-800">
              Category Breakdown - Fiscal Year {selectedYear}
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Rincian nominal berdasarkan kategori purchasing.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 p-5 md:grid-cols-2 xl:grid-cols-4">
            {categorySummary.map((item, index) => (
              <div
                key={item.name}
                className="rounded-2xl border border-gray-100 p-4 transition hover:-translate-y-1 hover:shadow-md"
              >
                <div className="mb-4 flex items-center justify-between">
                  <span
                    className="h-10 w-10 rounded-xl"
                    style={{
                      backgroundColor: COLORS[index % COLORS.length],
                    }}
                  />

                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                    {formatShort(item.value)}
                  </span>
                </div>

                <p className="text-sm font-semibold text-gray-700">
                  {item.name}
                </p>

                <p className="mt-2 text-lg font-bold text-gray-950">
                  {formatRupiah(item.value)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}