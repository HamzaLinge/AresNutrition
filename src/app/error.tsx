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
        <Button size={"lg"} onClick={() => reset()} className="w-full max-w-lg">
          Try again
        </Button>
        <Button
          size={"lg"}
          variant={"secondary"}
          asChild
          className="w-full max-w-lg"
        >
          <Link href="/supplements">Return to Shop</Link>
        </Button>
      </div>
    </div>
  );
}
