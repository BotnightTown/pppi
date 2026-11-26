import type { Metadata } from "next";
import { Suspense } from "react";
import LoginForm from "@/components/LoginForm";

export const metadata: Metadata = {
  title: "Вхід",
};

export default function LoginPage() {
  return (
    <section className="mx-auto flex max-w-md flex-col px-4 py-16 sm:py-20">
      <h1 className="text-center font-serif text-3xl">Вхід в акаунт</h1>
      <p className="mt-2 mb-8 text-center text-sm text-stone-600">
        Раді бачити вас знову.
      </p>
      <div className="rounded-2xl border border-stone-200 bg-white p-6 sm:p-8">
        <Suspense fallback={<div className="h-64" />}>
          <LoginForm />
        </Suspense>
      </div>
    </section>
  );
}
