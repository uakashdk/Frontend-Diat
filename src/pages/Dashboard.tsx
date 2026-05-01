import { useEffect, useState } from "react";
import api from "@/Services/axios";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Flame, Target, TrendingUp, Apple } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import toast from "react-hot-toast";

const Dashboard = () => {
  const [data, setData] = useState<any>(null);

  // 🔥 Fetch Dashboard Data
  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await api.get("/admin/dashboard");
        setData(res.data.data);
      } catch {
        toast.error("Failed to load dashboard");
      }
    };

    fetchDashboard();
  }, []);

  if (!data) {
    return (
      <div className="h-screen flex items-center justify-center">
        Loading dashboard...
      </div>
    );
  }

  // 🔥 Dynamic Stats
  const stats = [
    {
      title: "Calories Today",
      value: data.todayCalories,
      unit: "kcal",
      icon: Flame,
      color: "text-orange-500",
      bgColor: "bg-orange-500/10",
    },
    {
      title: "Goal Progress",
      value: data.calorieProgress,
      unit: "%",
      icon: Target,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
    },
    {
      title: "Weight Change",
      value: data.weightChange,
      unit: "kg",
      icon: TrendingUp,
      color: data.weightChange < 0 ? "text-green-500" : "text-red-500",
      bgColor: "bg-green-500/10",
    },
    {
      title: "Current Weight",
      value: data.currentWeight,
      unit: "kg",
      icon: TrendingUp,
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
    },
  ];

  return (
    <div className="space-y-8">

      {/* HERO */}
      <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-primary to-secondary p-8 text-white shadow-xl">
        <h1 className="text-4xl font-bold mb-2">
          Welcome Back 🎯
        </h1>
        <p className="opacity-90">
          You are {data.calorieProgress}% towards your goal today
        </p>
      </div>

      {/* STATS */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.title} className="hover:shadow-xl transition">
            <CardHeader className="flex justify-between">
              <CardTitle className="text-sm text-muted-foreground">
                {stat.title}
              </CardTitle>
              <div className={`${stat.bgColor} p-2 rounded-lg`}>
                <stat.icon className={stat.color} />
              </div>
            </CardHeader>

            <CardContent>
              <div className="text-3xl font-bold">
                {stat.value}
                <span className="text-sm ml-1 text-muted-foreground">
                  {stat.unit}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* CALORIE PROGRESS */}
      <Card>
        <CardHeader>
          <CardTitle>Daily Calories</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="flex justify-between text-sm mb-2">
            <span>{data.todayCalories} kcal</span>
            <span>{data.targetCalories} kcal</span>
          </div>

          <Progress value={data.calorieProgress} className="h-3" />
        </CardContent>
      </Card>

      {/* RECENT MEALS */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Meals</CardTitle>
        </CardHeader>

        <CardContent className="space-y-3">
          {data.recentMeals.length === 0 && (
            <p className="text-muted-foreground">
              No meals logged today
            </p>
          )}

          {data.recentMeals.map((meal: any) => (
            <div
              key={meal._id}
              className="flex justify-between p-3 rounded-lg bg-muted/50"
            >
              <div className="flex items-center gap-3">
                <Apple className="text-green-500" />
                <div>
                  <p className="font-medium">{meal.foodName}</p>
                  <p className="text-xs text-muted-foreground">
                    {meal.mealType}
                  </p>
                </div>
              </div>

              <p className="font-bold">{meal.calories} kcal</p>
            </div>
          ))}
        </CardContent>
      </Card>

    </div>
  );
};

export default Dashboard;