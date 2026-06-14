import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <div className="min-h-screen bg-neutral-950 flex items-center justify-center p-4 font-sans text-neutral-200">
      {}
      <div className="flex w-full max-w-5xl h-[700px] bg-neutral-900 rounded-3xl shadow-2xl overflow-hidden border-2 border-lime-500">
        {}
        <div className="hidden md:flex w-1/2 bg-neutral-950 p-12 flex-col justify-center items-center text-center border-r border-neutral-800">
          <h1 className="text-6xl font-black text-white tracking-tighter mb-6">
            GYM<span className="text-lime-500">TRACK</span>
          </h1>
          <p className="text-neutral-400 font-medium text-lg leading-relaxed">
            Twój osobisty dziennik treningowy. <br />
            Śledź progres, buduj formę, <br />
            przekraczaj własne granice.
          </p>
        </div>

        {}
        <div className="w-full md:w-1/2 p-8 md:p-12 overflow-y-auto">
          <div className="h-full flex flex-col justify-center">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}
