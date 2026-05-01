import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import DietPlan from "./pages/DietPlan";
import Workouts from "./pages/Workouts";
import ProgressPage from "./pages/Progress";
import Settings from "./pages/Settings";
import DashboardLayout from "./layouts/DashboardLayout";
import NotFound from "./pages/NotFound";
import Register from "./pages/Register";
import AddMeal from "./pages/AddMeal";
import UpdateMeal from "./pages/UpdateMeal";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Register />} />
          <Route path="/" element={<Login />} />
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/diet" element={<DietPlan />} />
            <Route path="/workouts" element={<Workouts />} />
            <Route path="/progress" element={<ProgressPage />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/add-meal" element={<AddMeal />} />
            <Route path="/update-meal/:id" element={<UpdateMeal />} /> {/* NEW ROUTE FOR UPDATING MEAL */ }
          </Route>
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
