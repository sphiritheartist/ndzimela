"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, ArrowRight } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (res?.error) {
      setError("Invalid credentials. Please try again.");
      setLoading(false);
    } else {
      router.push("/dashboard");
    }
  }

  return (
    <div className="min-h-[85vh] flex items-center justify-center bg-background px-4 sm:px-6 lg:px-8 pt-20">
      <div className="max-w-md w-full glass-card p-10 rounded-3xl">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold tracking-tight text-foreground">
            Investor Portal
          </h2>
          <p className="mt-3 text-sm text-foreground/60">
            Sign in to access your portfolio and exclusive insights.
          </p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="p-3 text-sm text-red-500 bg-red-50 dark:bg-red-500/10 rounded-xl text-center">
              {error}
            </div>
          )}
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-foreground/80 mb-2">
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="appearance-none block w-full px-4 py-3 border border-border-color rounded-xl placeholder-foreground/30 focus:outline-none focus:ring-2 focus:ring-foreground/20 focus:border-transparent bg-background/50 backdrop-blur-sm transition-all text-sm"
              placeholder="investor@ndzimela.com"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-foreground/80 mb-2">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="appearance-none block w-full px-4 py-3 border border-border-color rounded-xl placeholder-foreground/30 focus:outline-none focus:ring-2 focus:ring-foreground/20 focus:border-transparent bg-background/50 backdrop-blur-sm transition-all text-sm"
              placeholder="••••••••"
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 bg-background border-border-color rounded focus:ring-foreground/20"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-foreground/70">
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <a href="#" className="font-medium text-foreground hover:opacity-80 transition-opacity">
                Forgot password?
              </a>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-4 px-4 border border-transparent text-sm font-medium rounded-xl text-background bg-foreground hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-foreground transition-all disabled:opacity-50"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  Sign In
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
