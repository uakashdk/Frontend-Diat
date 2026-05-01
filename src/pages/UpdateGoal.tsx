import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Target, Save } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import toast from "react-hot-toast";
import { getGoalById, updateGoal } from "@/Services/GoalService";

const UpdateGoal = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    goalType: "loss",
    startWeight: "",
    targetWeight: "",
    currentWeight: "",
    targetCalories: "",
  });

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  // 🔥 Fetch Goal Data
  useEffect(() => {
    const fetchGoal = async () => {
      try {
        const res = await getGoalById(id!);

        const goal = res?.data;

        setFormData({
          goalType: goal.goalType,
          startWeight: goal.startWeight,
          targetWeight: goal.targetWeight,
          currentWeight: goal.currentWeight,
          targetCalories: goal.targetCalories,
        });

      } catch (err) {
        toast.error("Failed to load goal");
      } finally {
        setFetching(false);
      }
    };

    if (id) fetchGoal();
  }, [id]);

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 🔥 Update Goal
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      setLoading(true);

      await updateGoal(id!, formData);

      toast.success("Goal updated successfully 🎯");

      navigate("/progress");

    } catch {
      toast.error("Update failed ❌");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="h-screen flex items-center justify-center text-lg">
        Loading goal...
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary via-secondary to-accent p-4 relative overflow-hidden">

      {/* Background Glow */}
      <div className="absolute inset-0">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-primary/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-secondary/20 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <Card className="w-full max-w-xl z-10 backdrop-blur-xl bg-card/90 border border-white/10 shadow-2xl">

        <CardHeader className="text-center space-y-2">
          <div className="flex justify-center mb-3">
            <div className="bg-primary p-4 rounded-full shadow-lg">
              <Target className="text-white" />
            </div>
          </div>

          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Update Goal
          </CardTitle>

          <CardDescription>
            Refine your fitness target 🚀
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">

            {/* Goal Type */}
            <select
              name="goalType"
              value={formData.goalType}
              onChange={handleChange}
              className="w-full h-11 rounded-md bg-muted px-3 focus:ring-2 focus:ring-primary"
            >
              <option value="loss">Weight Loss</option>
              <option value="gain">Weight Gain</option>
              <option value="maintain">Maintain</option>
            </select>

            {/* Weights */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>Start Weight</Label>
                <Input
                  type="number"
                  name="startWeight"
                  value={formData.startWeight}
                  onChange={handleChange}
                />
              </div>

              <div>
                <Label>Current Weight</Label>
                <Input
                  type="number"
                  name="currentWeight"
                  value={formData.currentWeight}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <Label>Target Weight</Label>
              <Input
                type="number"
                name="targetWeight"
                value={formData.targetWeight}
                onChange={handleChange}
              />
            </div>

            {/* Calories */}
            <div>
              <Label>Target Calories</Label>
              <Input
                type="number"
                name="targetCalories"
                value={formData.targetCalories}
                onChange={handleChange}
              />
            </div>

            {/* Submit */}
            <Button
              type="submit"
              disabled={loading}
              className="w-full h-11 bg-gradient-to-r from-primary to-secondary hover:opacity-90 flex items-center justify-center gap-2"
            >
              {loading ? "Updating..." : (
                <>
                  <Save className="w-4 h-4" />
                  Update Goal
                </>
              )}
            </Button>

          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default UpdateGoal;