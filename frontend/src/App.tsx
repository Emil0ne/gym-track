import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AuthLayout from "./components/AuthLayout";
import Layout from "./components/Layout";
import PlanDetails from "./pages/PlanDetails";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {}
        <Route element={<AuthLayout />}>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        {}
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          {}
          <Route path="/plan/:id" element={<PlanDetails />} />
        </Route>

        {}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
