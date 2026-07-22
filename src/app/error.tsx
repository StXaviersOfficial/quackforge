"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[error-boundary]", error.message);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-5">
      <div className="text-center max-w-md">
        <p className="text-6xl mb-4">⚠️</p>
        <h1 className="text-2xl font-semibold mb-2">Something went wrong.</h1>
        <p className="text-muted-foreground mb-8">
          An unexpected error occurred. Try again, or head back to the homepage.
        </p>
        <div className="flex gap-3 justify-center">
          <button
            onClick={reset}
            className="inline-flex items-center justify-center bg-primary hover:bg-cyan-300 text-background font-semibold px-6 py-3 rounded-lg transition-colors"
          >
            Try again
          </button>
          <Link
            href="/"
            className="inline-flex items-center justify-center border border-primary/40 text-cyan-200 hover:bg-primary/10 font-semibold px-6 py-3 rounded-lg transition-colors"
          >
            Home
          </Link>
        </div>
      </div>
    </div>
  );
}
