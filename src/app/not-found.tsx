import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-5">
      <div className="text-center max-w-md">
        <p className="text-8xl font-bold text-gradient-cyan mb-4">404</p>
        <h1 className="text-2xl font-semibold mb-2">Page not found.</h1>
        <p className="text-muted-foreground mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          href="/"
          className="inline-flex items-center justify-center bg-cyan-400 hover:bg-cyan-300 text-background font-semibold px-6 py-3 rounded-lg transition-colors"
        >
          Back to QuackForge
        </Link>
      </div>
    </div>
  );
}
