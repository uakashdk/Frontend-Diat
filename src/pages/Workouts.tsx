import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dumbbell,
  Clock,
  Flame,
  Play,
  Pause,
  Square,
} from "lucide-react";

import { toast } from "sonner";

const Workouts = () => {
  const [selectedWorkout, setSelectedWorkout] = useState<any>(null);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [history, setHistory] = useState<any[]>([]);

  const workoutPrograms = [
    {
      id: 1,
      name: "Full Body Strength",
      duration: 45,
      calories: 420,
      difficulty: "Intermediate",
      exercises: 8,
      color: "bg-blue-500",
    },
    {
      id: 2,
      name: "HIIT Cardio",
      duration: 30,
      calories: 380,
      difficulty: "Advanced",
      exercises: 6,
      color: "bg-orange-500",
    },
    {
      id: 3,
      name: "Yoga",
      duration: 40,
      calories: 180,
      difficulty: "Beginner",
      exercises: 12,
      color: "bg-green-500",
    },
  ];

  // ⏱ TIMER LOGIC
  useEffect(() => {
    let timer: any;

    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev: number) => prev - 1);
      }, 1000);
    }

    if (timeLeft === 0 && isRunning) {
      handleStop();
    }

    return () => clearInterval(timer);
  }, [isRunning, timeLeft]);

  const startWorkout = (workout: any) => {
    setSelectedWorkout(workout);
    setTimeLeft(workout.duration * 60);
    setIsRunning(true);

    toast.success(`Started ${workout.name} 💪`);
  };

  const handlePause = () => {
    setIsRunning(false);
  };

  const handleResume = () => {
    setIsRunning(true);
  };

  const handleStop = () => {
    setIsRunning(false);

    if (selectedWorkout) {
      const completedMinutes =
        selectedWorkout.duration -
        Math.floor(timeLeft / 60);

      setHistory((prev) => [
        {
          name: selectedWorkout.name,
          minutes: completedMinutes,
          date: new Date().toLocaleString(),
        },
        ...prev,
      ]);

      toast.success("Workout Completed 🎉");
    }

    setSelectedWorkout(null);
    setTimeLeft(0);
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  return (
    <div className="p-6 space-y-8">

      {/* HEADER */}
      <div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Workout Zone
        </h1>
        <p className="text-muted-foreground">
          Train smart. Track better. 🚀
        </p>
      </div>

      {/* ACTIVE WORKOUT */}
      {selectedWorkout && (
        <Card className="p-6 bg-gradient-to-br from-primary/20 to-secondary/20 border border-white/10 backdrop-blur-xl shadow-2xl">

          <div className="flex justify-between items-center">

            <div>
              <h2 className="text-2xl font-bold">
                {selectedWorkout.name}
              </h2>
              <p className="text-muted-foreground">
                Live workout in progress
              </p>
            </div>

            <div className="text-4xl font-bold text-primary">
              {formatTime(timeLeft)}
            </div>

          </div>

          <div className="flex gap-3 mt-6">

            {!isRunning ? (
              <Button onClick={handleResume}>
                <Play className="mr-2" />
                Resume
              </Button>
            ) : (
              <Button onClick={handlePause} variant="outline">
                <Pause className="mr-2" />
                Pause
              </Button>
            )}

            <Button
              variant="destructive"
              onClick={handleStop}
            >
              <Square className="mr-2" />
              Stop
            </Button>

          </div>

        </Card>
      )}

      {/* WORKOUT LIST */}
      <div className="grid md:grid-cols-3 gap-6">
        {workoutPrograms.map((w) => (
          <Card
            key={w.id}
            className="group hover:scale-105 transition-all bg-white/5 border border-white/10 backdrop-blur-xl"
          >
            <CardHeader>
              <div className="flex gap-3">
                <div className={`${w.color} p-3 rounded-xl`}>
                  <Dumbbell className="text-white" />
                </div>

                <div>
                  <CardTitle>{w.name}</CardTitle>
                  <Badge variant="secondary">{w.difficulty}</Badge>
                </div>
              </div>
            </CardHeader>

            <CardContent>

              <div className="grid grid-cols-3 gap-3 mb-4">

                <div className="text-center">
                  <Clock className="mx-auto text-primary" />
                  <p>{w.duration}m</p>
                </div>

                <div className="text-center">
                  <Flame className="mx-auto text-orange-400" />
                  <p>{w.calories}</p>
                </div>

                <div className="text-center">
                  <Dumbbell className="mx-auto text-blue-400" />
                  <p>{w.exercises}</p>
                </div>

              </div>

              <Button
                className="w-full bg-gradient-to-r from-primary to-secondary"
                onClick={() => startWorkout(w)}
              >
                <Play className="mr-2" />
                Start Workout
              </Button>

            </CardContent>
          </Card>
        ))}
      </div>

      {/* HISTORY */}
      <div>
        <h2 className="text-2xl font-bold mb-4">
          Workout History
        </h2>

        {history.length === 0 && (
          <p className="text-muted-foreground">
            No workouts yet
          </p>
        )}

        <div className="space-y-3">
          {history.map((h, i) => (
            <Card
              key={i}
              className="p-4 bg-white/5 border border-white/10"
            >
              <div className="flex justify-between">
                <div>
                  <p className="font-semibold">{h.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {h.date}
                  </p>
                </div>

                <p className="text-primary font-bold">
                  {h.minutes} min
                </p>
              </div>
            </Card>
          ))}
        </div>

      </div>

    </div>
  );
};

export default Workouts;