import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AuthLayout from "./components/AuthLayout";
import Layout from "./components/Layout";
import PlanDetails from "./pages/PlanDetails";
import TrainingPlans from "./pages/TrainingPlans"; // <-- DODANY IMPORT

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Trasy publiczne */}
        <Route element={<AuthLayout />}>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        {/* Trasy chronione (z menu bocznym zdefiniowanym w Layout) */}
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/workout-plans" element={<TrainingPlans />} /> {/* <-- DODANA ŚCIEŻKA */}
          <Route path="/plan/:id" element={<PlanDetails />} />
        </Route>

        {/* Fallback - jeśli nie ma takiej strony, wyrzuć do logowania */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;