import { GoogleCallbackClient } from "./client";

export default async function GoogleCallbackPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { code, error } = await searchParams;

  if (error || !code || typeof code !== "string") {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-red-600">
            Authentication Failed
          </h1>
          <p className="mt-2 text-zinc-600">
            {error
              ? "Google login was cancelled or denied."
              : "No authorization code received."}
          </p>
        </div>
      </div>
    );
  }

  return <GoogleCallbackClient code={code} />;
}
