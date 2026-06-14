import { useState, useEffect } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import OnboardingWizard from "../components/OnboardingWizard";

interface PlanExercise {
  id: string;
  dayName: string;
  exerciseName: string;
  targetSets: number;
  targetReps: string;
  restSeconds: number | null;
}

interface WorkoutPlan {
  id: string;
  name: string;
  createdAt: string;
  exercises: PlanExercise[];
}

export default function TrainingPlans() {
  const [plans, setPlans] = useState<WorkoutPlan[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingPlan, setEditingPlan] = useState<WorkoutPlan | null>(null);

  const fetchPlans = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:3000/training-plans", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPlans(res.data);
    } catch (err) {
      console.error("Błąd pobierania planów:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  const handleDelete = async (id: string) => {
    if (
      !confirm("Czy na pewno chcesz bezpowrotnie usunąć ten plan treningowy?")
    )
      return;
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:3000/training-plans/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPlans(plans.filter((p) => p.id !== id));
    } catch (err) {
      console.error("Błąd podczas usuwania planu:", err);
    }
  };

  const handleEditorComplete = async (data: any) => {
    try {
      const token = localStorage.getItem("token");
      if (editingPlan) {
        // Aktualizacja obecnego planu
        await axios.put(
          `http://localhost:3000/training-plans/${editingPlan.id}`,
          data,
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );
      } else {
        // Tworzenie nowego planu
        await axios.post("http://localhost:3000/training-plans", data, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }
      setIsEditorOpen(false);
      setEditingPlan(null);
      fetchPlans(); // Odświeżamy listę planów
    } catch (err) {
      console.error("Błąd zapisu planu:", err);
    }
  };

  // Grupowanie ćwiczeń według dni, aby wyświetlić ładne podsumowanie na kafelku
  const groupExercisesByDay = (exercises: PlanExercise[]) => {
    const groups: { [key: string]: PlanExercise[] } = {};
    exercises.forEach((ex) => {
      if (!groups[ex.dayName]) groups[ex.dayName] = [];
      groups[ex.dayName].push(ex);
    });
    return groups;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lime-500 font-bold animate-pulse">
          Wczytywanie planów...
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto animate-fade-in p-4">
      <header className="flex justify-between items-center mb-12">
        <div>
          <h1 className="text-4xl font-black text-white mb-2">
            Plany Treningowe
          </h1>
          <p className="text-neutral-400 font-medium text-lg">
            Zarządzaj swoją objętością i strukturą hipertroficzną.
          </p>
        </div>
        <button
          onClick={() => {
            setEditingPlan(null);
            setIsEditorOpen(true);
          }}
          className="bg-lime-500 hover:bg-lime-400 text-neutral-950 font-black px-6 py-3 rounded-xl transition shadow-lg shadow-lime-500/10"
        >
          + Nowy Plan
        </button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {plans.map((plan) => {
          const groupedDays = groupExercisesByDay(plan.exercises);
          return (
            <motion.div
              key={plan.id}
              className="bg-neutral-900 border border-neutral-800 rounded-3xl p-6 flex flex-col justify-between shadow-xl"
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
            >
              <div>
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-2xl font-black text-white">
                    {plan.name}
                  </h2>
                  <span className="text-xs font-bold text-neutral-500 bg-neutral-950 px-3 py-1 rounded-full border border-neutral-800">
                    {Object.keys(groupedDays).length} dni
                  </span>
                </div>

                {/* Zarys dni treningowych na kafelku */}
                <div className="space-y-4 my-6">
                  {Object.entries(groupedDays).map(([dayName, exercises]) => (
                    <div
                      key={dayName}
                      className="bg-neutral-950/50 rounded-xl p-3 border border-neutral-800/50"
                    >
                      <h3 className="text-sm font-black text-lime-500 mb-1">
                        {dayName}
                      </h3>
                      <p className="text-xs text-neutral-400 truncate">
                        {exercises.map((e) => e.exerciseName).join(", ")}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-3 pt-4 border-t border-neutral-800/60 mt-auto">
                <button
                  onClick={() => {
                    setEditingPlan(plan);
                    setIsEditorOpen(true);
                  }}
                  className="w-1/2 bg-neutral-800 hover:bg-neutral-700 text-white font-bold py-3 rounded-xl transition text-center text-sm"
                >
                  Edytuj strukturę
                </button>
                <button
                  onClick={() => handleDelete(plan.id)}
                  className="w-1/2 bg-neutral-950 hover:bg-red-950/30 border border-neutral-800 hover:border-red-900 text-neutral-400 hover:text-red-400 font-bold py-3 rounded-xl transition text-sm"
                >
                  Usuń Plan
                </button>
              </div>
            </motion.div>
          );
        })}

        {plans.length === 0 && (
          <div className="col-span-2 text-center py-16 border-2 border-dashed border-neutral-800 rounded-3xl text-neutral-500 font-medium">
            Brak aktywnych planów. Kliknij przycisk "+ Nowy Plan", aby zbudować
            swój pierwszy podział.
          </div>
        )}
      </div>

      {/* MODAL KREATORA / EDYTORA */}
      <AnimatePresence>
        {isEditorOpen && (
          <OnboardingWizard
            onComplete={handleEditorComplete}
            isStandalone={true}
            initialData={
              editingPlan
                ? {
                    planName: editingPlan.name,
                    days: Object.entries(
                      groupExercisesByDay(editingPlan.exercises),
                    ).map(([name, exercises]) => ({
                      id: Math.random().toString(36).substring(2, 9),
                      name,
                      exercises: exercises.map((e) => ({
                        id: e.id,
                        nameEn: e.exerciseName,
                        sets: e.targetSets,
                        reps: e.targetReps,
                        rest: e.restSeconds || 0, // Zabezpieczenie przed nullem
                      })),
                    })),
                  }
                : undefined
            }
          />
        )}
      </AnimatePresence>
    </div>
  );
}
