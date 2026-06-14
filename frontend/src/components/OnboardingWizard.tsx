import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";

interface DbExercise {
  id: string;
  nameEn: string;
  namePl: string;
  targetMuscle: string;
}

interface ExerciseConfig {
  id: string;
  nameEn: string;
  sets: number;
  reps: string;
  rest: number;
}

interface DayConfig {
  id: string;
  name: string;
  exercises: ExerciseConfig[];
}

interface OnboardingWizardProps {
  onComplete: (data: any) => void;
  isStandalone?: boolean;
  initialData?: { planName: string; days: DayConfig[] };
}

export default function OnboardingWizard({
  onComplete,
  isStandalone = false,
  initialData,
}: OnboardingWizardProps) {
  const [currentStep, setCurrentStep] = useState(isStandalone ? 2 : 1);
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("175");

  const [planName, setPlanName] = useState(initialData?.planName || "");
  const [planDays, setPlanDays] = useState<DayConfig[]>(
    initialData?.days || [],
  );

  const [dbExercises, setDbExercises] = useState<DbExercise[]>([]);
  const [activeDropdown, setActiveDropdown] = useState<{
    dayId: string;
    exId: string;
  } | null>(null);

  useEffect(() => {
    // Od razu logujemy do konsoli, żeby mieć pewność co tu wpada
    axios
      .get("http://localhost:3000/exercises")
      .then((res) => {
        console.log("Pobrane ćwiczenia z bazy:", res.data);
        setDbExercises(res.data);
      })
      .catch((err) =>
        console.error("Błąd pobierania ćwiczeń (blokada CORS?):", err),
      );
  }, []);

  const generateId = () => Math.random().toString(36).substring(2, 9);

  const handleNextToConfig = () => {
    if (planDays.length === 0) {
      setPlanDays([{ id: generateId(), name: "Day 1", exercises: [] }]);
    }
    setCurrentStep(3);
  };

  const handleFinish = () => {
    onComplete({
      weight: parseFloat(weight),
      height: parseFloat(height),
      planName,
      days: planDays,
    });
  };

  const addDay = () =>
    setPlanDays([
      ...planDays,
      { id: generateId(), name: `Day ${planDays.length + 1}`, exercises: [] },
    ]);
  const updateDayName = (dayId: string, newName: string) =>
    setPlanDays(
      planDays.map((d) => (d.id === dayId ? { ...d, name: newName } : d)),
    );
  const removeDay = (dayId: string) =>
    setPlanDays(planDays.filter((d) => d.id !== dayId));

  const addExercise = (dayId: string) => {
    const newExercise: ExerciseConfig = {
      id: generateId(),
      nameEn: "",
      sets: 3,
      reps: "8-12",
      rest: 120,
    };
    setPlanDays(
      planDays.map((d) =>
        d.id === dayId ? { ...d, exercises: [...d.exercises, newExercise] } : d,
      ),
    );
  };

  const updateExercise = (
    dayId: string,
    exId: string,
    field: keyof ExerciseConfig,
    value: string | number,
  ) => {
    setPlanDays(
      planDays.map((d) => {
        if (d.id === dayId) {
          return {
            ...d,
            exercises: d.exercises.map((ex) =>
              ex.id === exId ? { ...ex, [field]: value } : ex,
            ),
          };
        }
        return d;
      }),
    );
  };

  const removeExercise = (dayId: string, exId: string) => {
    setPlanDays(
      planDays.map((d) =>
        d.id === dayId
          ? { ...d, exercises: d.exercises.filter((ex) => ex.id !== exId) }
          : d,
      ),
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-950/90 backdrop-blur-md p-4 overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="bg-neutral-900 border border-neutral-800 rounded-3xl p-8 md:p-10 w-full max-w-4xl shadow-2xl relative my-8"
      >
        <div className="absolute top-0 left-0 w-full h-1.5 bg-neutral-800">
          <motion.div
            className="h-full bg-lime-500"
            initial={{ width: "33%" }}
            animate={{ width: `${(currentStep / 3) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>

        <AnimatePresence mode="wait">
          {currentStep === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="flex flex-col gap-6 max-w-xl mx-auto"
            >
              <div>
                <h2 className="text-3xl font-black text-white mb-2">
                  Zbudujmy Twój profil
                </h2>
                <p className="text-neutral-400 font-medium text-sm">
                  Podaj parametry startowe.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="number"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  className="w-full bg-neutral-800 border border-neutral-700 text-white p-4 rounded-xl focus:border-lime-500 outline-none"
                  placeholder="Waga (kg)"
                />
                <input
                  type="number"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  className="w-full bg-neutral-800 border border-neutral-700 text-white p-4 rounded-xl focus:border-lime-500 outline-none"
                  placeholder="Wzrost (cm)"
                />
              </div>
              <button
                onClick={() => setCurrentStep(2)}
                disabled={!weight || !height}
                className="mt-4 bg-lime-500 hover:bg-lime-400 text-neutral-950 font-black py-4 rounded-xl transition disabled:opacity-50"
              >
                Dalej
              </button>
            </motion.div>
          )}

          {currentStep === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="flex flex-col gap-6 max-w-xl mx-auto"
            >
              <div>
                <h2 className="text-3xl font-black text-white mb-2">
                  Nazwij swój plan
                </h2>
                <p className="text-neutral-400 font-medium text-sm">
                  Nadaj nazwę swojemu programowi, np. "Masa 2026" lub "Siła i
                  Hipertrofia".
                </p>
              </div>
              <input
                type="text"
                value={planName}
                onChange={(e) => setPlanName(e.target.value)}
                className="w-full bg-neutral-800 border border-neutral-700 text-white p-4 rounded-xl focus:border-lime-500 outline-none transition text-xl font-bold"
                placeholder="Nazwa planu..."
                autoFocus
              />
              <div className="flex gap-3 mt-4">
                <button
                  onClick={() => setCurrentStep(1)}
                  className="w-1/3 bg-neutral-800 text-white font-bold py-4 rounded-xl"
                >
                  Wróć
                </button>
                <button
                  onClick={handleNextToConfig}
                  disabled={!planName.trim()}
                  className="w-2/3 bg-lime-500 text-neutral-950 font-black py-4 rounded-xl disabled:opacity-50 transition"
                >
                  Konfiguruj Trening
                </button>
              </div>
            </motion.div>
          )}

          {currentStep === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="flex flex-col gap-6"
              onClick={() => setActiveDropdown(null)}
            >
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-3xl font-black text-white mb-2">
                    {planName}
                  </h2>
                  <p className="text-neutral-400 font-medium text-sm">
                    Masz pełną kontrolę. Dodawaj dni i konfiguruj ćwiczenia.
                  </p>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    addDay();
                  }}
                  className="bg-neutral-800 hover:bg-neutral-700 text-white px-4 py-2 rounded-lg font-bold text-sm border border-neutral-700 transition"
                >
                  + Dodaj Dzień
                </button>
              </div>

              <div className="max-h-[50vh] overflow-y-auto pr-2 pb-32 space-y-6 custom-scrollbar relative">
                {planDays.map((day) => (
                  <div
                    key={day.id}
                    className="bg-neutral-950 border border-neutral-800 p-5 rounded-2xl relative group"
                  >
                    <div className="flex justify-between items-center mb-4">
                      <input
                        type="text"
                        value={day.name}
                        onChange={(e) => updateDayName(day.id, e.target.value)}
                        className="bg-transparent text-xl font-black text-lime-500 outline-none border-b border-transparent focus:border-lime-500 w-1/2 transition"
                        placeholder="Nazwa dnia (np. Upper, Leg Day)"
                      />
                      <button
                        onClick={() => removeDay(day.id)}
                        className="text-neutral-600 hover:text-red-500 transition text-sm font-bold"
                      >
                        Usuń Dzień
                      </button>
                    </div>

                    <div className="space-y-3">
                      {day.exercises.length > 0 && (
                        <div className="grid grid-cols-12 gap-2 text-[10px] font-bold text-neutral-500 uppercase tracking-wider px-2">
                          <div className="col-span-5">Exercise (English)</div>
                          <div className="col-span-2 text-center">Sets</div>
                          <div className="col-span-2 text-center">Reps</div>
                          <div className="col-span-2 text-center">Rest (s)</div>
                          <div className="col-span-1 text-center">X</div>
                        </div>
                      )}

                      {day.exercises.map((ex) => {
                        // Twarde, odporne na błędy filtrowanie
                        const filteredExercises = dbExercises.filter((dbEx) => {
                          const searchStr = ex.nameEn.toLowerCase();
                          return (
                            dbEx.nameEn.toLowerCase().includes(searchStr) ||
                            dbEx.namePl.toLowerCase().includes(searchStr)
                          );
                        });

                        const isDropdownOpen =
                          activeDropdown?.dayId === day.id &&
                          activeDropdown?.exId === ex.id;

                        return (
                          <div
                            key={ex.id}
                            className="grid grid-cols-12 gap-2 items-center bg-neutral-900 p-2 rounded-xl border border-neutral-800"
                          >
                            {/* PANCERNY AUTOCOMPLETE */}
                            <div
                              className="col-span-5 relative"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <input
                                type="text"
                                value={ex.nameEn}
                                placeholder="Wyszukaj (np. wyci...)"
                                onFocus={() =>
                                  setActiveDropdown({
                                    dayId: day.id,
                                    exId: ex.id,
                                  })
                                }
                                onChange={(e) => {
                                  updateExercise(
                                    day.id,
                                    ex.id,
                                    "nameEn",
                                    e.target.value,
                                  );
                                  setActiveDropdown({
                                    dayId: day.id,
                                    exId: ex.id,
                                  });
                                }}
                                className="w-full bg-neutral-800 text-white text-sm px-3 py-2 rounded-lg outline-none focus:ring-1 focus:ring-lime-500"
                              />

                              <AnimatePresence>
                                {isDropdownOpen && (
                                  <motion.div
                                    initial={{ opacity: 0, y: -5 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -5 }}
                                    className="absolute z-[9999] top-[calc(100%+4px)] left-0 w-[150%] max-h-56 overflow-y-auto bg-neutral-800 border border-neutral-600 rounded-xl shadow-2xl custom-scrollbar"
                                  >
                                    {dbExercises.length === 0 ? (
                                      <div className="p-4 text-center text-xs font-bold text-red-400">
                                        Brak połączenia z bazą (CORS). Zresetuj
                                        backend!
                                      </div>
                                    ) : filteredExercises.length > 0 ? (
                                      <ul>
                                        {filteredExercises.map((dbEx) => (
                                          <li
                                            key={dbEx.id}
                                            onClick={() => {
                                              updateExercise(
                                                day.id,
                                                ex.id,
                                                "nameEn",
                                                dbEx.nameEn,
                                              );
                                              setActiveDropdown(null);
                                            }}
                                            className="px-4 py-3 hover:bg-neutral-700 cursor-pointer flex flex-col border-b border-neutral-700/50 last:border-0 transition-colors"
                                          >
                                            <span className="text-white font-bold text-sm">
                                              {dbEx.nameEn}
                                            </span>
                                            <span className="text-neutral-400 text-[10px] mt-1">
                                              {dbEx.namePl}
                                            </span>
                                          </li>
                                        ))}
                                      </ul>
                                    ) : (
                                      <div className="p-4 text-center text-xs text-neutral-400">
                                        Nie znaleziono ćwiczenia: "{ex.nameEn}"
                                      </div>
                                    )}
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>

                            <input
                              type="number"
                              value={ex.sets}
                              onChange={(e) =>
                                updateExercise(
                                  day.id,
                                  ex.id,
                                  "sets",
                                  parseInt(e.target.value) || 0,
                                )
                              }
                              className="col-span-2 bg-neutral-800 text-white text-sm px-3 py-2 rounded-lg outline-none focus:ring-1 focus:ring-lime-500 text-center"
                            />
                            <input
                              type="text"
                              value={ex.reps}
                              placeholder="8-10"
                              onChange={(e) =>
                                updateExercise(
                                  day.id,
                                  ex.id,
                                  "reps",
                                  e.target.value,
                                )
                              }
                              className="col-span-2 bg-neutral-800 text-white text-sm px-3 py-2 rounded-lg outline-none focus:ring-1 focus:ring-lime-500 text-center"
                            />
                            <input
                              type="number"
                              value={ex.rest}
                              onChange={(e) =>
                                updateExercise(
                                  day.id,
                                  ex.id,
                                  "rest",
                                  parseInt(e.target.value) || 0,
                                )
                              }
                              className="col-span-2 bg-neutral-800 text-white text-sm px-3 py-2 rounded-lg outline-none focus:ring-1 focus:ring-lime-500 text-center"
                            />
                            <button
                              onClick={() => removeExercise(day.id, ex.id)}
                              className="col-span-1 text-neutral-500 hover:text-red-500 text-lg font-bold"
                            >
                              ×
                            </button>
                          </div>
                        );
                      })}
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        addExercise(day.id);
                      }}
                      className="mt-4 text-xs font-bold text-lime-500 hover:text-lime-400 uppercase tracking-wider"
                    >
                      + Dodaj Ćwiczenie
                    </button>
                  </div>
                ))}

                {planDays.length === 0 && (
                  <div className="text-center py-10 text-neutral-500 text-sm font-medium border border-dashed border-neutral-800 rounded-2xl">
                    Kliknij "Dodaj Dzień" na górze, aby rozpocząć tworzenie
                    planu.
                  </div>
                )}
              </div>

              <div className="flex gap-3 pt-4 border-t border-neutral-800 mt-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentStep(2);
                  }}
                  className="w-1/4 bg-neutral-800 hover:bg-neutral-700 text-white font-bold py-4 rounded-xl transition"
                >
                  Wróć
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleFinish();
                  }}
                  disabled={planDays.length === 0}
                  className="w-3/4 bg-lime-500 hover:bg-lime-400 text-neutral-950 font-black py-4 rounded-xl transition disabled:opacity-50"
                >
                  Zapisz Mój Plan
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
