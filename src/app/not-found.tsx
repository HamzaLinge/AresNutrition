import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container my-6 space-y-12">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        Not Found
      </h1>

      <div className="space-y-4">
        <p className="text-xl text-muted-foreground">
          Could not find requested resource.
        </p>
        <p></p>
        <Button asChild size={"lg"}>
          <Link href="/">Return to Home</Link>
        </Button>
      </div>
    </div>
  );
}
