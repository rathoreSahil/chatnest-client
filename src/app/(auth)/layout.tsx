import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col w-full gap-10 justify-center items-center h-lvh">
      <Button asChild>
        <Link href="/">Home</Link>
      </Button>
      {children}
    </div>
  );
}
