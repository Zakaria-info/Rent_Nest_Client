import Link from "next/link";
import { Button } from "@heroui/react";
import { TriangleExclamation } from "@gravity-ui/icons";

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center p-4 relative font-sans text-white">
      <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-2xl shadow-xl overflow-hidden p-8 space-y-6 text-center">
        <TriangleExclamation width={48} height={48} className="mx-auto text-red-500" />
        
        <header className="space-y-2">
          <h1 className="text-2xl font-bold tracking-tight text-white">
            Unauthorized Access
          </h1>
          <p className="text-sm text-zinc-400">
            You don&apos;t have permission to access this page. Please contact an administrator if you believe this is an error.
          </p>
        </header>

        <div className="flex flex-col gap-3">
          <Link href="/">
            <Button
              className="w-full bg-teal-600 text-white font-semibold hover:bg-teal-700"
            >
              Go to Home
            </Button>
          </Link>
          <Link href="/auth/signin">
            <Button
              variant="flat"
              className="w-full bg-slate-100 text-slate-700 font-semibold"
            >
              Sign In with Different Account
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}