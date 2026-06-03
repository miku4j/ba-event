"use client";

import { useRouter, usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { api } from "@/lib/api";
import Link from "next/link";
import { useState } from "react";
import { CircleDot, Menu, X } from "lucide-react";

export function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const { data: user, isLoading } = api.useQuery("GET", "/api/user");
  const logout = api.useMutation("POST", "/api/logout", {
    onSuccess: () => {
      router.refresh();
    },
  });
  const [mobileOpen, setMobileOpen] = useState(false);

  async function handleLogout() {
    await logout.mutateAsync({});
    setMobileOpen(false);
    router.replace("/");
  }

  function navLink(href: string, label: string) {
    const active = pathname === href;
    return (
      <Link
        href={href}
        onClick={() => setMobileOpen(false)}
        className={`relative text-sm font-medium transition-colors px-1 py-1 ${
          active
            ? "text-sky-600 dark:text-sky-400"
            : "text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200"
        }`}
      >
        {label}
        {active && (
          <span className="absolute -bottom-0.5 left-0 right-0 h-0.5 rounded-full bg-sky-500" />
        )}
      </Link>
    );
  }

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200/60 dark:border-zinc-800/60 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-8">
          <Link
            href="/"
            className="flex items-center gap-2 text-lg font-bold tracking-tight text-zinc-800 dark:text-zinc-200"
          >
            <CircleDot className="h-6 w-6 text-sky-500" />
            <span>Kivotos Events</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            {navLink("/", "Home")}
            {navLink("/events", "Events")}
          </nav>
        </div>

        <div className="hidden md:flex items-center gap-3">
          {isLoading ? (
            <div className="h-8 w-20 rounded-full bg-zinc-200 dark:bg-zinc-800 animate-pulse" />
          ) : user ? (
            <>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-100 dark:bg-zinc-800/60">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-sky-500 text-xs font-bold text-white">
                  {user.name.charAt(0)}
                </span>
                <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  {user.name}
                </span>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="text-xs"
              >
                Sign out
              </Button>
            </>
          ) : (
            <>
              <Link href="/auth/login">
                <Button variant="ghost" size="sm">
                  Sign in
                </Button>
              </Link>
              <Link href="/auth/register">
                <Button size="sm">Get started</Button>
              </Link>
            </>
          )}
        </div>

        <button
          className="md:hidden p-2 text-zinc-600 dark:text-zinc-400"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 px-4 py-4 space-y-4">
          <nav className="flex flex-col gap-3">
            {navLink("/", "Home")}
            {navLink("/events", "Events")}
          </nav>
          <hr className="border-zinc-200 dark:border-zinc-800" />
          <div className="flex flex-col gap-2">
            {isLoading ? null : user ? (
              <>
                <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-zinc-100 dark:bg-zinc-800/60">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-sky-500 text-xs font-bold text-white">
                    {user.name.charAt(0)}
                  </span>
                  <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                    {user.name}
                  </span>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleLogout}
                  className="w-full"
                >
                  Sign out
                </Button>
              </>
            ) : (
              <>
                <Link href="/auth/login" onClick={() => setMobileOpen(false)}>
                  <Button variant="ghost" className="w-full">
                    Sign in
                  </Button>
                </Link>
                <Link
                  href="/auth/register"
                  onClick={() => setMobileOpen(false)}
                >
                  <Button className="w-full">Get started</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
