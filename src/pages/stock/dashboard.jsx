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
  "#22c55e",
  "#ef4444",
  "#f97316",
  "#94a3b8",
  "#1e3a8a",
  "#a855f7",
  "#eab308",
  "#06b6d4",
  "#64748b",
];

const departments = [
  { key: "hr&ga", label: "HR & GA" },
  { key: "purchasing", label: "Purchasing" },
  { key: "sales", label: "Sales & Marketing" },
  { key: "finance", label: "Finance & Accounting" },
  { key: "design", label: "Design" },
  { key: "ppic", label: "PPIC" },
  { key: "tooling", label: "Tooling" },
  { key: "produksi", label: "Produksi" },
  { key: "qcqa", label: "QC & QA" },
];

const categories = [
  { key: "raw", label: "Raw Material" },
  { key: "consumable", label: "Consumable" },
  { key: "sparepart", label: "Spare Part" },
  { key: "tools", label: "Tools" },
  { key: "asset", label: "Asset" },
];

const stockData = [
  {
    id: 1,
    code: "RM-001",
    item: "Coil Baja",
    category: "Raw Material",
    categoryKey: "raw",
    stock: 4000,
    min: 1000,
    unit: "KG",
    price: 18500,
    location: "Warehouse A",
  },
  {
    id: 2,
    code: "RM-002",
    item: "Plat Besi",
    category: "Raw Material",
    categoryKey: "raw",
    stock: 2000,
    min: 800,
    unit: "KG",
    price: 16500,
    location: "Warehouse A",
  },
  {
    id: 3,
    code: "RM-003",
    item: "Pipa Hollow",
    category: "Raw Material",
    categoryKey: "raw",
    stock: 500,
    min: 700,
    unit: "PCS",
    price: 42000,
    location: "Warehouse B",
  },
  {
    id: 4,
    code: "CS-001",
    item: "Cutting Oil",
    category: "Consumable",
    categoryKey: "consumable",
    stock: 35,
    min: 20,
    unit: "LITER",
    price: 95000,
    location: "Warehouse C",
  },
  {
    id: 5,
    code: "CS-002",
    item: "Grinding Wheel",
    category: "Consumable",
    categoryKey: "consumable",
    stock: 12,
    min: 25,
    unit: "PCS",
    price: 135000,
    location: "Warehouse C",
  },
  {
    id: 6,
    code: "SP-001",
    item: "Bearing 6204",
    category: "Spare Part",
    categoryKey: "sparepart",
    stock: 48,
    min: 30,
    unit: "PCS",
    price: 65000,
    location: "Warehouse B",
  },
  {
    id: 7,
    code: "SP-002",
    item: "V-Belt A42",
    category: "Spare Part",
    categoryKey: "sparepart",
    stock: 8,
    min: 15,
    unit: "PCS",
    price: 88000,
    location: "Warehouse B",
  },
  {
    id: 8,
    code: "TL-001",
    item: "Drill Bit 10mm",
    category: "Tools",
    categoryKey: "tools",
    stock: 75,
    min: 40,
    unit: "PCS",
    price: 45000,
    location: "Tool Room",
  },
  {
    id: 9,
    code: "TL-002",
    item: "End Mill Cutter",
    category: "Tools",
    categoryKey: "tools",
    stock: 18,
    min: 20,
    unit: "PCS",
    price: 250000,
    location: "Tool Room",
  },
  {
    id: 10,
    code: "AS-001",
    item: "Hand Pallet",
    category: "Asset",
    categoryKey: "asset",
    stock: 3,
    min: 2,
    unit: "UNIT",
    price: 3500000,
    location: "Warehouse A",
  },
];

