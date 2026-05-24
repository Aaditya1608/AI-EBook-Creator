import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export default function Dashboard() {
  const { user, logout } = useAuth();
  const [logoutLoading, setLogoutLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('overview'); // overview, guide, library

  const handleLogout = async () => {
    setLogoutLoading(true);
    await logout();
    setLogoutLoading(false);
  };

  // Mock eBooks for visual completeness
  const mockBooks = [
    { id: 1, title: 'The Silent Nebula', genre: 'Sci-Fi', chapters: 14, color: 'from-blue-900 to-indigo-600', date: 'May 12, 2026' },
    { id: 2, title: 'Digital Renaissance', genre: 'Technology', chapters: 8, color: 'from-violet-900 to-purple-600', date: 'May 19, 2026' },
    { id: 3, title: 'Epic of Gilgamesh Reimagined', genre: 'History', chapters: 18, color: 'from-emerald-900 to-teal-600', date: 'May 23, 2026' },
  ];

  return (
    <div className="flex flex-col min-h-screen w-full max-w-7xl mx-auto px-6 box-border relative font-sans">
      {/* Decorative Glows */}
      <div className="absolute bottom-[10%] -left-[200px] w-[400px] h-[400px] bg-radial from-brand-cyan/10 to-transparent pointer-events-none z-[-1]" />
      <div className="absolute top-[20%] -right-[200px] w-[400px] h-[400px] bg-radial from-brand-purple/10 to-transparent pointer-events-none z-[-1]" />

      {/* Header Dashboard Nav */}
      <header className="flex items-center justify-between py-5 border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="text-2xl select-none">🪄</div>
          <span className="font-heading text-xl font-bold tracking-tight text-white">
            AI EBook Studio
          </span>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-brand-purple to-brand-cyan flex items-center justify-center text-sm font-bold text-white uppercase select-none">
              {user?.name?.charAt(0).toUpperCase() || 'U'}
            </div>
            <div className="flex flex-col items-start leading-tight">
              <span className="text-sm font-semibold text-white">{user?.name}</span>
              <span className="text-[10px] text-gray-500 font-medium">{user?.email}</span>
            </div>
          </div>
          <button 
            className="px-4 py-2 text-xs font-semibold rounded-xl bg-slate-900/60 hover:bg-white/5 border border-white/10 hover:border-white/20 text-white transition-all duration-300 ml-2 cursor-pointer disabled:opacity-50"
            onClick={handleLogout}
            disabled={logoutLoading}
          >
            {logoutLoading ? 'Logging out...' : 'Sign Out'}
          </button>
        </div>
      </header>

      {/* Dashboard Core Layout */}
      <div className="flex flex-col md:flex-row flex-1 gap-8 pt-8 pb-16">
        {/* Sidebar Nav */}
        <aside className="w-full md:w-60 shrink-0 flex flex-col gap-6 text-left">
          <div className="flex flex-col gap-1.5">
            <span className="text-[10px] font-bold text-gray-500 tracking-wider uppercase pl-3 mb-2">
              Navigation
            </span>
            <button 
              className={`w-full py-2.5 px-3 rounded-lg text-left text-sm font-semibold flex items-center gap-3 cursor-pointer transition-all duration-300 ${
                activeTab === 'overview' 
                  ? 'bg-white/5 text-brand-purple' 
                  : 'text-gray-400 hover:text-white hover:bg-white/1'
              }`}
              onClick={() => setActiveTab('overview')}
            >
              <span>📊</span> Overview & Stats
            </button>
            <button 
              className={`w-full py-2.5 px-3 rounded-lg text-left text-sm font-semibold flex items-center gap-3 cursor-pointer transition-all duration-300 ${
                activeTab === 'guide' 
                  ? 'bg-white/5 text-brand-purple' 
                  : 'text-gray-400 hover:text-white hover:bg-white/1'
              }`}
              onClick={() => setActiveTab('guide')}
            >
              <span>📚</span> Learn useAuth & APIs
            </button>
            <button 
              className={`w-full py-2.5 px-3 rounded-lg text-left text-sm font-semibold flex items-center gap-3 cursor-pointer transition-all duration-300 ${
                activeTab === 'library' 
                  ? 'bg-white/5 text-brand-purple' 
                  : 'text-gray-400 hover:text-white hover:bg-white/1'
              }`}
              onClick={() => setActiveTab('library')}
            >
              <span>📖</span> My EBooks
            </button>
            <button
            className={`w-full py-2.5 px-3 rounded-lg text-left text-sm font-semibold flex items-center gap-3 cursor-pointer transition-all duration-300 ${
                activeTab === 'practice' 
                  ? 'bg-white/5 text-brand-purple' 
                  : 'text-gray-400 hover:text-white hover:bg-white/1'
              }`}
            onClick={()=> setActiveTab('practice')}>
                <span></span>Practice
            </button>
          </div>

          {/* Info Card */}
          <div className="p-4 rounded-2xl bg-white/1 border border-white/5 mt-auto hidden md:block">
            <span className="text-[9px] font-bold text-gray-500 tracking-wider uppercase block mb-2">
              System Status
            </span>
            <div className="flex items-center gap-2 mb-1.5">
              <div className="w-2 h-2 rounded-full bg-emerald-400 shadow-sm shadow-emerald-400 animate-pulse" />
              <span className="text-xs font-semibold text-white">Connected to Postgres</span>
            </div>
            <p className="text-[10px] text-gray-500 leading-normal">
              Session persists via secure HTTP-Only Cookies.
            </p>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 text-left">
          {activeTab === 'overview' && (
            <section className="flex flex-col gap-8">
              <div className="p-6 md:p-8 rounded-2xl bg-gradient-to-br from-brand-purple/10 to-brand-cyan/5 border border-brand-purple/15 shadow-sm">
                <h1 className="font-heading text-2xl md:text-3xl font-extrabold text-white mb-1.5">
                  Welcome back, <span className="text-brand-purple">{user?.name}</span>!
                </h1>
                <p className="text-sm text-gray-400">
                  Your secure session is active. Create and manage your books from here.
                </p>
              </div>

              {/* Stats Counters Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="p-6 rounded-2xl bg-slate-900/40 backdrop-blur-xl border border-white/5 hover:border-brand-purple/10 transition-all duration-300 flex flex-col gap-2 shadow-md">
                  <span className="text-[10px] font-bold text-gray-500 tracking-wider uppercase">
                    EBooks Formatted
                  </span>
                  <span className="font-heading text-3xl font-extrabold text-white">3</span>
                  <span className="text-xs text-gray-500">All drafts active</span>
                </div>
                <div className="p-6 rounded-2xl bg-slate-900/40 backdrop-blur-xl border border-white/5 hover:border-brand-purple/10 transition-all duration-300 flex flex-col gap-2 shadow-md">
                  <span className="text-[10px] font-bold text-gray-500 tracking-wider uppercase">
                    Monthly Credits
                  </span>
                  <span className="font-heading text-3xl font-extrabold text-white">
                    47 <span className="text-sm font-medium text-gray-500">/ 50</span>
                  </span>
                  <span className="text-xs text-gray-500">Resets in 6 days</span>
                </div>
                <div className="p-6 rounded-2xl bg-slate-900/40 backdrop-blur-xl border border-white/5 hover:border-brand-purple/10 transition-all duration-300 flex flex-col gap-2 shadow-md">
                  <span className="text-[10px] font-bold text-gray-500 tracking-wider uppercase">
                    Session Status
                  </span>
                  <span className="font-heading text-3xl font-extrabold text-brand-cyan">Active</span>
                  <span className="text-xs text-gray-500">Role: Creator</span>
                </div>
              </div>

              {/* Creator Draft Card Panel (Locked dummy as requested) */}
              <div className="p-8 rounded-2xl bg-slate-900/40 backdrop-blur-xl border border-dashed border-white/10 flex flex-col gap-4">
                <div>
                  <h2 className="font-heading text-xl font-bold text-white mb-1">
                    ✨ Launch a New Masterpiece
                  </h2>
                  <p className="text-xs text-gray-400">
                    Generate high-fidelity chapters and covers. Enter a brief description or prompt below.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <input 
                    type="text" 
                    className="flex-1 bg-white/2 border border-white/5 rounded-xl px-4 py-3 text-sm text-white focus:outline-none placeholder:text-gray-600 cursor-not-allowed select-none" 
                    placeholder="Enter a book idea e.g., 'A cyberpunk thriller about a decentralized memory broker...'" 
                    disabled 
                  />
                  <button className="px-5 py-3 text-sm font-bold bg-white/5 text-gray-500 rounded-xl cursor-not-allowed select-none opacity-50 shrink-0" disabled>
                    Generate Outlines
                  </button>
                </div>
                <div className="text-[11px] text-gray-500 bg-white/1 px-4 py-2.5 rounded-lg border border-white/5 self-start">
                  💡 <strong>Notice:</strong> Draft Creation Button is temporarily locked under development mode as per settings.
                </div>
              </div>
            </section>
          )}

          {activeTab === 'guide' && (
            <section className="flex flex-col gap-8">
              <div>
                <h2 className="font-heading text-2xl md:text-3xl font-bold text-white mb-2">
                  How Authentication Works Under the Hood
                </h2>
                <p className="text-sm text-gray-400 leading-relaxed">
                  An interactive, step-by-step masterclass on React Hooks (<code>useAuth</code>, <code>useContext</code>) and Backend Auth API connectivity.
                </p>
              </div>

              {/* Guide Card 1 */}
              <div className="p-8 rounded-2xl bg-slate-900/40 backdrop-blur-xl border border-white/5 flex flex-col gap-4">
                <h3 className="font-heading text-lg font-bold text-brand-purple">
                  1. The Role of `useContext` and `AuthContext`
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  Normally, React passes data top-down via props. But for user sessions (authentication states), passing a <code>user</code> object manually through dozens of components is inefficient.
                </p>
                <p className="text-sm text-gray-400 leading-relaxed">
                  <strong>Solution:</strong> We create an <code>AuthContext</code>. It acts as a global store. Any component inside our app tree can immediately access <code>user</code>, <code>login</code>, or <code>logout</code> without needing props!
                </p>
                
                <span className="text-xs font-bold text-gray-500 font-mono mt-2">
                  frontend/src/context/AuthContext.jsx
                </span>
                <pre className="bg-[#0d0e14] border border-white/5 rounded-xl p-4 text-xs font-mono text-purple-400 overflow-x-auto text-left leading-relaxed">
{`// 1. We create the React Context
export const AuthContext = createContext(null);

// 2. We use React 19 value-propagation to expose states and functions
return <AuthContext value={{ user, login, logout }}>{children}</AuthContext>;`}
                </pre>
              </div>

              {/* Guide Card 2 */}
              <div className="p-8 rounded-2xl bg-slate-900/40 backdrop-blur-xl border border-white/5 flex flex-col gap-4">
                <h3 className="font-heading text-lg font-bold text-brand-purple">
                  2. The `useAuth` Custom Hook
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  Rather than writing <code>useContext(AuthContext)</code> in every component (which requires importing both <code>useContext</code> and <code>AuthContext</code>), we encapsulate it into a custom hook called <code>useAuth</code>.
                </p>
                
                <span className="text-xs font-bold text-gray-500 font-mono mt-2">
                  How we consume it inside pages:
                </span>
                <pre className="bg-[#0d0e14] border border-white/5 rounded-xl p-4 text-xs font-mono text-purple-400 overflow-x-auto text-left leading-relaxed">
{`import { useAuth } from '../context/AuthContext';

function MyComponent() {
  const { user, logout } = useAuth(); // Instant access to session state!
  return <h1>Hello, {user.name}</h1>;
}`}
                </pre>
              </div>

              {/* Guide Card 3 */}
              <div className="p-8 rounded-2xl bg-slate-900/40 backdrop-blur-xl border border-white/5 flex flex-col gap-4">
                <h3 className="font-heading text-lg font-bold text-brand-purple">
                  3. Calling Backend Auth APIs & Persisting Cookies
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  Our authentication uses **Secure HTTP-Only Cookies** set by the server. Here is how our frontend talks to the API endpoints:
                </p>
                <ul className="text-sm text-gray-400 leading-relaxed pl-5 list-disc flex flex-col gap-3">
                  <li>
                    <strong>Vite Proxy:</strong> Vite translates <code>fetch('/api/auth/login')</code> to <code>http://localhost:3000/api/auth/login</code> locally, avoiding CORS security issues.
                  </li>
                  <li>
                    <strong>Cookie Verification (`/api/auth/me`):</strong> On page load, `AuthContext` runs a <code>fetch('/api/auth/me')</code>. The browser automatically sends the secure HTTP-Only cookie. If valid, the user remains logged in!
                  </li>
                  <li>
                    <strong>Credential Security:</strong> The backend sets cookies. Because the requests are proxied internally on the same origin, cookies are exchanged securely and safely.
                  </li>
                </ul>
              </div>
            </section>
          )}

          {activeTab === 'library' && (
            <section className="flex flex-col gap-6">
              <div>
                <h2 className="font-heading text-2xl md:text-3xl font-bold text-white mb-2">
                  My EBooks Library
                </h2>
                <p className="text-sm text-gray-400 leading-relaxed">
                  Manage and read your generated masterpieces.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {mockBooks.map((book) => (
                  <div key={book.id} className="p-0 rounded-2xl bg-slate-900/40 backdrop-blur-xl border border-white/5 overflow-hidden flex flex-col h-[380px] hover:border-brand-purple/20 transition-all duration-300 shadow-md">
                    {/* Cover Sleeves */}
                    <div className={`h-[220px] p-4 flex flex-col relative border-b border-white/5 bg-gradient-to-br ${book.color}`}>
                      <div className="border border-white/10 rounded-lg h-full p-4 flex flex-col justify-between text-left">
                        <span className="bg-white/15 text-[#ffffff] text-[8px] font-extrabold px-2 py-0.5 rounded self-start uppercase tracking-wider">
                          {book.genre}
                        </span>
                        <h4 className="text-base font-extrabold text-white leading-snug">
                          {book.title}
                        </h4>
                        <span className="text-[9px] text-white/70 font-medium">
                          By {user?.name}
                        </span>
                      </div>
                    </div>
                    {/* Meta */}
                    <div className="p-4 flex-1 flex flex-col justify-between">
                      <h4 className="text-sm font-bold text-white truncate">
                        {book.title}
                      </h4>
                      <p className="text-[11px] text-gray-500 font-medium">
                        {book.chapters} Chapters • Created {book.date}
                      </p>
                      <div className="flex gap-2.5">
                        <button className="flex-1 py-2 text-[10px] font-bold bg-white/5 text-gray-500 rounded-lg cursor-not-allowed select-none opacity-50" disabled>Read</button>
                        <button className="flex-1 py-2 text-[10px] font-bold bg-white/5 text-gray-500 rounded-lg cursor-not-allowed select-none opacity-50" disabled>Download PDF</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </main>
      </div>

      <footer className="py-8 border-t border-white/5 text-center mt-auto">
        <p className="text-[11px] text-gray-500">
          Logged in securely as {user?.email} • AI EBook Creator 2026
        </p>
      </footer>
    </div>
  );
}
