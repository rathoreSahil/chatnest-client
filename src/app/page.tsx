import Link from "next/link";
import { Button } from "@/components/ui/button";
import LogoutButton from "@/components/logout-button";
import { useAuth } from "@/context/auth-provider";

function LoginSignupButtons() {
  return (
    <>
      <Button asChild>
        <Link href="/login">Login</Link>
      </Button>
      <Button asChild>
        <Link href="/signup">Signup</Link>
      </Button>
    </>
  );
}

export default function Home() {
  const { isLoggedIn, setIsLoggedIn } = useAuth();

  return (
    <>
      <h1>Home</h1>
      <p>Welcome!</p>
      <LogoutButton />
    </>
  );
}
