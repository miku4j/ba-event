"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function GoogleCallbackClient({ code }: { code: string }) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function handleCallback() {
      try {
        const res = await fetch("/api/auth/google/callback", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ code }),
        });

        if (!res.ok) {
          const data = await res.json().catch(() => null);
          throw new Error(data?.message || "Authentication failed");
        }

        router.replace("/");
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong");
      }
    }

    handleCallback();
  }, [code, router]);

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-red-600">Login Failed</h1>
          <p className="mt-2 text-zinc-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-zinc-300 border-t-blue-600" />
        <p className="mt-4 text-zinc-600">Completing sign in...</p>
      </div>
    </div>
  );
}
