"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useEffect, useState } from "react";

interface User {
  id: number;
  name: string;
  email: string;
}

export function Header() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/user")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => setUser(data))
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  async function handleLogout() {
    await fetch("/api/logout", { method: "POST" });
    setUser(null);
    router.replace("/");
  }

  return (
    <header className="flex items-center justify-between px-6 py-4">
      <span className="text-lg font-semibold tracking-tight">
        BA Event Planner
      </span>
      <nav className="flex items-center gap-3">
        {loading ? null : user ? (
          <>
            <span className="text-sm text-zinc-500 dark:text-zinc-400">
              {user.name}
            </span>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              Sign out
            </Button>
          </>
        ) : (
          <>
            <Link href="/auth/login">
              <Button variant="ghost">Sign in</Button>
            </Link>
            <Link href="/auth/register">
              <Button>Get started</Button>
            </Link>
          </>
        )}
      </nav>
    </header>
  );
}
