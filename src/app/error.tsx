"use client"; // Error components must be Client Components

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="container my-6 space-y-12">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        Something went wrong!
      </h1>

      <div className="space-y-4">
        <p className="text-xl text-muted-foreground">{error.message}</p>
        <div className="flex flex-col gap-y-2 w-full max-w-md">
          <Button size={"lg"} onClick={() => reset()}>
            Try again
          </Button>
          <Button size={"lg"} variant={"secondary"} asChild>
            <Link href="/supplements">Return to Shop</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
