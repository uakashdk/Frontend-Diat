import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Coffee, Sun, CloudMoon, Moon } from "lucide-react";

const DietPlan = () => {
  const mealPlans = [
    {
      day: "Monday",
      meals: {
        breakfast: {
          name: "Oatmeal & Berries",
          calories: 350,
          protein: 12,
          carbs: 58,
          fat: 8,
          icon: Coffee,
        },
        lunch: {
          name: "Grilled Chicken Salad",
          calories: 450,
          protein: 35,
          carbs: 25,
          fat: 18,
          icon: Sun,
        },
        snack: {
          name: "Greek Yogurt & Nuts",
          calories: 200,
          protein: 15,
          carbs: 12,
          fat: 10,
          icon: CloudMoon,
        },
        dinner: {
          name: "Salmon with Vegetables",
          calories: 550,
          protein: 42,
          carbs: 35,
          fat: 22,
          icon: Moon,
        },
      },
    },
  ];

  const nutritionGoals = [
    { label: "Daily Calories", value: "2,000", target: "2,200", color: "bg-blue-500" },
    { label: "Protein", value: "104g", target: "120g", color: "bg-green-500" },
    { label: "Carbs", value: "130g", target: "150g", color: "bg-yellow-500" },
    { label: "Fat", value: "58g", target: "65g", color: "bg-orange-500" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-2">Diet Plan</h1>
        <p className="text-muted-foreground text-lg">
          Your personalized nutrition plan to reach your goals
        </p>
      </div>

      {/* Nutrition Goals */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {nutritionGoals.map((goal) => (
          <Card key={goal.label}>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {goal.label}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold mb-1">{goal.value}</div>
              <div className="flex items-center gap-2">
                <div className="flex-1 bg-muted rounded-full h-2 overflow-hidden">
                  <div
                    className={`${goal.color} h-full rounded-full`}
                    style={{ width: "85%" }}
                  />
                </div>
                <span className="text-xs text-muted-foreground">{goal.target}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Weekly Meal Plan */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl">Weekly Meal Plan</CardTitle>
          <CardDescription>Plan your meals for optimal nutrition</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="monday" className="w-full">
            <TabsList className="grid w-full grid-cols-7 mb-6">
              {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
                <TabsTrigger key={day} value={day.toLowerCase()}>
                  {day}
                </TabsTrigger>
              ))}
            </TabsList>
            <TabsContent value="monday" className="space-y-4">
              {Object.entries(mealPlans[0].meals).map(([mealType, meal]) => (
                <Card key={mealType} className="bg-muted/30">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className="bg-primary/10 p-3 rounded-lg">
                        <meal.icon className="h-6 w-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <Badge className="mb-2 capitalize">{mealType}</Badge>
                            <h3 className="font-semibold text-lg">{meal.name}</h3>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold text-primary">
                              {meal.calories}
                            </div>
                            <div className="text-xs text-muted-foreground">calories</div>
                          </div>
                        </div>
                        <div className="flex gap-4 mt-3">
                          <div className="text-sm">
                            <span className="text-muted-foreground">Protein:</span>{" "}
                            <span className="font-semibold">{meal.protein}g</span>
                          </div>
                          <div className="text-sm">
                            <span className="text-muted-foreground">Carbs:</span>{" "}
                            <span className="font-semibold">{meal.carbs}g</span>
                          </div>
                          <div className="text-sm">
                            <span className="text-muted-foreground">Fat:</span>{" "}
                            <span className="font-semibold">{meal.fat}g</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
              
              <Card className="bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/20">
                <CardContent className="pt-6">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-primary mb-2">1,550</div>
                    <div className="text-muted-foreground">Total Daily Calories</div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default DietPlan;
