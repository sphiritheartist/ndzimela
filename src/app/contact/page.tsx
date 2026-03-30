"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState } from "react";
import { Loader2, Send } from "lucide-react";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  company: z.string().optional(),
  phone: z.string().optional(),
  content: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function ContactPage() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [serverMessage, setServerMessage] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setStatus("loading");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      if (response.ok) {
        setStatus("success");
        setServerMessage(result.message);
        reset();
      } else {
        setStatus("error");
        setServerMessage(result.error || "An error occurred.");
      }
    } catch (e) {
      setStatus("error");
      setServerMessage("A network error occurred.");
    }
  };

  return (
    <div className="min-h-screen bg-background pt-24 pb-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-4">
            Get in Touch.
          </h1>
          <p className="text-lg text-foreground/60">
            Reach out to our executive team for bespoke investment opportunities.
          </p>
        </div>

        <div className="glass-card p-8 md:p-12 rounded-3xl">
          {status === "success" ? (
            <div className="text-center py-10">
              <h3 className="text-2xl font-bold text-green-600 dark:text-green-400 mb-2">Message Sent</h3>
              <p className="text-foreground/70">{serverMessage}</p>
              <button
                onClick={() => setStatus("idle")}
                className="mt-8 px-6 py-3 bg-foreground text-background rounded-full font-medium"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {status === "error" && (
                <div className="p-4 bg-red-50 text-red-600 rounded-xl text-sm text-center">
                  {serverMessage}
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-foreground/80 mb-2">Full Name *</label>
                  <input
                    {...register("name")}
                    className="w-full px-4 py-3 border border-border-color rounded-xl bg-background/50 focus:outline-none focus:ring-2 focus:ring-foreground/20 text-sm"
                  />
                  {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground/80 mb-2">Email Address *</label>
                  <input
                    {...register("email")}
                    className="w-full px-4 py-3 border border-border-color rounded-xl bg-background/50 focus:outline-none focus:ring-2 focus:ring-foreground/20 text-sm"
                  />
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground/80 mb-2">Company (Optional)</label>
                  <input
                    {...register("company")}
                    className="w-full px-4 py-3 border border-border-color rounded-xl bg-background/50 focus:outline-none focus:ring-2 focus:ring-foreground/20 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground/80 mb-2">Phone (Optional)</label>
                  <input
                    {...register("phone")}
                    className="w-full px-4 py-3 border border-border-color rounded-xl bg-background/50 focus:outline-none focus:ring-2 focus:ring-foreground/20 text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground/80 mb-2">Message *</label>
                <textarea
                  {...register("content")}
                  rows={4}
                  className="w-full px-4 py-3 border border-border-color rounded-xl bg-background/50 focus:outline-none focus:ring-2 focus:ring-foreground/20 text-sm resize-none"
                />
                {errors.content && <p className="text-red-500 text-xs mt-1">{errors.content.message}</p>}
              </div>

              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full flex justify-center items-center py-4 px-4 border border-transparent text-sm font-medium rounded-xl text-background bg-foreground hover:opacity-90 transition-all disabled:opacity-50"
              >
                {status === "loading" ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    Send Message
                    <Send className="ml-2 w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
