"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function GuestOnly({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    fetch("/api/user")
      .then((res) => {
        if (res.ok) {
          router.replace("/");
        } else {
          setChecking(false);
        }
      })
      .catch(() => setChecking(false));
  }, [router]);

  if (checking) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-zinc-300 border-t-blue-600" />
      </div>
    );
  }

  return children;
}
