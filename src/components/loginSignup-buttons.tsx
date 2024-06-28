import Link from "next/link";
import { Button } from "@/components/ui/button";

function LoginSignupButtons() {
  return (
    <>
      <Button className="rounded-full" asChild>
        <Link href="/login">Login</Link>
      </Button>
      <Button className="rounded-full" asChild>
        <Link href="/signup">Signup</Link>
      </Button>
    </>
  );
}

export default LoginSignupButtons;
