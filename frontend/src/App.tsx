import { useState } from "react";
import axios from "axios";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await axios.post("http://localhost:3000/auth/login", {
        email,
        password,
      });
      localStorage.setItem("token", res.data.access_token);
      alert("Essa! Zalogowano poprawnie!");
    } catch (e) {
      console.error(e);
      alert("Błędne dane lub brak połączenia z serwerem!");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-sm">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Dziennik Treningowy
        </h1>
        <div className="flex flex-col gap-4">
          <input
            className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Email (np. admin@admin.pl)"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="password"
            placeholder="Hasło"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className="mt-2 bg-blue-600 hover:bg-blue-700 text-white font-bold p-3 rounded-lg transition duration-200"
            onClick={handleLogin}
          >
            Zaloguj
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
