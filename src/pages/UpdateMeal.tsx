import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Activity, Pencil } from "lucide-react";
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
import { getMealPlan, updateMealPlan } from "../Services/DietPlanService";
import toast from "react-hot-toast";

const UpdateMeal = () => {
  const { id } = useParams();
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
  const [fetching, setFetching] = useState(true);

  // 🔥 Fetch existing meal
  useEffect(() => {
    const fetchMeal = async () => {
      try {
        const res = await getMealPlan(id!);

        const meal = res;

        setFormData({
          mealType: meal.mealType,
          foodName: meal.foodName,
          calories: meal.calories,
          protein: meal.protein,
          carbs: meal.carbs,
          fats: meal.fats,
          quantity: meal.quantity,
        });

      } catch {
        toast.error("Failed to load meal");
      } finally {
        setFetching(false);
      }
    };

    if (id) fetchMeal();
  }, [id]);

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 🔥 Update API
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      setLoading(true);

      await updateMealPlan(id!, formData);

      toast.success("Meal updated successfully ✨");

      navigate("/dashboard");

    } catch {
      toast.error("Update failed ❌");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return <div className="text-center mt-20">Loading meal...</div>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary via-secondary to-accent p-4">

      <Card className="w-full max-w-lg shadow-2xl backdrop-blur-xl bg-card/90 border border-white/10">

        <CardHeader className="text-center">
          <div className="flex justify-center mb-3">
            <div className="bg-primary p-4 rounded-full shadow-lg">
              <Pencil className="text-white" />
            </div>
          </div>

          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Update Meal
          </CardTitle>

          <CardDescription>
            Modify your nutrition details
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">

            {/* Meal Type */}
            <select
              name="mealType"
              value={formData.mealType}
              onChange={handleChange}
              className="w-full h-11 rounded-md bg-muted px-3 text-sm focus:ring-2 focus:ring-primary"
            >
              <option>Breakfast</option>
              <option>Lunch</option>
              <option>Dinner</option>
              <option>Snack</option>
            </select>

            {/* Food Name */}
            <div>
              <Label>Food Name</Label>
              <Input name="foodName" value={formData.foodName} onChange={handleChange} />
            </div>

            {/* Calories */}
            <div>
              <Label>Calories</Label>
              <Input type="number" name="calories" value={formData.calories} onChange={handleChange} />
            </div>

            {/* Quantity */}
            <div>
              <Label>Quantity</Label>
              <Input type="number" name="quantity" value={formData.quantity} onChange={handleChange} />
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
              className="w-full h-11 bg-gradient-to-r from-primary to-secondary hover:opacity-90"
              disabled={loading}
            >
              {loading ? "Updating..." : "Update Meal"}
            </Button>

          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default UpdateMeal;