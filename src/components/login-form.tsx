import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Label } from "./ui/label";

interface LoginFormProps {
  onLogin: (isAuthenticated: boolean) => void;
}

export function LoginForm({ onLogin }: LoginFormProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (username === "sarasi" && password === "0713563812") {
      // Store session in localStorage with 24 hour expiry
      const sessionData = {
        isAuthenticated: true,
        expiresAt: new Date().getTime() + 24 * 60 * 60 * 1000, // 24 hours from now
      };
      localStorage.setItem("session", JSON.stringify(sessionData));
      onLogin(true);
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <Card className="w-[350px] mx-auto mt-20">
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>Enter your credentials to access the application</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
              />
            </div>
            {error && <p className="text-sm text-red-500">{error}</p>}
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full">
            Login
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
} 