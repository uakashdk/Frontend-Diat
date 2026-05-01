import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Activity, Apple, Flame } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { createMealPlan } from "../Services/DietPlanService";
import toast from "react-hot-toast";

const AddMeal = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    mealType: "Breakfast",
    foodName: "",
    calories: "",
    protein: "",
    carbs: "",
    fats: "",
    quantity: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.foodName || !formData.calories || !formData.quantity) {
      toast.error("Please fill required fields");
      return;
    }

    try {
      setLoading(true);

      const res = await createMealPlan(formData);

      toast.success(res?.message || "Meal added successfully 🍽️");

      // Reset form
      setFormData({
        mealType: "Breakfast",
        foodName: "",
        calories: "",
        protein: "",
        carbs: "",
        fats: "",
        quantity: "",
      });

    } catch (err: any) {
      toast.error(err?.message || "Something went wrong ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary via-secondary to-accent p-4 relative overflow-hidden">

      {/* Background Glow */}
      <div className="absolute inset-0">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-primary/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-secondary/20 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      {/* Floating Icons */}
      <div className="absolute top-16 left-16 animate-bounce">
        <Apple className="w-12 h-12 text-white/30" />
      </div>
      <div className="absolute bottom-20 right-20 animate-bounce delay-500">
        <Flame className="w-12 h-12 text-white/30" />
      </div>

      {/* Card */}
      <Card className="w-full max-w-lg relative z-10 shadow-2xl backdrop-blur-xl bg-card/90 border border-white/10">
        <CardHeader className="text-center space-y-2">
          <div className="flex justify-center mb-4">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/30 rounded-full blur-xl" />
              <div className="relative bg-primary p-4 rounded-full shadow-lg">
                <Activity className="w-8 h-8 text-primary-foreground" />
              </div>
            </div>
          </div>

          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Add Your Meal
          </CardTitle>

          <CardDescription>
            Track your nutrition and stay on target
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">

            {/* Meal Type */}
            <select
              name="mealType"
              value={formData.mealType}
              onChange={handleChange}
              className="w-full h-11 rounded-md bg-muted px-3 text-sm focus:ring-2 focus:ring-primary transition"
            >
              <option>Breakfast</option>
              <option>Lunch</option>
              <option>Dinner</option>
              <option>Snack</option>
            </select>

            {/* Food Name */}
            <div className="space-y-1">
              <Label>Food Name</Label>
              <Input
                name="foodName"
                value={formData.foodName}
                onChange={handleChange}
                placeholder="Chicken Salad"
              />
            </div>

            {/* Calories */}
            <div className="space-y-1">
              <Label>Calories</Label>
              <Input
                type="number"
                name="calories"
                value={formData.calories}
                onChange={handleChange}
                placeholder="350"
              />
            </div>

            {/* Quantity */}
            <div className="space-y-1">
              <Label>Quantity</Label>
              <Input
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                placeholder="1"
              />
            </div>

            {/* Macros */}
            <div className="grid grid-cols-3 gap-3">
              <Input type="number" name="protein" value={formData.protein} onChange={handleChange} placeholder="Protein" />
              <Input type="number" name="carbs" value={formData.carbs} onChange={handleChange} placeholder="Carbs" />
              <Input type="number" name="fats" value={formData.fats} onChange={handleChange} placeholder="Fats" />
            </div>

            {/* Submit */}
            <Button
              type="submit"
              disabled={loading}
              className="w-full h-11 text-base font-semibold bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-all transform hover:scale-[1.02] shadow-lg"
            >
              {loading ? "Adding..." : "Add Meal"}
            </Button>

          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddMeal;