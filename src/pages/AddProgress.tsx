import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Target } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

import { createGoal } from "../Services/GoalService";
import toast from "react-hot-toast";

const AddProgress = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    goalType: "loss",
    startWeight: "",
    targetWeight: "",
    targetCalories: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!formData.startWeight || !formData.targetWeight) {
      toast.error("Please fill required fields");
      return;
    }

    try {
      setLoading(true);

      const res = await createGoal(formData);

      if (!res?.data && !res?.success) {
        throw new Error();
      }

      toast.success("Goal created successfully 🎯");

      navigate("/progress");

    } catch {
      toast.error("Failed to create goal ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary via-secondary to-accent p-4">

      {/* 🔥 Card */}
      <Card className="w-full max-w-lg shadow-2xl backdrop-blur-xl bg-card/90 border border-white/10">

        {/* Header */}
        <CardHeader className="text-center space-y-2">
          <div className="flex justify-center mb-3">
            <div className="bg-primary p-4 rounded-full shadow-lg">
              <Target className="text-white w-6 h-6" />
            </div>
          </div>

          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Set Your Goal
          </CardTitle>

          <CardDescription>
            Define your fitness journey and stay focused 🚀
          </CardDescription>
        </CardHeader>

        {/* Form */}
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">

            {/* Goal Type */}
            <div>
              <Label>Goal Type</Label>
              <select
                name="goalType"
                value={formData.goalType}
                onChange={handleChange}
                className="w-full h-11 rounded-md bg-muted px-3 text-sm focus:ring-2 focus:ring-primary"
              >
                <option value="loss">Weight Loss</option>
                <option value="gain">Weight Gain</option>
                <option value="maintain">Maintain</option>
              </select>
            </div>

            {/* Start Weight */}
            <div>
              <Label>Start Weight (kg)</Label>
              <Input
                type="number"
                name="startWeight"
                value={formData.startWeight}
                onChange={handleChange}
                placeholder="e.g. 80"
              />
            </div>

            {/* Target Weight */}
            <div>
              <Label>Target Weight (kg)</Label>
              <Input
                type="number"
                name="targetWeight"
                value={formData.targetWeight}
                onChange={handleChange}
                placeholder="e.g. 70"
              />
            </div>

            {/* Calories */}
            <div>
              <Label>Target Calories (optional)</Label>
              <Input
                type="number"
                name="targetCalories"
                value={formData.targetCalories}
                onChange={handleChange}
                placeholder="e.g. 2000"
              />
            </div>

            {/* Submit */}
            <Button
              type="submit"
              className="w-full h-11 bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-all transform hover:scale-[1.02]"
              disabled={loading}
            >
              {loading ? "Saving..." : "Create Goal"}
            </Button>

          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddProgress;