import { Button } from "@/components/ui/button";
import { Header } from "@/components/header";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-zinc-50 dark:bg-black">
      <Header />

      <main className="flex flex-1 flex-col items-center justify-center px-6 text-center">
        <h1 className="max-w-2xl text-4xl font-bold tracking-tight sm:text-5xl">
          Plan your Blue Archive events
        </h1>
        <p className="mt-4 max-w-lg text-lg text-zinc-500 dark:text-zinc-400">
          Track raid schedules, plan your pyroxene spending, and coordinate with
          your club — all in one place.
        </p>
        <div className="mt-8 flex items-center gap-4">
          <Link href="/auth/register">
            <Button size="lg">Get started</Button>
          </Link>
          <Link href="/auth/login">
            <Button variant="outline" size="lg">
              Sign in
            </Button>
          </Link>
        </div>
      </main>
    </div>
  );
}
