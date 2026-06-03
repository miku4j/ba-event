"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { api } from "@/lib/api";
import Link from "next/link";

export function Header() {
  const router = useRouter();
  const { data: user, isLoading } = api.useQuery("GET", "/api/user");
  const logout = api.useMutation("POST", "/api/logout", {
    onSuccess: () => {
      router.refresh();
    },
  });

  async function handleLogout() {
    await logout.mutateAsync({});
    router.replace("/");
  }

  return (
    <header className="flex items-center justify-between px-6 py-4">
      <span className="text-lg font-semibold tracking-tight">
        BA Event Planner
      </span>
      <nav className="flex items-center gap-6">
        <Link href="/events" className="text-sm font-medium hover:text-sky-600 dark:hover:text-sky-400">
          Events
        </Link>
        <div className="flex items-center gap-3">
          {isLoading ? null : user ? (
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
        </div>
      </nav>
    </header>
  );
}
