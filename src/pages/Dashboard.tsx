import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Flame, Target, TrendingUp, Heart, Apple, Dumbbell } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const Dashboard = () => {
  const stats = [
    {
      title: "Calories Burned",
      value: "2,450",
      unit: "kcal",
      icon: Flame,
      color: "text-orange-500",
      bgColor: "bg-orange-500/10",
    },
    {
      title: "Daily Goal",
      value: "85",
      unit: "%",
      icon: Target,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
    },
    {
      title: "Weight Progress",
      value: "-5.2",
      unit: "kg",
      icon: TrendingUp,
      color: "text-green-500",
      bgColor: "bg-green-500/10",
    },
    {
      title: "Heart Rate",
      value: "72",
      unit: "bpm",
      icon: Heart,
      color: "text-red-500",
      bgColor: "bg-red-500/10",
    },
  ];

  const activities = [
    { name: "Morning Yoga", time: "07:00 AM", calories: 180, icon: Dumbbell },
    { name: "Breakfast", time: "08:30 AM", calories: 420, icon: Apple },
    { name: "Gym Workout", time: "05:00 PM", calories: 650, icon: Dumbbell },
  ];

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-primary to-secondary p-8 text-primary-foreground shadow-xl">
        <div className="relative z-10">
          <h1 className="text-4xl font-bold mb-2">Welcome Back! 🎯</h1>
          <p className="text-lg opacity-90">Track your progress, stay motivated, stay fit.</p>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.title} className="relative overflow-hidden hover:shadow-lg transition-all">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <div className={`${stat.bgColor} p-2 rounded-lg`}>
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {stat.value}
                <span className="text-lg text-muted-foreground ml-1">{stat.unit}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Today's Activities */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl">Today's Activities</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {activities.map((activity, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="bg-primary/10 p-3 rounded-full">
                  <activity.icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">{activity.name}</h3>
                  <p className="text-sm text-muted-foreground">{activity.time}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-lg">{activity.calories}</p>
                <p className="text-xs text-muted-foreground">calories</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Weekly Goal Progress */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl">Weekly Goal Progress</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="font-medium">Calories Burned</span>
              <span className="text-muted-foreground">8,450 / 10,000 kcal</span>
            </div>
            <Progress value={85} className="h-3" />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="font-medium">Workout Days</span>
              <span className="text-muted-foreground">4 / 5 days</span>
            </div>
            <Progress value={80} className="h-3" />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="font-medium">Water Intake</span>
              <span className="text-muted-foreground">2.1 / 3.0 liters</span>
            </div>
            <Progress value={70} className="h-3" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
