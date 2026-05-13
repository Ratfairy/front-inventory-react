import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import factoryImg from "../../assets/img/factory.jpeg";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      alert("Password dan konfirmasi password tidak sama.");
      return;
    }

    // Dummy register
    // Nanti bisa diganti dengan API backend.
    alert("Register berhasil. Silakan login.");

    navigate("/login");
  };

  return (
    <div className="min-h-screen animate-fadeIn bg-slate-100">
      <div className="grid min-h-screen grid-cols-1 lg:grid-cols-2">
        {/* LEFT FORM */}
        <div className="flex items-center justify-center p-6">
          <div className="w-full max-w-md rounded-3xl border border-gray-100 bg-white p-8 shadow-sm">
            <div className="mb-8">
              <p className="text-sm font-semibold text-blue-600">
                Create Account
              </p>
              <h2 className="mt-2 text-3xl font-bold text-gray-900">
                Register
              </h2>
              <p className="mt-2 text-sm text-gray-500">
                Buat akun terlebih dahulu sebelum masuk ke sistem ERP.
              </p>
            </div>

            <form onSubmit={handleRegister} className="space-y-5">
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Nama Lengkap
                </label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  placeholder="Masukkan nama"
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  placeholder="Masukkan email"
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  required
                  placeholder="Masukkan password"
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Konfirmasi Password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  required
                  placeholder="Ulangi password"
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-xl bg-blue-600 px-4 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-blue-700"
              >
                Register
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-gray-500">
              Sudah punya akun?{" "}
              <Link
                to="/login"
                className="font-semibold text-blue-600 hover:text-blue-700"
              >
                Login
              </Link>
            </p>

            <button
              onClick={() => navigate("/")}
              className="mt-4 w-full rounded-xl border border-gray-200 px-4 py-3 text-sm font-semibold text-gray-600 transition hover:bg-gray-50"
            >
              Kembali ke Landing Page
            </button>
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div
          className="relative hidden bg-cover bg-center lg:block"
          style={{
            backgroundImage: `url(${factoryImg})`,
          }}
        >
          <div className="absolute inset-0 bg-slate-950/65"></div>

          <div className="relative z-10 flex h-full flex-col justify-end p-12 text-white">
            <p className="text-sm text-blue-200">PT Ito Seisakusho Armada</p>
            <h1 className="mt-2 text-4xl font-bold">
              ERP Purchasing & Inventory
            </h1>
            <p className="mt-3 max-w-xl text-sm text-white/75">
              Register untuk mendapatkan akses ke module ERP perusahaan.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}