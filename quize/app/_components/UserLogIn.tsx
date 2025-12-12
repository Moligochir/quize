import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ChevronRight } from "lucide-react";

export const UserLogIn = () => {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className="flex justify-center font-bold">
          Sign in to test
        </CardTitle>
        <CardDescription className="flex justify-center">
          Welcome back! Please sign in to continue
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Button variant="outline" className="w-full">
                <img className="w-4" src="./googleIcon.png" /> Continue with
                Google
              </Button>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email address"
                required
              />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button type="submit" className="w-full bg-purple-600">
          Continue <ChevronRight />
        </Button>

        <CardAction className="flex justify-center items-center w-full">
          <p className="text-neutral-500 text-sm">Don't have an account?</p>
          <Button className="text-purple-600" variant="link">
            Sign Up
          </Button>
        </CardAction>
      </CardFooter>
    </Card>
  );
};
