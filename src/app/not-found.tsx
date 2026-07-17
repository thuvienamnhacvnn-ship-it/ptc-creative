import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 px-4 text-center">
      <p className="font-mono text-sm tracking-widest text-accent">404</p>
      <h1 className="text-3xl font-semibold tracking-tight">Page not found</h1>
      <p className="max-w-md text-muted">
        The page you are looking for does not exist or has been moved.
      </p>
      <Link
        href="/vi"
        className="mt-4 rounded-full bg-accent px-6 py-2.5 text-sm font-medium text-black"
      >
        Back to home
      </Link>
    </div>
  );
}
