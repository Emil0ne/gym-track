import { useState, useEffect } from "react";
import axios from "axios";
import OnboardingWizard from "../components/OnboardingWizard";

export default function Dashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const [isFirstLogin, setIsFirstLogin] = useState(false);

  useEffect(() => {
    const checkUserProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const res = await axios.get("http://localhost:3000/users/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const user = res.data;

        // Jeśli użytkownik NIE MA wpisanego wzrostu LUB nie ma żadnego planu:
        if (
          !user.height ||
          !user.workoutPlans ||
          user.workoutPlans.length === 0
        ) {
          setIsFirstLogin(true);
        }
      } catch (error) {
        console.error("Błąd podczas weryfikacji profilu:", error);
      } finally {
        setIsLoading(false);
      }
    };

    checkUserProfile();
  }, []);

  const handleOnboardingComplete = async (data: {
    weight: number;
    height: number;
    planName: string;
    days: any[];
  }) => {
    try {
      const token = localStorage.getItem("token");

      await axios.post("http://localhost:3000/users/onboarding", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setIsFirstLogin(false);
    } catch (error) {
      console.error("Błąd podczas zapisywania profilu:", error);
      alert("Coś poszło nie tak podczas zapisu planu.");
    }
  };

  // Zabezpieczenie przed "mignięciem" kreatora, gdy czekamy na odpowiedź z bazy
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lime-500 font-bold animate-pulse">
          Ładowanie profilu...
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto animate-fade-in relative">
      {/* JEŚLI TO PIERWSZE LOGOWANIE, POKAŻ WIZARD */}
      {isFirstLogin && (
        <OnboardingWizard onComplete={handleOnboardingComplete} />
      )}

      <header className="mb-12">
        <h1 className="text-4xl font-black text-white mb-2">Dashboard</h1>
        <p className="text-neutral-400 font-medium text-lg">
          Witaj z powrotem. Gotowy na kolejny trening?
        </p>
      </header>

      {/* ... Reszta Twojego Dashboardu ... */}

      {/* RESZTA TWOJEGO DASHBOARDU (Kafelki, baner, itp.) */}
      {/* ... (Zostaw ten sam kod statystyk i baneru z poprzedniej wersji) ... */}
    </div>
  );
}
