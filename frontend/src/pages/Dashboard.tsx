export default function Dashboard() {
  return (
    <div className="max-w-6xl mx-auto animate-fade-in">
      
      <header className="mb-12">
        <h1 className="text-4xl font-black text-white mb-2">Dashboard</h1>
        <p className="text-neutral-400 font-medium text-lg">Witaj z powrotem. Gotowy na kolejny trening?</p>
      </header>

      {/* QUICK STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-neutral-900 border border-neutral-800 p-6 rounded-3xl shadow-xl relative overflow-hidden group hover:border-lime-500/30 transition-colors">
          <div className="absolute -right-6 -top-6 w-24 h-24 bg-lime-500/5 rounded-full blur-2xl group-hover:bg-lime-500/10 transition-colors"></div>
          <h3 className="text-neutral-500 font-bold text-xs uppercase tracking-wider mb-2">Aktywne Plany</h3>
          <p className="text-4xl font-black text-white">2</p>
        </div>
        
        <div className="bg-neutral-900 border border-neutral-800 p-6 rounded-3xl shadow-xl relative overflow-hidden group hover:border-lime-500/30 transition-colors">
          <div className="absolute -right-6 -top-6 w-24 h-24 bg-lime-500/5 rounded-full blur-2xl group-hover:bg-lime-500/10 transition-colors"></div>
          <h3 className="text-neutral-500 font-bold text-xs uppercase tracking-wider mb-2">Treningi w tym tyg.</h3>
          <p className="text-4xl font-black text-white">4</p>
        </div>
        
        <div className="bg-neutral-900 border border-neutral-800 p-6 rounded-3xl shadow-xl relative overflow-hidden group hover:border-lime-500/30 transition-colors">
          <div className="absolute -right-6 -top-6 w-24 h-24 bg-lime-500/5 rounded-full blur-2xl group-hover:bg-lime-500/10 transition-colors"></div>
          <h3 className="text-neutral-500 font-bold text-xs uppercase tracking-wider mb-2">Ostatnia sesja</h3>
          <p className="text-2xl font-black text-lime-500 mt-2">Upper Body</p>
        </div>
      </div>

      {/* QUICK ACTION BANNER */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-10 shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="absolute top-0 left-0 w-1.5 h-full bg-lime-500"></div>
        
        <div>
          <h2 className="text-3xl font-black text-white mb-3">Zacznij Trening</h2>
          <p className="text-neutral-400 max-w-xl font-medium leading-relaxed">
            Twój kolejny zaplanowany trening to Upper Body. Pamiętaj o dokładnym śledzeniu ciężaru i trzymaniu się założonego RIR.
          </p>
        </div>
        
        <button className="bg-lime-500 hover:bg-lime-400 text-neutral-950 font-black text-lg py-4 px-10 rounded-xl transition duration-200 whitespace-nowrap shadow-[0_0_20px_rgba(132,204,22,0.2)] hover:shadow-[0_0_30px_rgba(132,204,22,0.4)]">
          Start Sesji
        </button>
      </div>

    </div>
  );
}