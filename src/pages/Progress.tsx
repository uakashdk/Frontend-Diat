import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  TrendingDown,
  TrendingUp,
  Target,
  Award,
  Plus,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { getGoal, updateWeight } from "../Services/GoalService";
import toast from "react-hot-toast";

const ProgressPage = () => {
  const navigate = useNavigate();
  const [goal, setGoal] = useState<any>(null);
  const [newWeight, setNewWeight] = useState("");
  const [updating, setUpdating] = useState(false);

  // 🔥 Fetch Goal
  useEffect(() => {
    const fetchGoal = async () => {
      try {
        const res = await getGoal();
        setGoal(res);
      } catch {
        toast.error("Failed to load goal");
      }
    };
    fetchGoal();
  }, []);
  const progressPercent = goal
    ? ((goal.currentWeight - goal.startWeight) /
      (goal.targetWeight - goal.startWeight)) *
    100
    : 0;

  const handleWeightUpdate = async () => {
    if (!newWeight) {
      toast.error("Enter weight first");
      return;
    }

    try {
      setUpdating(true);

      const res = await updateWeight({
        currentWeight: Number(newWeight),
      });

      if (res?.data) {
        toast.success(res.message || "Weight updated 🚀");

        setGoal((prev: any) => ({
          ...prev,
          currentWeight: Number(newWeight),
        }));

        setNewWeight("");
      } else {
        toast.error(res?.message || "Update failed");
      }

    } catch {
      toast.error("Update failed");
    } finally {
      setUpdating(false);
    }
  };
  return (
    <div className="p-6 space-y-8">

      {/* 🔥 HEADER */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Progress Dashboard
          </h1>
          <p className="text-muted-foreground">
            Track your transformation journey 🚀
          </p>
        </div>

        <div className="flex gap-3">

          {/* ➕ Create Goal */}
          <Button
            onClick={() => navigate("/add-progress")}
            className="bg-gradient-to-r from-primary to-secondary flex gap-2"
          >
            <Plus className="w-4 h-4" />
            Set Goal
          </Button>

          {/* ✏️ Update Goal (only if exists) */}
          {goal && (
            <Button
              variant="outline"
              onClick={() => navigate(`/update-goal/${goal._id}`)}
              className="border-primary text-primary hover:bg-primary/10"
            >
              Update Goal
            </Button>
          )}

        </div>
      </div>

      {/* 🔥 GOAL CARD */}
      {goal && (
        <Card className="relative overflow-hidden p-6 rounded-2xl bg-gradient-to-br from-primary/10 via-secondary/10 to-transparent border border-white/10 backdrop-blur-xl shadow-2xl">

          {/* Glow Effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 blur-3xl opacity-20" />

          <div className="relative z-10">

            {/* Header */}
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold">Your Goal 🎯</h2>
                <p className="text-muted-foreground capitalize">
                  {goal.goalType} transformation
                </p>
              </div>

              <Button
                onClick={() => navigate(`/update-goal/${goal._id}`)}
                className="bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20"
              >
                Update
              </Button>
            </div>


            {/* Stats */}
            <div className="grid grid-cols-4 gap-6 mt-6">

              <div>
                <p className="text-xs text-muted-foreground">Start</p>
                <p className="text-xl font-bold">{goal.startWeight} kg</p>
              </div>

              <div>
                <p className="text-xs text-muted-foreground">Current</p>
                <p className="text-xl font-bold text-yellow-400">
                  {goal.currentWeight} kg
                </p>
              </div>

              <div>
                <p className="text-xs text-muted-foreground">Target</p>
                <p className="text-xl font-bold text-primary">
                  {goal.targetWeight} kg
                </p>
              </div>

              <div>
                <p className="text-xs text-muted-foreground">Calories</p>
                <p className="text-xl font-bold">
                  {goal.targetCalories} kcal
                </p>
              </div>

            </div>

            <div className="mt-6 p-4 rounded-2xl bg-gradient-to-r from-white/5 to-white/10 backdrop-blur-xl border border-white/10 shadow-inner">

              <p className="text-sm text-muted-foreground mb-2">
                Update Today's Weight
              </p>

              <div className="flex items-center gap-3">

                <input
                  type="number"
                  placeholder="e.g. 72 kg"
                  value={newWeight}
                  onChange={(e) => setNewWeight(e.target.value)}
                  className="flex-1 h-11 rounded-xl bg-black/20 border border-white/10 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary placeholder:text-gray-400"
                />

                <Button
                  onClick={handleWeightUpdate}
                  disabled={updating}
                  className="h-11 px-6 rounded-xl bg-gradient-to-r from-primary to-secondary shadow-lg hover:scale-105 transition-all duration-300"
                >
                  {updating ? "Updating..." : "Save"}
                </Button>

              </div>
            </div>

            {/* 🔥 REAL PROGRESS BAR */}
            <div className="mt-6">
              <div className="flex justify-between text-sm mb-2">
                <span>Progress</span>
                <span>{Math.round(progressPercent)}%</span>
              </div>

              <div className="h-3 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-500"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

          </div>
        </Card>
      )}

      {/* 🔥 STATS (IMPROVED UI) */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

        <Card className="p-5 backdrop-blur-xl bg-card/80 border border-white/10 hover:scale-[1.02] transition">
          <div className="flex justify-between">
            <p className="text-muted-foreground">Weight Lost</p>
            <TrendingDown className="text-green-500" />
          </div>
          <h2 className="text-3xl font-bold mt-2">5.2 kg</h2>
        </Card>

        <Card className="p-5 backdrop-blur-xl bg-card/80 border border-white/10 hover:scale-[1.02] transition">
          <div className="flex justify-between">
            <p className="text-muted-foreground">Muscle</p>
            <TrendingUp className="text-blue-500" />
          </div>
          <h2 className="text-3xl font-bold mt-2">2.1 kg</h2>
        </Card>

        <Card className="p-5 backdrop-blur-xl bg-card/80 border border-white/10 hover:scale-[1.02] transition">
          <div className="flex justify-between">
            <p className="text-muted-foreground">Body Fat</p>
            <Target className="text-orange-500" />
          </div>
          <h2 className="text-3xl font-bold mt-2">18%</h2>
        </Card>

        <Card className="p-5 backdrop-blur-xl bg-card/80 border border-white/10 hover:scale-[1.02] transition">
          <div className="flex justify-between">
            <p className="text-muted-foreground">Workouts</p>
            <Award className="text-purple-500" />
          </div>
          <h2 className="text-3xl font-bold mt-2">42</h2>
        </Card>

      </div>

      {/* 🔥 SIMPLE PROGRESS BAR (cleaner) */}
      <Card className="p-6 shadow-xl">
        <h2 className="text-xl font-semibold mb-4">Weight Progress</h2>

        <Progress value={65} className="h-3" />

        <div className="flex justify-between mt-2 text-sm text-muted-foreground">
          <span>Start</span>
          <span>Current</span>
          <span>Target</span>
        </div>
      </Card>

    </div>
  );
};

export default ProgressPage;