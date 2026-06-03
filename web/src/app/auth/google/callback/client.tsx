"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { api } from "@/lib/api";

export function GoogleCallbackClient({ code }: { code: string }) {
  const router = useRouter();

  const callback = api.useMutation("post", "/api/auth/google/callback", {
    onSuccess: () => {
      router.replace("/");
    },
  });

  useEffect(() => {
    if (callback.isIdle) {
      callback.mutate({ body: { code } });
    }
  }, [code, callback]);

  if (callback.isError) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-red-600">Login Failed</h1>
          <p className="mt-2 text-zinc-600">Authentication failed</p>
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
