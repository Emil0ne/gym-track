import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';

export default function Layout() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  const navLinks = [
    { path: '/dashboard', label: 'Dashboard', icon: '📊' },
    { path: '/workout-plans', label: 'Workout Plans', icon: '📝' }, 
    { path: '/history', label: 'History', icon: '⏱️' },
  ];

  return (
    <div className="min-h-screen bg-neutral-950 flex text-neutral-200 font-sans">
      
      {/* SIDEBAR */}
      <aside className="w-72 bg-neutral-900 border-r border-neutral-800 flex flex-col shadow-2xl z-10">
        <div className="p-8 mb-4">
          <h1 className="text-4xl font-black text-white tracking-tighter">
            GYM<span className="text-lime-500">TRACK</span>
          </h1>
        </div>

        <nav className="flex-1 px-4 space-y-2">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center gap-4 px-5 py-4 rounded-xl font-bold transition-all duration-200 ${
                  isActive
                    ? 'bg-lime-500 text-neutral-950 shadow-[0_0_20px_rgba(132,204,22,0.15)]'
                    : 'text-neutral-400 hover:bg-neutral-800 hover:text-white'
                }`}
              >
                <span className="text-xl">{link.icon}</span>
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-6">
          <button
            onClick={handleLogout}
            className="w-full py-3.5 px-4 bg-neutral-800 hover:bg-red-500/10 text-neutral-400 hover:text-red-500 font-bold rounded-xl transition-all duration-200 border border-transparent hover:border-red-500/30 flex items-center justify-center gap-2"
          >
            <span>🚪</span> Logout
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 p-10 overflow-y-auto">
        <Outlet />
      </main>
      
    </div>
  );
}