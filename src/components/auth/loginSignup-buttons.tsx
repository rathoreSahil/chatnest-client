import Link from "next/link";
import { Button } from "@/components/ui/button";

function LoginSignupButtons() {
  return (
    <div className="flex pt-4 gap-4">
      <Button asChild>
        <Link href="/login">Login</Link>
      </Button>
      <Button asChild>
        <Link href="/signup">Signup</Link>
      </Button>
    </div>
  );
}

export default LoginSignupButtons;
