import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Activity, Dumbbell, Heart } from "lucide-react";
import { loginUser } from "@/Services/authService";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

const handleLogin = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!username || !password) {
    toast.error("Please fill in all fields");
    return;
  }

  try {
    setIsLoading(true);

    const response = await loginUser({
      email: username,
      password: password,
    });

    // Save token
    localStorage.setItem("token", response.token);

    toast.success("Login successful");

    navigate("/dashboard");

  } catch (error: any) {
    toast.error(error.response?.data?.message || "Login failed");
  } finally {
    setIsLoading(false);
  }
};

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-primary via-secondary to-accent p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-primary/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-secondary/20 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      {/* Floating icons */}
      <div className="absolute top-20 left-20 animate-bounce">
        <Activity className="w-12 h-12 text-white/30" />
      </div>
      <div className="absolute bottom-20 right-20 animate-bounce delay-500">
        <Dumbbell className="w-12 h-12 text-white/30" />
      </div>
      <div className="absolute top-1/2 left-10 animate-bounce delay-1000">
        <Heart className="w-10 h-10 text-white/30" />
      </div>

      <Card className="w-full max-w-md relative z-10 shadow-2xl backdrop-blur-sm bg-card/95">
        <CardHeader className="space-y-1 text-center pb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl" />
              <div className="relative bg-primary rounded-full p-4">
                <Activity className="w-8 h-8 text-primary-foreground" />
              </div>
            </div>
          </div>
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Diet & Fitness Hub
          </CardTitle>
          <CardDescription className="text-base">
            Transform your body, transform your life
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username" className="text-sm font-medium">
                Username
              </Label>
              <Input
                id="username"
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="h-11 transition-all focus:ring-2 focus:ring-primary"
                disabled={isLoading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-11 transition-all focus:ring-2 focus:ring-primary"
                disabled={isLoading}
              />
            </div>
            <Button
              type="submit"
              className="w-full h-11 text-base font-semibold bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-all transform hover:scale-[1.02] shadow-lg"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Logging in...
                </div>
              ) : (
                "Log In"
              )}
            </Button>
          </form>
          
          <div className="mt-6 text-center text-sm text-muted-foreground">
            <p>Don't have an account? <button className="text-primary hover:underline" onClick={() => navigate("/signup")}>Sign up</button></p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
