import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setIsLoading(true);

    try {
      const res = await axios.post("http://localhost:3000/auth/login", { email, password });
      localStorage.setItem("token", res.data.access_token);
      navigate("/dashboard");
    } catch (e) {
      if (axios.isAxiosError(e) && e.response?.status === 429) {
        setErrorMessage("Zbyt wiele prób logowania. Spróbuj ponownie za chwilę.");
      } else {
        setErrorMessage("Błędne dane lub brak takiego konta w bazie.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="w-full max-w-sm mx-auto"
    >
      <h2 className="text-4xl font-black text-white mb-2">Witaj ponownie</h2>
      <p className="text-neutral-400 mb-8 font-medium">Zaloguj się, aby rozpocząć trening</p>

      {errorMessage && (
        <div className="mb-6 p-3 bg-red-500/10 border border-red-500/50 rounded-xl text-red-400 text-sm text-center font-bold">
          {errorMessage}
        </div>
      )}

      <form onSubmit={handleLogin} className="flex flex-col gap-5">
        
        {/* FLOATING LABEL - EMAIL */}
        <div className="relative">
          <input
            type="email"
            id="email"
            className="peer w-full bg-neutral-800 border border-neutral-700 text-white px-4 pt-6 pb-2 rounded-xl focus:border-lime-500 focus:ring-1 focus:ring-lime-500 outline-none transition placeholder-transparent"
            placeholder="Adres e-mail"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label 
            htmlFor="email" 
            className="absolute left-4 top-2 text-xs font-bold text-neutral-400 uppercase tracking-wider transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-placeholder-shown:normal-case peer-focus:top-2 peer-focus:text-xs peer-focus:uppercase peer-focus:text-lime-500 cursor-text"
          >
            Adres e-mail
          </label>
        </div>
        
        {/* FLOATING LABEL - HASŁO Z PODGLĄDEM */}
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            className="peer w-full bg-neutral-800 border border-neutral-700 text-white px-4 pt-6 pb-2 pr-16 rounded-xl focus:border-lime-500 focus:ring-1 focus:ring-lime-500 outline-none transition placeholder-transparent"
            placeholder="Hasło"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <label 
            htmlFor="password" 
            className="absolute left-4 top-2 text-xs font-bold text-neutral-400 uppercase tracking-wider transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-placeholder-shown:normal-case peer-focus:top-2 peer-focus:text-xs peer-focus:uppercase peer-focus:text-lime-500 cursor-text"
          >
            Hasło
          </label>
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-lime-500 text-xs font-bold uppercase tracking-wider transition z-10"
          >
            {showPassword ? "Ukryj" : "Pokaż"}
          </button>
        </div>
        
        <button
          type="submit"
          disabled={isLoading}
          className="mt-2 w-full bg-lime-500 hover:bg-lime-400 text-neutral-950 font-black text-lg py-4 rounded-xl transition disabled:opacity-50"
        >
          {isLoading ? "Logowanie..." : "Zaloguj się"}
        </button>

        <p className="text-neutral-400 text-sm text-center mt-2 font-medium">
          Nie masz jeszcze konta?{" "}
          <Link to="/register" className="text-lime-500 font-bold hover:underline transition">
            Zarejestruj się
          </Link>
        </p>
      </form>
    </motion.div>
  );
}