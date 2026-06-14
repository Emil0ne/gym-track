import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const navigate = useNavigate();

  const hasMinLength = password.length >= 8;
  const hasUppercase = /[A-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  
  const passwordStrength = [hasMinLength, hasUppercase, hasNumber, hasSpecialChar].filter(Boolean).length;
  const isPasswordValid = passwordStrength === 4;

  let strengthColor = "bg-neutral-700";
  if (passwordStrength === 1) strengthColor = "bg-red-500";
  else if (passwordStrength === 2) strengthColor = "bg-orange-500";
  else if (passwordStrength === 3) strengthColor = "bg-yellow-500";
  else if (passwordStrength === 4) strengthColor = "bg-lime-500";

  const calculateAge = (dob: string) => {
    if (!dob) return 0;
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) age--;
    return age;
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return setErrorMessage("Podaj poprawny format adresu e-mail.");
    if (!isPasswordValid) return setErrorMessage("Hasło nie spełnia wymagań.");
    if (password !== confirmPassword) return setErrorMessage("Hasła nie są identyczne.");
    if (calculateAge(dateOfBirth) < 16) return setErrorMessage("Musisz mieć ukończone 16 lat.");

    setIsLoading(true);
    try {
      await axios.post("http://localhost:3000/auth/register", {
        email, password, firstName, lastName, dateOfBirth
      });
      setSuccessMessage(true);
      setTimeout(() => navigate("/"), 2500);
    } catch (err) {
      if (axios.isAxiosError(err) && err.response?.status === 429) {
        setErrorMessage("Zbyt wiele prób rejestracji. Zwolnij trochę!");
      } else {
        setErrorMessage("Błąd rejestracji. Sprawdź dane lub email jest zajęty.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="w-full max-w-sm mx-auto"
    >
      <h2 className="text-3xl font-black text-white mb-2">Utwórz konto</h2>
      <p className="text-neutral-400 mb-6 font-medium text-sm">Rozpocznij swoją drogę po lepszą formę</p>
      
      {errorMessage && <div className="mb-4 p-3 bg-red-500/10 border border-red-500/50 rounded-xl text-red-400 text-sm text-center font-bold">{errorMessage}</div>}
      {successMessage && <div className="mb-4 p-3 bg-lime-500/10 border border-lime-500/50 rounded-xl text-lime-400 text-sm text-center font-bold">Konto utworzone! Zaraz będziesz mógł się zalogować...</div>}
      
      <form onSubmit={handleRegister} className="flex flex-col gap-3">
        <div className="grid grid-cols-2 gap-3">
          <div className="relative">
            <input type="text" id="firstName" required className="peer w-full bg-neutral-800 border border-neutral-700 text-white px-3 pt-5 pb-1 rounded-xl focus:border-lime-500 outline-none transition placeholder-transparent" placeholder="Imię" onChange={(e) => setFirstName(e.target.value)} />
            <label htmlFor="firstName" className="absolute left-3 top-1 text-[10px] font-bold text-neutral-400 uppercase tracking-wider transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm peer-placeholder-shown:normal-case peer-focus:top-1 peer-focus:text-[10px] peer-focus:uppercase peer-focus:text-lime-500">Imię</label>
          </div>
          <div className="relative">
            <input type="text" id="lastName" required className="peer w-full bg-neutral-800 border border-neutral-700 text-white px-3 pt-5 pb-1 rounded-xl focus:border-lime-500 outline-none transition placeholder-transparent" placeholder="Nazwisko" onChange={(e) => setLastName(e.target.value)} />
            <label htmlFor="lastName" className="absolute left-3 top-1 text-[10px] font-bold text-neutral-400 uppercase tracking-wider transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm peer-placeholder-shown:normal-case peer-focus:top-1 peer-focus:text-[10px] peer-focus:uppercase peer-focus:text-lime-500">Nazwisko</label>
          </div>
        </div>
        
        <div className="relative">
          <input type="date" id="dateOfBirth" required className="peer w-full bg-neutral-800 border border-neutral-700 text-neutral-300 px-3 pt-5 pb-1 rounded-xl focus:border-lime-500 outline-none transition [color-scheme:dark]" onChange={(e) => setDateOfBirth(e.target.value)} />
          <label htmlFor="dateOfBirth" className="absolute left-3 top-1 text-[10px] font-bold text-neutral-400 uppercase tracking-wider">Data urodzenia</label>
          {dateOfBirth && calculateAge(dateOfBirth) < 16 && (
            <p className="text-red-500 text-xs mt-1 font-bold pl-1">Musisz mieć minimum 16 lat.</p>
          )}
        </div>

        <div className="relative">
          <input type="email" id="regEmail" required className="peer w-full bg-neutral-800 border border-neutral-700 text-white px-3 pt-5 pb-1 rounded-xl focus:border-lime-500 outline-none transition placeholder-transparent" placeholder="Adres e-mail" onChange={(e) => setEmail(e.target.value)} />
          <label htmlFor="regEmail" className="absolute left-3 top-1 text-[10px] font-bold text-neutral-400 uppercase tracking-wider transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm peer-placeholder-shown:normal-case peer-focus:top-1 peer-focus:text-[10px] peer-focus:uppercase peer-focus:text-lime-500">Adres e-mail</label>
        </div>
        
        <div>
          <div className="relative">
            <input type={showPassword ? "text" : "password"} id="regPassword" required className="peer w-full bg-neutral-800 border border-neutral-700 text-white px-3 pt-5 pb-1 pr-16 rounded-xl focus:border-lime-500 outline-none transition placeholder-transparent" placeholder="Hasło" onChange={(e) => setPassword(e.target.value)} />
            <label htmlFor="regPassword" className="absolute left-3 top-1 text-[10px] font-bold text-neutral-400 uppercase tracking-wider transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm peer-placeholder-shown:normal-case peer-focus:top-1 peer-focus:text-[10px] peer-focus:uppercase peer-focus:text-lime-500">Hasło</label>
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-lime-500 text-xs font-bold uppercase tracking-wider z-10">
              {showPassword ? "Ukryj" : "Pokaż"}
            </button>
          </div>
          
          {password && (
            <div className="mt-2 p-3 bg-neutral-950 rounded-xl border border-neutral-800">
              <div className="h-1 w-full bg-neutral-800 rounded-full mb-2 overflow-hidden">
                <div className={`h-full transition-all duration-300 ${strengthColor}`} style={{ width: `${(passwordStrength / 4) * 100}%` }}></div>
              </div>
              <ul className="text-[11px] font-bold space-y-1">
                <li className={hasMinLength ? "text-lime-500" : "text-red-500"}>{hasMinLength ? "✓" : "✗"} Minimum 8 znaków</li>
                <li className={hasUppercase ? "text-lime-500" : "text-red-500"}>{hasUppercase ? "✓" : "✗"} Duża litera</li>
                <li className={hasNumber ? "text-lime-500" : "text-red-500"}>{hasNumber ? "✓" : "✗"} Cyfra</li>
                <li className={hasSpecialChar ? "text-lime-500" : "text-red-500"}>{hasSpecialChar ? "✓" : "✗"} Znak specjalny</li>
              </ul>
            </div>
          )}
        </div>

        <div className="relative">
          <input type={showConfirmPassword ? "text" : "password"} id="confirmPassword" required className="peer w-full bg-neutral-800 border border-neutral-700 text-white px-3 pt-5 pb-1 pr-16 rounded-xl focus:border-lime-500 outline-none transition placeholder-transparent" placeholder="Powtórz hasło" onChange={(e) => setConfirmPassword(e.target.value)} />
          <label htmlFor="confirmPassword" className="absolute left-3 top-1 text-[10px] font-bold text-neutral-400 uppercase tracking-wider transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm peer-placeholder-shown:normal-case peer-focus:top-1 peer-focus:text-[10px] peer-focus:uppercase peer-focus:text-lime-500">Powtórz hasło</label>
          <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-lime-500 text-xs font-bold uppercase tracking-wider z-10">
            {showConfirmPassword ? "Ukryj" : "Pokaż"}
          </button>
        </div>
        
        <button type="submit" disabled={isLoading || successMessage} className="mt-2 w-full bg-lime-500 hover:bg-lime-400 text-neutral-950 font-black py-3 rounded-xl transition disabled:opacity-50">
          {isLoading ? "Rejestracja..." : "Utwórz konto"}
        </button>

        <p className="text-neutral-400 text-xs text-center mt-1 font-medium">
          Masz już konto? <Link to="/" className="text-lime-500 font-bold hover:underline transition">Zaloguj się</Link>
        </p>
      </form>
    </motion.div>
  );
}