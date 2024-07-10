import { LoginForm } from "@/components/auth/login-form";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

const Login = () => {
  return (
    <Card className="md:w-1/3 w-3/4">
      <CardHeader>
        <CardTitle>Login</CardTitle>
      </CardHeader>
      <CardContent>
        <LoginForm />
      </CardContent>
      <CardFooter className="justify-center p-6">
        <p>
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="text-blue-500 hover:underline">
            SignUp
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
};

export default Login;
