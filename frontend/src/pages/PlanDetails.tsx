import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function PlanDetails() {
  const { id } = useParams(); // Pobiera ID planu z paska adresu URL
  const navigate = useNavigate();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [plan, setPlan] = useState<any>(null);

  // Formularz ćwiczenia
  const [exerciseName, setExerciseName] = useState('');
  const [targetSets, setTargetSets] = useState<number>(4);
  const [targetReps, setTargetReps] = useState('8-10');

  const fetchPlanDetails = async () => {
    const token = localStorage.getItem('token');
    try {
      const res = await axios.get(`http://localhost:3000/training-plans/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setPlan(res.data);
    } catch (error) {
      console.error('Błąd pobierania planu', error);
      navigate('/dashboard');
    }
  };

  useEffect(() => {
    fetchPlanDetails();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleAddExercise = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!exerciseName.trim()) return;

    try {
      const token = localStorage.getItem('token');
      await axios.post(
        'http://localhost:3000/plan-exercises',
        {
          planId: id,
          exerciseName,
          targetSets: Number(targetSets),
          targetReps,
          restSeconds: 90 // Domyślna przerwa na start
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      setExerciseName('');
      fetchPlanDetails(); // Odświeżamy widok, żeby pokazać nowe ćwiczenie
    } catch (error) {
      console.error('Błąd dodawania ćwiczenia', error);
    }
  };

  if (!plan) return <div className="p-8 font-bold text-gray-500">Ładowanie planu...</div>;

  return (
    <div className="max-w-4xl">
      <button onClick={() => navigate('/dashboard')} className="text-blue-600 font-semibold mb-6 hover:underline">
        &larr; Wróć do planów
      </button>

      <h1 className="text-3xl font-bold text-gray-800 mb-2">{plan.name}</h1>
      {plan.description && <p className="text-gray-600 mb-8">{plan.description}</p>}

      {/* Formularz nowego ćwiczenia */}
      <div className="bg-gray-50 border border-gray-200 p-6 rounded-2xl mb-8">
        <h2 className="text-lg font-bold text-gray-700 mb-4">Dodaj ćwiczenie</h2>
        <form onSubmit={handleAddExercise} className="flex flex-col md:flex-row gap-4">
          <input 
            type="text" placeholder="Nazwa (np. Wyciskanie na ławce)" value={exerciseName}
            onChange={(e) => setExerciseName(e.target.value)}
            className="flex-2 border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-blue-500 bg-white"
          />
          <input 
            type="number" placeholder="Serie (np. 4)" value={targetSets}
            onChange={(e) => setTargetSets(Number(e.target.value))}
            className="w-24 border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-blue-500 bg-white"
          />
          <input 
            type="text" placeholder="Powtórzenia (np. 8-10)" value={targetReps}
            onChange={(e) => setTargetReps(e.target.value)}
            className="flex-1 border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-blue-500 bg-white"
          />
          <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3 rounded-xl">
            Dodaj
          </button>
        </form>
      </div>

      {/* Lista ćwiczeń */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        {plan.exercises?.length === 0 ? (
          <p className="p-6 text-gray-500 text-center">Brak ćwiczeń. Czas zbudować ten trening!</p>
        ) : (
          <ul className="divide-y divide-gray-200">
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            {plan.exercises?.map((ex: any, index: number) => (
              <li key={ex.id} className="p-4 hover:bg-gray-50 flex items-center gap-4 transition">
                <div className="bg-blue-100 text-blue-600 font-bold rounded-full w-8 h-8 flex items-center justify-center shrink-0">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-800 text-lg">{ex.exerciseName}</h3>
                </div>
                <div className="text-right bg-gray-100 px-4 py-2 rounded-lg">
                  <span className="font-bold text-gray-700">{ex.targetSets}</span> serie 
                  <span className="mx-2 text-gray-300">|</span> 
                  <span className="font-bold text-gray-700">{ex.targetReps}</span> powt.
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}