const stockMovementData = [
  {
    id: 1,
    date: "2026-01-05",
    month: "Jan",
    item: "Coil Baja",
    category: "Raw Material",
    department: "Purchasing",
    departmentKey: "purchasing",
    type: "IN",
    qty: 1200,
    unit: "KG",
    pic: "Andi",
    reference: "Purchase Order",
  },
  {
    id: 2,
    date: "2026-01-12",
    month: "Jan",
    item: "Plat Besi",
    category: "Raw Material",
    department: "PPIC",
    departmentKey: "ppic",
    type: "IN",
    qty: 800,
    unit: "KG",
    pic: "Rudi",
    reference: "Material Planning",
  },
  {
    id: 3,
    date: "2026-01-20",
    month: "Jan",
    item: "Coil Baja",
    category: "Raw Material",
    department: "Produksi",
    departmentKey: "produksi",
    type: "OUT",
    qty: 450,
    unit: "KG",
    pic: "Sinta",
    reference: "Production Usage",
  },
  {
    id: 4,
    date: "2026-02-03",
    month: "Feb",
    item: "Cutting Oil",
    category: "Consumable",
    department: "Tooling",
    departmentKey: "tooling",
    type: "IN",
    qty: 30,
    unit: "LITER",
    pic: "Dewi",
    reference: "Purchase Order",
  },
  {
    id: 5,
    date: "2026-02-11",
    month: "Feb",
    item: "Grinding Wheel",
    category: "Consumable",
    department: "Produksi",
    departmentKey: "produksi",
    type: "OUT",
    qty: 15,
    unit: "PCS",
    pic: "Agus",
    reference: "Production Usage",
  },
  {
    id: 6,
    date: "2026-02-24",
    month: "Feb",
    item: "Bearing 6204",
    category: "Spare Part",
    department: "Tooling",
    departmentKey: "tooling",
    type: "IN",
    qty: 40,
    unit: "PCS",
    pic: "Rudi",
    reference: "Purchase Order",
  },
  {
    id: 7,
    date: "2026-03-06",
    month: "Mar",
    item: "V-Belt A42",
    category: "Spare Part",
    department: "Tooling",
    departmentKey: "tooling",
    type: "OUT",
    qty: 10,
    unit: "PCS",
    pic: "Bima",
    reference: "Maintenance",
  },
  {
    id: 8,
    date: "2026-03-18",
    month: "Mar",
    item: "Drill Bit 10mm",
    category: "Tools",
    department: "Design",
    departmentKey: "design",
    type: "IN",
    qty: 60,
    unit: "PCS",
    pic: "Andi",
    reference: "Tool Request",
  },
  {
    id: 9,
    date: "2026-03-25",
    month: "Mar",
    item: "End Mill Cutter",
    category: "Tools",
    department: "Produksi",
    departmentKey: "produksi",
    type: "OUT",
    qty: 12,
    unit: "PCS",
    pic: "Agus",
    reference: "Tool Request",
  },
  {
    id: 10,
    date: "2026-04-02",
    month: "Apr",
    item: "Hand Pallet",
    category: "Asset",
    department: "QC & QA",
    departmentKey: "qcqa",
    type: "IN",
    qty: 2,
    unit: "UNIT",
    pic: "Dewi",
    reference: "Asset Request",
  },
  {
    id: 11,
    date: "2026-04-10",
    month: "Apr",
    item: "Pipa Hollow",
    category: "Raw Material",
    department: "Produksi",
    departmentKey: "produksi",
    type: "OUT",
    qty: 350,
    unit: "PCS",
    pic: "Sinta",
    reference: "Production Usage",
  },
  {
    id: 12,
    date: "2026-04-18",
    month: "Apr",
    item: "Coil Baja",
    category: "Raw Material",
    department: "Purchasing",
    departmentKey: "purchasing",
    type: "IN",
    qty: 900,
    unit: "KG",
    pic: "Andi",
    reference: "Purchase Order",
  },
  {
    id: 13,
    date: "2026-05-07",
    month: "May",
    item: "Drill Bit 10mm",
    category: "Tools",
    department: "QC & QA",
    departmentKey: "qcqa",
    type: "OUT",
    qty: 18,
    unit: "PCS",
    pic: "Rina",
    reference: "Inspection Tools",
  },
  {
    id: 14,
    date: "2026-05-15",
    month: "May",
    item: "Grinding Wheel",
    category: "Consumable",
    department: "Produksi",
    departmentKey: "produksi",
    type: "OUT",
    qty: 22,
    unit: "PCS",
    pic: "Agus",
    reference: "Production Usage",
  },
  {
    id: 15,
    date: "2026-06-04",
    month: "Jun",
    item: "Bearing 6204",
    category: "Spare Part",
    department: "Sales & Marketing",
    departmentKey: "sales",
    type: "OUT",
    qty: 6,
    unit: "PCS",
    pic: "Maya",
    reference: "Customer Sample",
  },
  {
    id: 16,
    date: "2026-06-17",
    month: "Jun",
    item: "Cutting Oil",
    category: "Consumable",
    department: "HR & GA",
    departmentKey: "hr&ga",
    type: "OUT",
    qty: 4,
    unit: "LITER",
    pic: "Yuni",
    reference: "Training",
  },
  {
    id: 17,
    date: "2026-07-03",
    month: "Jul",
    item: "Plat Besi",
    category: "Raw Material",
    department: "Produksi",
    departmentKey: "produksi",
    type: "OUT",
    qty: 420,
    unit: "KG",
    pic: "Sinta",
    reference: "Production Usage",
  },
  {
    id: 18,
    date: "2026-07-20",
    month: "Jul",
    item: "End Mill Cutter",
    category: "Tools",
    department: "Finance & Accounting",
    departmentKey: "finance",
    type: "IN",
    qty: 8,
    unit: "PCS",
    pic: "Tono",
    reference: "Asset Verification",
  },
  {
    id: 19,
    date: "2026-08-08",
    month: "Aug",
    item: "Pipa Hollow",
    category: "Raw Material",
    department: "PPIC",
    departmentKey: "ppic",
    type: "IN",
    qty: 650,
    unit: "PCS",
    pic: "Rudi",
    reference: "Material Planning",
  },
  {
    id: 20,
    date: "2026-08-21",
    month: "Aug",
    item: "Coil Baja",
    category: "Raw Material",
    department: "Produksi",
    departmentKey: "produksi",
    type: "OUT",
    qty: 720,
    unit: "KG",
    pic: "Agus",
    reference: "Production Usage",
  },
  {
    id: 21,
    date: "2026-09-10",
    month: "Sep",
    item: "Hand Pallet",
    category: "Asset",
    department: "QC & QA",
    departmentKey: "qcqa",
    type: "OUT",
    qty: 1,
    unit: "UNIT",
    pic: "Rina",
    reference: "Quality Area",
  },
  {
    id: 22,
    date: "2026-09-27",
    month: "Sep",
    item: "Cutting Oil",
    category: "Consumable",
    department: "Tooling",
    departmentKey: "tooling",
    type: "OUT",
    qty: 12,
    unit: "LITER",
    pic: "Bima",
    reference: "Tooling Process",
  },
  {
    id: 23,
    date: "2026-10-05",
    month: "Oct",
    item: "Drill Bit 10mm",
    category: "Tools",
    department: "Design",
    departmentKey: "design",
    type: "OUT",
    qty: 20,
    unit: "PCS",
    pic: "Andi",
    reference: "Prototype",
  },
  {
    id: 24,
    date: "2026-10-22",
    month: "Oct",
    item: "Coil Baja",
    category: "Raw Material",
    department: "Purchasing",
    departmentKey: "purchasing",
    type: "IN",
    qty: 1100,
    unit: "KG",
    pic: "Dewi",
    reference: "Purchase Order",
  },
  {
    id: 25,
    date: "2026-11-09",
    month: "Nov",
    item: "V-Belt A42",
    category: "Spare Part",
    department: "Tooling",
    departmentKey: "tooling",
    type: "OUT",
    qty: 7,
    unit: "PCS",
    pic: "Bima",
    reference: "Maintenance",
  },
  {
    id: 26,
    date: "2026-11-18",
    month: "Nov",
    item: "Grinding Wheel",
    category: "Consumable",
    department: "Produksi",
    departmentKey: "produksi",
    type: "OUT",
    qty: 19,
    unit: "PCS",
    pic: "Sinta",
    reference: "Production Usage",
  },
  {
    id: 27,
    date: "2026-12-04",
    month: "Dec",
    item: "Bearing 6204",
    category: "Spare Part",
    department: "QC & QA",
    departmentKey: "qcqa",
    type: "OUT",
    qty: 9,
    unit: "PCS",
    pic: "Rina",
    reference: "Quality Equipment",
  },
  {
    id: 28,
    date: "2026-12-16",
    month: "Dec",
    item: "Plat Besi",
    category: "Raw Material",
    department: "Produksi",
    departmentKey: "produksi",
    type: "OUT",
    qty: 510,
    unit: "KG",
    pic: "Agus",
    reference: "Production Usage",
  },
];

