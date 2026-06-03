"use client";

import { useRouter } from "next/navigation";
import { api } from "@/lib/api";
import { useEffect } from "react";

export function GuestOnly({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { data: user, isLoading } = api.useQuery("get", "/api/user");

  useEffect(() => {
    if (!isLoading && user) {
      router.replace("/");
    }
  }, [isLoading, user, router]);

  if (isLoading || user) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-zinc-300 border-t-blue-600" />
      </div>
    );
  }

  return children;
}
