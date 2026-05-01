import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getAllMealPlans, deleteMealPlan } from "@/Services/DietPlanService";
import { Coffee, Sun, Moon, CloudMoon, Plus, Pencil, Trash } from "lucide-react";
import toast from "react-hot-toast";

const iconMap: any = {
  Breakfast: Coffee,
  Lunch: Sun,
  Dinner: Moon,
  Snack: CloudMoon,
};

const DietPlan = () => {
  const [meals, setMeals] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchMeals = async () => {
    try {
      setLoading(true);
      const res = await getAllMealPlans();
      setMeals(res?.data || []);
    } catch {
      toast.error("Failed to load meals");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMeals();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await deleteMealPlan(id);
      toast.success("Meal deleted");
      fetchMeals();
    } catch {
      toast.error("Delete failed");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/40 to-background p-6">

      {/* 🔥 Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">

        <div>
          <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Diet Dashboard
          </h1>
          <p className="text-muted-foreground mt-1">
            Track, manage and optimize your nutrition 🍽️
          </p>
        </div>

        <Button
          onClick={() => navigate("/add-meal")}
          className="bg-gradient-to-r from-primary to-secondary hover:scale-105 transition-all shadow-lg flex gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Meal
        </Button>
      </div>

      {/* 🔥 Stats Section */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Meals", value: meals.length },
          { label: "Calories", value: meals.reduce((a, b) => a + (b.calories || 0), 0) },
          { label: "Protein", value: meals.reduce((a, b) => a + (b.protein || 0), 0) },
          { label: "Carbs", value: meals.reduce((a, b) => a + (b.carbs || 0), 0) },
        ].map((stat) => (
          <Card key={stat.label} className="bg-card/70 backdrop-blur-xl border border-white/10">
            <CardContent className="p-4">
              <p className="text-muted-foreground text-sm">{stat.label}</p>
              <p className="text-2xl font-bold">{stat.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* 🔥 Loading */}
      {loading && (
        <div className="flex justify-center mt-20">
          <div className="w-10 h-10 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
        </div>
      )}

      {/* 🔥 Empty State */}
      {!loading && meals.length === 0 && (
        <div className="text-center mt-20 text-muted-foreground">
          <p className="text-lg">No meals added yet 😔</p>
          <Button
            onClick={() => navigate("/add-meal")}
            className="mt-4"
          >
            Add your first meal
          </Button>
        </div>
      )}

      {/* 🔥 Meal Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {meals.map((meal) => {
          const Icon = iconMap[meal.mealType] || Coffee;

          return (
            <Card
              key={meal._id}
              className="group relative overflow-hidden bg-card/80 backdrop-blur-xl border border-white/10 hover:shadow-2xl hover:scale-[1.02] transition-all duration-300"
            >
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 opacity-0 group-hover:opacity-100 transition" />

              <CardContent className="relative p-5 space-y-4">

                {/* Top */}
                <div className="flex justify-between items-start">
                  <div>
                    <Badge className="mb-2">{meal.mealType}</Badge>
                    <h2 className="font-semibold text-lg">{meal.foodName}</h2>
                  </div>

                  <div className="p-2 rounded-lg bg-primary/10">
                    <Icon className="text-primary w-5 h-5" />
                  </div>
                </div>

                {/* Calories */}
                <div>
                  <p className="text-xs text-muted-foreground">Calories</p>
                  <p className="text-3xl font-bold text-primary">
                    {meal.calories}
                  </p>
                </div>

                {/* Macros */}
                <div className="flex justify-between text-sm">
                  <div>
                    <p className="text-muted-foreground text-xs">Protein</p>
                    <p className="font-semibold">{meal.protein}g</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-xs">Carbs</p>
                    <p className="font-semibold">{meal.carbs}g</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-xs">Fats</p>
                    <p className="font-semibold">{meal.fats}g</p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex justify-end gap-2 pt-3 border-t border-white/10">

                  <Button
                    size="icon"
                    variant="outline"
                    onClick={() => navigate(`/update-meal/${meal._id}`)}
                    className="hover:bg-primary/10"
                  >
                    <Pencil className="w-4 h-4" />
                  </Button>

                  <Button
                    size="icon"
                    variant="destructive"
                    onClick={() => handleDelete(meal._id)}
                  >
                    <Trash className="w-4 h-4" />
                  </Button>

                </div>

              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default DietPlan;