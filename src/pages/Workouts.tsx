import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dumbbell, Clock, Flame, Play, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

const Workouts = () => {
  const workoutPrograms = [
    {
      id: 1,
      name: "Full Body Strength",
      duration: "45 min",
      calories: 420,
      difficulty: "Intermediate",
      exercises: 8,
      completed: true,
      color: "bg-blue-500",
    },
    {
      id: 2,
      name: "HIIT Cardio Blast",
      duration: "30 min",
      calories: 380,
      difficulty: "Advanced",
      exercises: 6,
      completed: false,
      color: "bg-orange-500",
    },
    {
      id: 3,
      name: "Yoga & Flexibility",
      duration: "40 min",
      calories: 180,
      difficulty: "Beginner",
      exercises: 12,
      completed: false,
      color: "bg-green-500",
    },
    {
      id: 4,
      name: "Core & Abs Workout",
      duration: "25 min",
      calories: 220,
      difficulty: "Intermediate",
      exercises: 10,
      completed: false,
      color: "bg-purple-500",
    },
  ];

  const todaysWorkout = {
    name: "Upper Body Power",
    exercises: [
      { name: "Push-ups", sets: 3, reps: 15, rest: "60s" },
      { name: "Dumbbell Press", sets: 4, reps: 12, rest: "90s" },
      { name: "Pull-ups", sets: 3, reps: 10, rest: "90s" },
      { name: "Shoulder Press", sets: 3, reps: 12, rest: "60s" },
      { name: "Bicep Curls", sets: 3, reps: 15, rest: "45s" },
    ],
  };

  const handleStartWorkout = (workoutName: string) => {
    toast.success(`Starting ${workoutName}! Let's go! 💪`);
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-2">Workouts</h1>
        <p className="text-muted-foreground text-lg">
          Choose your workout and start crushing your goals
        </p>
      </div>

      {/* Today's Workout */}
      <Card className="shadow-lg bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/20">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <Badge className="mb-2">Today's Workout</Badge>
              <CardTitle className="text-2xl">{todaysWorkout.name}</CardTitle>
              <CardDescription className="text-base mt-2">
                Complete this workout to stay on track with your goals
              </CardDescription>
            </div>
            <Button
              size="lg"
              onClick={() => handleStartWorkout(todaysWorkout.name)}
              className="bg-gradient-to-r from-primary to-secondary"
            >
              <Play className="mr-2 h-5 w-5" />
              Start Now
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {todaysWorkout.exercises.map((exercise, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 rounded-lg bg-card border"
              >
                <div className="flex items-center gap-4">
                  <div className="bg-primary/10 w-10 h-10 rounded-full flex items-center justify-center font-bold text-primary">
                    {index + 1}
                  </div>
                  <div>
                    <h4 className="font-semibold">{exercise.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      Rest: {exercise.rest}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold">
                    {exercise.sets} × {exercise.reps}
                  </div>
                  <div className="text-xs text-muted-foreground">sets × reps</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Workout Programs */}
      <div>
        <h2 className="text-2xl font-bold mb-4">All Workout Programs</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {workoutPrograms.map((workout) => (
            <Card key={workout.id} className="hover:shadow-lg transition-all">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <div className={`${workout.color} p-3 rounded-lg`}>
                      <Dumbbell className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-xl">{workout.name}</CardTitle>
                      <div className="flex gap-2 mt-2">
                        <Badge variant="secondary">{workout.difficulty}</Badge>
                        {workout.completed && (
                          <Badge className="bg-success">
                            <CheckCircle2 className="mr-1 h-3 w-3" />
                            Completed
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div className="text-center p-3 bg-muted rounded-lg">
                    <Clock className="h-5 w-5 mx-auto mb-1 text-primary" />
                    <div className="text-sm font-semibold">{workout.duration}</div>
                    <div className="text-xs text-muted-foreground">Duration</div>
                  </div>
                  <div className="text-center p-3 bg-muted rounded-lg">
                    <Flame className="h-5 w-5 mx-auto mb-1 text-orange-500" />
                    <div className="text-sm font-semibold">{workout.calories}</div>
                    <div className="text-xs text-muted-foreground">Calories</div>
                  </div>
                  <div className="text-center p-3 bg-muted rounded-lg">
                    <Dumbbell className="h-5 w-5 mx-auto mb-1 text-blue-500" />
                    <div className="text-sm font-semibold">{workout.exercises}</div>
                    <div className="text-xs text-muted-foreground">Exercises</div>
                  </div>
                </div>
                <Button
                  className="w-full"
                  onClick={() => handleStartWorkout(workout.name)}
                  variant={workout.completed ? "outline" : "default"}
                >
                  <Play className="mr-2 h-4 w-4" />
                  {workout.completed ? "Do Again" : "Start Workout"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Workouts;