const monthOrder = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export default function StockDashboard() {
  const initialDepartment = localStorage.getItem("selectedDepartment") || "ALL";
  const [selectedDepartment, setSelectedDepartment] = useState(initialDepartment);

  const stockWithValue = stockData.map((item) => ({
    ...item,
    totalValue: item.stock * item.price,
    status:
      item.stock <= item.min
        ? "Low Stock"
        : item.stock <= item.min * 1.5
        ? "Warning"
        : "Available",
  }));

  const filteredMovement = useMemo(() => {
    return stockMovementData.filter((item) => {
      return selectedDepartment === "ALL" || item.departmentKey === selectedDepartment;
    });
  }, [selectedDepartment]);

  const totalItem = stockWithValue.length;

  const totalStockQty = stockWithValue.reduce(
    (sum, item) => sum + item.stock,
    0
  );

  const totalStockValue = stockWithValue.reduce(
    (sum, item) => sum + item.totalValue,
    0
  );

  const lowStockItems = stockWithValue
    .filter((item) => item.status === "Low Stock" || item.status === "Warning")
    .sort((a, b) => a.stock / a.min - b.stock / b.min);

  const lowStockCount = stockWithValue.filter(
    (item) => item.status === "Low Stock"
  ).length;

  const totalIn = filteredMovement
    .filter((item) => item.type === "IN")
    .reduce((sum, item) => sum + item.qty, 0);

  const totalOut = filteredMovement
    .filter((item) => item.type === "OUT")
    .reduce((sum, item) => sum + item.qty, 0);

  const categorySummary = categories.map((category) => {
    const items = stockWithValue.filter(
      (item) => item.categoryKey === category.key
    );

    return {
      name: category.label,
      key: category.key,
      value: items.reduce((sum, item) => sum + item.totalValue, 0),
      qty: items.reduce((sum, item) => sum + item.stock, 0),
      totalItem: items.length,
    };
  });

  const statusSummary = [
    {
      name: "Available",
      value: stockWithValue.filter((item) => item.status === "Available").length,
    },
    {
      name: "Warning",
      value: stockWithValue.filter((item) => item.status === "Warning").length,
    },
    {
      name: "Low Stock",
      value: stockWithValue.filter((item) => item.status === "Low Stock").length,
    },
  ];

  const departmentMovementSummary = departments.map((department) => {
    const movements = stockMovementData.filter(
      (item) => item.departmentKey === department.key
    );

    const inQty = movements
      .filter((item) => item.type === "IN")
      .reduce((sum, item) => sum + item.qty, 0);

    const outQty = movements
      .filter((item) => item.type === "OUT")
      .reduce((sum, item) => sum + item.qty, 0);

    return {
      ...department,
      movement: inQty + outQty,
      inQty,
      outQty,
      transaction: movements.length,
    };
  });

  const topDepartment = [...departmentMovementSummary].sort(
    (a, b) => b.movement - a.movement
  )[0];

  const selectedDepartmentLabel =
    selectedDepartment === "ALL"
      ? "All Department"
      : departments.find((item) => item.key === selectedDepartment)?.label;

  const departmentYearChart = monthOrder.map((month) => {
    const row = { month };

    if (selectedDepartment === "ALL") {
      departments.forEach((department) => {
        row[department.key] = stockMovementData
          .filter(
            (item) => item.month === month && item.departmentKey === department.key
          )
          .reduce((sum, item) => sum + item.qty, 0);
      });
    } else {
      const movements = stockMovementData.filter(
        (item) => item.month === month && item.departmentKey === selectedDepartment
      );

      row.inQty = movements
        .filter((item) => item.type === "IN")
        .reduce((sum, item) => sum + item.qty, 0);

      row.outQty = movements
        .filter((item) => item.type === "OUT")
        .reduce((sum, item) => sum + item.qty, 0);
    }

    return row;
  });

  const stockValueChart = categorySummary.map((item) => ({
    category: item.name,
    value: item.value,
    qty: item.qty,
  }));

  const recentMovement = [...filteredMovement]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 6);

  const topStockValue = [...stockWithValue]
    .sort((a, b) => b.totalValue - a.totalValue)
    .slice(0, 5);

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
    if (value >= 1_000_000_000) return `${(value / 1_000_000_000).toFixed(1)} M`;
    if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(1)} Jt`;
    if (value >= 1_000) return `${(value / 1_000).toFixed(1)} Rb`;
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
                {item.name?.toLowerCase().includes("value")
                  ? formatRupiah(item.value)
                  : formatNumber(item.value)}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const resetDepartment = () => {
    localStorage.removeItem("selectedDepartment");
    setSelectedDepartment("ALL");
  };

  return (
    <div className="min-h-screen bg-slate-50 p-1">
      <div className="space-y-6">
        {/* HEADER */}
        <div className="overflow-hidden rounded-3xl bg-gradient-to-r from-slate-950 via-blue-950 to-slate-900 p-6 text-white shadow-sm">
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
            <div>
              <p className="text-sm font-semibold text-blue-200">
                Inventory Module
              </p>

              <h1 className="mt-2 text-3xl font-bold tracking-tight">
                Stock Dashboard
              </h1>

              <p className="mt-2 max-w-3xl text-sm text-slate-300">
                Ringkasan cepat inventory, nilai stock, low stock alert, dan
                movement stock berdasarkan department.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur">
                <p className="text-slate-300">Active Filter</p>
                <p className="mt-1 text-lg font-bold">
                  {selectedDepartmentLabel}
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur">
                <p className="text-slate-300">Fiscal Year</p>
                <p className="mt-1 text-lg font-bold">2026</p>
              </div>
            </div>
          </div>
        </div>

        {/* DEPARTMENT FILTER */}
        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
          <div className="mb-4 flex flex-col justify-between gap-3 md:flex-row md:items-center">
            <div>
              <h2 className="font-bold text-gray-800">
                Select Department Movement
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                Pilih department untuk melihat movement stock tahunan, atau pilih semua department.
              </p>
            </div>

            <button
              onClick={resetDepartment}
              className="w-full rounded-xl border border-gray-200 px-5 py-2.5 text-sm font-semibold text-gray-600 transition hover:bg-gray-50 md:w-auto"
            >
              Reset Department
            </button>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setSelectedDepartment("ALL")}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                selectedDepartment === "ALL"
                  ? "bg-blue-600 text-white shadow-sm"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              All Department
            </button>

            {departments.map((department, index) => (
              <button
                key={department.key}
                onClick={() => {
                  localStorage.setItem("selectedDepartment", department.key);
                  setSelectedDepartment(department.key);
                }}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                  selectedDepartment === department.key
                    ? "text-white shadow-sm"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
                style={{
                  backgroundColor:
                    selectedDepartment === department.key
                      ? COLORS[index % COLORS.length]
                      : undefined,
                }}
              >
                {department.label}
              </button>
            ))}
          </div>
        </div>

        {/* KPI CARDS */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-500">Total Item</p>
              <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-600">
                Master
              </span>
            </div>

            <h2 className="mt-3 text-2xl font-bold text-gray-900">
              {formatNumber(totalItem)}
            </h2>

            <p className="mt-2 text-xs text-gray-400">
              Total item yang terdaftar pada inventory.
            </p>
          </div>

          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-500">Total Stock Value</p>
              <span className="rounded-full bg-orange-50 px-3 py-1 text-xs font-semibold text-orange-600">
                IDR
              </span>
            </div>

            <h2 className="mt-3 text-2xl font-bold text-gray-900">
              {formatRupiah(totalStockValue)}
            </h2>

            <p className="mt-2 text-xs text-gray-400">
              Estimasi nilai stock berdasarkan harga item.
            </p>
          </div>

          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-500">Top Movement Dept</p>
              <span className="rounded-full bg-purple-50 px-3 py-1 text-xs font-semibold text-purple-600">
                Highest
              </span>
            </div>

            <h2 className="mt-3 text-2xl font-bold text-gray-900">
              {topDepartment?.label}
            </h2>

            <p className="mt-2 text-xs text-gray-400">
              Movement tertinggi: {formatNumber(topDepartment?.movement)} qty.
            </p>
          </div>

          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-500">Low Stock Item</p>
              <span className="rounded-full bg-red-50 px-3 py-1 text-xs font-semibold text-red-600">
                Alert
              </span>
            </div>

            <h2 className="mt-3 text-2xl font-bold text-red-600">
              {formatNumber(lowStockCount)}
            </h2>

            <p className="mt-2 text-xs text-gray-400">
              Item dengan stok di bawah minimum.
            </p>
          </div>
        </div>

        {/* MAIN CHART */}
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm xl:col-span-2">
            <div className="mb-5 flex flex-col justify-between gap-3 md:flex-row md:items-center">
              <div>
                <h2 className="font-bold text-gray-800">
                  Yearly Stock Movement by Department
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  {selectedDepartment === "ALL"
                    ? "Menampilkan movement semua department selama satu tahun."
                    : `Menampilkan movement department ${selectedDepartmentLabel} selama satu tahun.`}
                </p>
              </div>

              <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-600">
                {selectedDepartmentLabel}
              </span>
            </div>

            <div className="h-96 w-full">
              <ResponsiveContainer>
                <BarChart data={departmentYearChart}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                  <YAxis tickFormatter={formatShort} tick={{ fontSize: 12 }} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />

                  {selectedDepartment === "ALL" ? (
                    <>
                      {departments.map((department, index) => (
                        <Bar
                          key={department.key}
                          dataKey={department.key}
                          name={department.label}
                          fill={COLORS[index % COLORS.length]}
                          radius={[6, 6, 0, 0]}
                          barSize={18}
                        />
                      ))}
                    </>
                  ) : (
                    <>
                      <Bar
                        dataKey="inQty"
                        name="Stock IN"
                        fill="#22c55e"
                        radius={[8, 8, 0, 0]}
                        barSize={34}
                      />
                      <Bar
                        dataKey="outQty"
                        name="Stock OUT"
                        fill="#ef4444"
                        radius={[8, 8, 0, 0]}
                        barSize={34}
                      />
                    </>
                  )}
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <div className="mb-5">
              <h2 className="font-bold text-gray-800">
                Movement by Department
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Komposisi movement stock selama satu tahun.
              </p>
            </div>

            <div className="h-72 w-full">
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={departmentMovementSummary}
                    dataKey="movement"
                    nameKey="label"
                    innerRadius={62}
                    outerRadius={105}
                    paddingAngle={3}
                  >
                    {departmentMovementSummary.map((_, index) => (
                      <Cell key={index} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>

                  <Tooltip formatter={(value) => `${formatNumber(value)} qty`} />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="mt-3 max-h-48 space-y-2 overflow-y-auto pr-1 text-sm">
              {[...departmentMovementSummary]
                .sort((a, b) => b.movement - a.movement)
                .slice(0, 6)
                .map((item, index) => (
                  <div
                    key={item.key}
                    className="flex items-center justify-between gap-3"
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className="h-3 w-3 rounded-full"
                        style={{
                          backgroundColor: COLORS[index % COLORS.length],
                        }}
                      />
                      <span className="text-gray-600">{item.label}</span>
                    </div>

                    <span className="font-semibold text-gray-800">
                      {formatShort(item.movement)}
                    </span>
                  </div>
                ))}
            </div>
          </div>
        </div>

        {/* SECONDARY CHART */}
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <div className="mb-5">
              <h2 className="font-bold text-gray-800">
                Stock Value by Category
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Nilai stock berdasarkan kategori item.
              </p>
            </div>

            <div className="h-80 w-full">
              <ResponsiveContainer>
                <BarChart data={stockValueChart}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="category" tick={{ fontSize: 12 }} />
                  <YAxis tickFormatter={formatShort} tick={{ fontSize: 12 }} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar
                    dataKey="value"
                    name="Stock Value"
                    fill="#2563eb"
                    radius={[8, 8, 0, 0]}
                    barSize={38}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <div className="mb-5">
              <h2 className="font-bold text-gray-800">
                Stock Status
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Komposisi status stock saat ini.
              </p>
            </div>

            <div className="h-72 w-full">
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={statusSummary}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={62}
                    outerRadius={105}
                    paddingAngle={3}
                  >
                    {statusSummary.map((_, index) => (
                      <Cell key={index} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>

                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="mt-3 space-y-2 text-sm">
              {statusSummary.map((item, index) => (
                <div
                  key={item.name}
                  className="flex items-center justify-between gap-3"
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
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* LOW STOCK + RECENT MOVEMENT */}
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
          <div className="rounded-2xl border border-gray-100 bg-white shadow-sm">
            <div className="border-b border-gray-100 p-5">
              <h2 className="font-bold text-gray-800">
                Low Stock Alert
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Item yang perlu diperhatikan karena mendekati atau di bawah minimum.
              </p>
            </div>

            <div className="divide-y divide-gray-100">
              {lowStockItems.slice(0, 5).map((item) => {
                const percentage =
                  item.min > 0 ? (item.stock / item.min) * 100 : 0;

                return (
                  <div key={item.id} className="p-5 transition hover:bg-slate-50">
                    <div className="mb-2 flex items-center justify-between gap-3">
                      <div>
                        <p className="font-semibold text-gray-800">
                          {item.item}
                        </p>
                        <p className="text-xs text-gray-400">
                          {item.category} • {item.location}
                        </p>
                      </div>

                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          item.status === "Low Stock"
                            ? "bg-red-50 text-red-600"
                            : "bg-orange-50 text-orange-600"
                        }`}
                      >
                        {item.status}
                      </span>
                    </div>

                    <div className="mb-2 flex justify-between text-xs text-gray-500">
                      <span>
                        Stock: {formatNumber(item.stock)} {item.unit}
                      </span>
                      <span>
                        Min: {formatNumber(item.min)} {item.unit}
                      </span>
                    </div>

                    <div className="h-2 rounded-full bg-slate-100">
                      <div
                        className={`h-2 rounded-full ${
                          item.status === "Low Stock"
                            ? "bg-red-500"
                            : "bg-orange-500"
                        }`}
                        style={{ width: `${Math.min(percentage, 100)}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="rounded-2xl border border-gray-100 bg-white shadow-sm">
            <div className="border-b border-gray-100 p-5">
              <h2 className="font-bold text-gray-800">
                Recent Stock Movement
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Ringkasan movement terbaru berdasarkan department terpilih.
              </p>
            </div>

            <div className="divide-y divide-gray-100">
              {recentMovement.map((item) => (
                <div key={item.id} className="p-5 transition hover:bg-slate-50">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-semibold text-gray-800">
                        {item.item}
                      </p>

                      <p className="mt-1 text-xs text-gray-400">
                        {item.date} • {item.department} • {item.reference}
                      </p>
                    </div>

                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        item.type === "IN"
                          ? "bg-emerald-50 text-emerald-600"
                          : "bg-red-50 text-red-600"
                      }`}
                    >
                      {item.type}
                    </span>
                  </div>

                  <p className="mt-3 font-bold text-gray-900">
                    {formatNumber(item.qty)} {item.unit}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* TOP STOCK VALUE */}
        <div className="rounded-2xl border border-gray-100 bg-white shadow-sm">
          <div className="border-b border-gray-100 p-5">
            <h2 className="font-bold text-gray-800">
              Top Stock Value
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Lima item dengan estimasi nilai stock terbesar.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 p-5 md:grid-cols-2 xl:grid-cols-5">
            {topStockValue.map((item, index) => (
              <div
                key={item.id}
                className="rounded-2xl border border-gray-100 p-4 transition hover:-translate-y-1 hover:shadow-md"
              >
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 font-bold text-blue-600">
                    {index + 1}
                  </div>

                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                    {item.unit}
                  </span>
                </div>

                <p className="text-sm font-semibold text-gray-700">
                  {item.item}
                </p>

                <p className="mt-1 text-xs text-gray-400">
                  {item.code} • {item.category}
                </p>

                <p className="mt-3 text-lg font-bold text-gray-950">
                  {formatRupiah(item.totalValue)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}