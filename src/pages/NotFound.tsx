import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#050505] px-5 text-center text-[#F3EFE6]">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#D6B97A]">404</p>
      <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-6xl">Page not found</h1>
      <Link to="/" className="mt-8 inline-flex min-h-12 items-center gap-2 border-b border-white/15 px-1 font-mono text-xs uppercase tracking-widest transition-colors hover:border-[#D6B97A] hover:text-[#D6B97A]">
        ← Return home
      </Link>
    </main>
  );
}
