import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { TrendingDown, TrendingUp, Target, Award } from "lucide-react";

const ProgressPage = () => {
  const stats = [
    {
      label: "Weight Lost",
      value: "5.2 kg",
      change: "-8%",
      trend: "down",
      icon: TrendingDown,
      color: "text-green-500",
    },
    {
      label: "Muscle Gained",
      value: "2.1 kg",
      change: "+12%",
      trend: "up",
      icon: TrendingUp,
      color: "text-blue-500",
    },
    {
      label: "Body Fat",
      value: "18.5%",
      change: "-3%",
      trend: "down",
      icon: Target,
      color: "text-orange-500",
    },
    {
      label: "Workouts",
      value: "42",
      change: "+18%",
      trend: "up",
      icon: Award,
      color: "text-purple-500",
    },
  ];

  const weeklyProgress = [
    { day: "Mon", weight: 78.2, calories: 2200, workouts: 1 },
    { day: "Tue", weight: 78.0, calories: 2150, workouts: 1 },
    { day: "Wed", weight: 77.8, calories: 2180, workouts: 0 },
    { day: "Thu", weight: 77.6, calories: 2100, workouts: 1 },
    { day: "Fri", weight: 77.5, calories: 2250, workouts: 1 },
    { day: "Sat", weight: 77.3, calories: 2300, workouts: 1 },
    { day: "Sun", weight: 77.0, calories: 2180, workouts: 0 },
  ];

  const achievements = [
    { title: "First Week", desc: "Completed your first week", unlocked: true },
    { title: "5kg Milestone", desc: "Lost 5kg of weight", unlocked: true },
    { title: "Consistency King", desc: "7 days workout streak", unlocked: true },
    { title: "Early Bird", desc: "5 morning workouts", unlocked: false },
    { title: "Calorie Master", desc: "Hit calorie goal 30 times", unlocked: false },
    { title: "Iron Will", desc: "30 day workout streak", unlocked: false },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-2">Progress Tracking</h1>
        <p className="text-muted-foreground text-lg">
          Monitor your fitness journey and celebrate your achievements
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.label} className="hover:shadow-lg transition-all">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.label}
              </CardTitle>
              <stat.icon className={`h-5 w-5 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold mb-1">{stat.value}</div>
              <div className="flex items-center gap-1 text-sm">
                <span
                  className={
                    stat.trend === "up" ? "text-green-500" : "text-orange-500"
                  }
                >
                  {stat.change}
                </span>
                <span className="text-muted-foreground">from last month</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Progress Tabs */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl">Detailed Progress</CardTitle>
          <CardDescription>Track your weekly performance metrics</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="weight" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger value="weight">Weight</TabsTrigger>
              <TabsTrigger value="calories">Calories</TabsTrigger>
              <TabsTrigger value="workouts">Workouts</TabsTrigger>
            </TabsList>

            <TabsContent value="weight" className="space-y-4">
              <div className="space-y-3">
                {weeklyProgress.map((day) => (
                  <div
                    key={day.day}
                    className="flex items-center justify-between p-4 rounded-lg bg-muted/50"
                  >
                    <span className="font-semibold w-16">{day.day}</span>
                    <div className="flex-1 mx-4">
                      <Progress
                        value={((83 - day.weight) / (83 - 75)) * 100}
                        className="h-2"
                      />
                    </div>
                    <span className="font-bold text-lg w-20 text-right">
                      {day.weight} kg
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-6 p-4 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-1">6.0 kg</div>
                  <div className="text-muted-foreground">Total Weight Lost This Month</div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="calories" className="space-y-4">
              <div className="space-y-3">
                {weeklyProgress.map((day) => (
                  <div
                    key={day.day}
                    className="flex items-center justify-between p-4 rounded-lg bg-muted/50"
                  >
                    <span className="font-semibold w-16">{day.day}</span>
                    <div className="flex-1 mx-4">
                      <Progress value={(day.calories / 2500) * 100} className="h-2" />
                    </div>
                    <span className="font-bold text-lg w-24 text-right">
                      {day.calories} kcal
                    </span>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="workouts" className="space-y-4">
              <div className="space-y-3">
                {weeklyProgress.map((day) => (
                  <div
                    key={day.day}
                    className="flex items-center justify-between p-4 rounded-lg bg-muted/50"
                  >
                    <span className="font-semibold w-16">{day.day}</span>
                    <div className="flex-1 mx-4 flex gap-2">
                      {Array.from({ length: 2 }).map((_, i) => (
                        <div
                          key={i}
                          className={`h-8 flex-1 rounded ${
                            i < day.workouts ? "bg-primary" : "bg-muted"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="font-bold text-lg w-24 text-right">
                      {day.workouts} session{day.workouts !== 1 ? "s" : ""}
                    </span>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Achievements */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl">Achievements</CardTitle>
          <CardDescription>Your fitness milestones and badges</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {achievements.map((achievement, index) => (
              <div
                key={index}
                className={`p-6 rounded-lg border-2 transition-all ${
                  achievement.unlocked
                    ? "bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/30"
                    : "bg-muted/30 border-muted opacity-60"
                }`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`p-3 rounded-full ${
                      achievement.unlocked ? "bg-primary/20" : "bg-muted"
                    }`}
                  >
                    <Award
                      className={`h-6 w-6 ${
                        achievement.unlocked ? "text-primary" : "text-muted-foreground"
                      }`}
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold mb-1">{achievement.title}</h3>
                    <p className="text-sm text-muted-foreground">{achievement.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProgressPage;
