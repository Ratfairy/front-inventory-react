import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import factoryImg from "../../assets/img/factory.jpeg";

export default function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = (e) => {
    e.preventDefault();

    // Dummy login
    // Nanti bagian ini bisa diganti dengan API backend.
    localStorage.setItem("isLogin", "true");
    localStorage.setItem("userEmail", form.email);

    navigate("/modules");
  };

  return (
    <div className="min-h-screen animate-fadeIn bg-slate-100">
      <div className="grid min-h-screen grid-cols-1 lg:grid-cols-2">
        {/* LEFT IMAGE */}
        <div
          className="relative hidden bg-cover bg-center lg:block"
          style={{
            backgroundImage: `url(${factoryImg})`,
          }}
        >
          <div className="absolute inset-0 bg-slate-950/65"></div>

          <div className="relative z-10 flex h-full flex-col justify-end p-12 text-white">
            <p className="text-sm text-blue-200">ERP System</p>
            <h1 className="mt-2 text-4xl font-bold">
              PT Ito Seisakusho Armada
            </h1>
            <p className="mt-3 max-w-xl text-sm text-white/75">
              Login untuk mendapatkan akses ke module ERP perusahaan.
            </p>
          </div>
        </div>

        {/* RIGHT FORM */}
        <div className="flex items-center justify-center p-6">
          <div className="w-full max-w-md rounded-3xl border border-gray-100 bg-white p-8 shadow-sm">
            <div className="mb-8">
              <p className="text-sm font-semibold text-blue-600">
                Welcome Back
              </p>
              <h2 className="mt-2 text-3xl font-bold text-gray-900">
                Login
              </h2>
              <p className="mt-2 text-sm text-gray-500">
                Masuk untuk memilih module ERP yang ingin digunakan.
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-5">
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

              <button
                type="submit"
                className="w-full rounded-xl bg-blue-600 px-4 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-blue-700"
              >
                Login
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-gray-500">
              Belum punya akun?{" "}
              <Link
                to="/register"
                className="font-semibold text-blue-600 hover:text-blue-700"
              >
                Register
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
      </div>
    </div>
  );
}