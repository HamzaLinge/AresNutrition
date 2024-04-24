"use client"; // Error components must be Client Components

import { Button } from "@/components/ui/button";

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
        <Button size={"lg"} onClick={() => reset()}>
          Try again
        </Button>
      </div>
    </div>
  );
}
