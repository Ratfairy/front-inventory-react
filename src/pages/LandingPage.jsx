import { useNavigate } from "react-router-dom";
import factoryImg from "../assets/img/factory.jpeg";

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen animate-fadeIn">
      <section
        className="relative min-h-screen bg-cover bg-center flex items-center justify-center text-white overflow-hidden"
        style={{
          backgroundImage: `url(${factoryImg})`,
        }}
      >
        {/* OVERLAY */}
        <div className="absolute inset-0 bg-slate-950/65"></div>

        {/* NAVBAR */}
        <div className="absolute top-0 left-0 right-0 z-20 px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold tracking-wide">
                PT Ito Seisakusho Armada
              </h2>
              <p className="text-xs text-white/70">
                ERP modern untuk kebutuhan internal perusahaan
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate("/login")}
                className="rounded-xl border border-white/30 px-5 py-2 text-sm font-semibold text-white transition hover:bg-white hover:text-slate-900"
              >
                Login
              </button>

              <button
                onClick={() => navigate("/register")}
                className="rounded-xl bg-white px-5 py-2 text-sm font-semibold text-slate-900 shadow-sm transition hover:bg-blue-50"
              >
                Register
              </button>
            </div>
          </div>
        </div>

        {/* CONTENT */}
        <div className="relative z-10 max-w-5xl px-6 text-center">
          <div className="mx-auto mb-6 inline-flex rounded-full border border-white/20 bg-white/10 px-5 py-2 text-sm text-blue-100 backdrop-blur">
            Precision Progressive Dies & Manufacturing Company
          </div>

          <h1 className="text-4xl font-bold tracking-wide md:text-6xl">
            PT Ito Seisakusho Armada
          </h1>

          <p className="mx-auto mt-5 max-w-3xl text-base font-light leading-relaxed text-white/85 md:text-xl">
            Sistem ERP modern untuk membantu proses purchasing, inventory,
            dan reporting dan lain-lain. Dibuat untuk kebutuhan internal perusahaan.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <button
              onClick={() => navigate("/login")}
              className="w-full rounded-2xl bg-blue-600 px-8 py-3 text-sm font-bold text-white shadow-lg transition hover:bg-blue-700 sm:w-auto"
            >
              Masuk ke Sistem
            </button>

            <button
              onClick={() => navigate("/register")}
              className="w-full rounded-2xl border border-white/30 bg-white/10 px-8 py-3 text-sm font-bold text-white backdrop-blur transition hover:bg-white hover:text-slate-900 sm:w-auto"
            >
              Buat Akun
            </button>
          </div>
        </div>

        {/* BOTTOM INFO */}
        <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-center">
          <p className="text-xs text-white/60">
            Module ERP ini dibuat untuk kebutuhan internal perusahaan. Hubungi IT Dept untuk informasi lebih lanjut.
          </p>
        </div>
      </section>
    </div>
  );
}