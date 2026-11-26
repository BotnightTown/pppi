"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useActionState } from "react";
import { loginAction, type LoginState } from "@/app/login/actions";

const initialState: LoginState = {};

export default function LoginForm() {
  const [state, formAction, pending] = useActionState(
    loginAction,
    initialState,
  );
  const justRegistered = useSearchParams().get("registered") === "1";

  return (
    <form action={formAction} noValidate className="space-y-5">
      {justRegistered && !state.message && (
        <p
          role="status"
          className="rounded-lg bg-emerald-50 px-4 py-3 text-sm text-emerald-700"
        >
          Акаунт створено. Увійдіть, щоб продовжити.
        </p>
      )}
      {state.message && (
        <p
          role="alert"
          className="rounded-lg bg-rose-50 px-4 py-3 text-sm text-rose-700"
        >
          {state.message}
        </p>
      )}

      <Field
        label="Email"
        name="email"
        type="email"
        autoComplete="email"
        defaultValue={state.values?.email}
        errors={state.errors?.email}
      />
      <Field
        label="Пароль"
        name="password"
        type="password"
        autoComplete="current-password"
        errors={state.errors?.password}
      />

      <div className="text-right text-sm">
        <Link
          href="/forgot-password"
          className="text-stone-500 hover:text-[#9a7b4f]"
        >
          Забули пароль?
        </Link>
      </div>

      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-full bg-stone-900 py-3 text-sm tracking-wide text-white transition-colors hover:bg-[#9a7b4f] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {pending ? "Вхід…" : "Увійти"}
      </button>

      <p className="text-center text-sm text-stone-600">
        Немає акаунта?{" "}
        <Link href="/register" className="text-[#9a7b4f] hover:underline">
          Зареєструватися
        </Link>
      </p>
    </form>
  );
}

type FieldProps = {
  label: string;
  name: string;
  type: string;
  autoComplete: string;
  defaultValue?: string;
  errors?: string[];
};

function Field({
  label,
  name,
  type,
  autoComplete,
  defaultValue,
  errors,
}: FieldProps) {
  const hasError = !!errors?.length;
  const errorId = `${name}-error`;

  return (
    <div>
      <label htmlFor={name} className="mb-1.5 block text-sm text-stone-700">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        autoComplete={autoComplete}
        defaultValue={defaultValue}
        required
        aria-invalid={hasError}
        aria-describedby={hasError ? errorId : undefined}
        className={`w-full rounded-xl border bg-white px-4 py-2.5 text-sm outline-none transition-colors focus:border-[#9a7b4f] text-black ${
          hasError ? "border-rose-400" : "border-stone-300"
        }`}
      />
      {hasError && (
        <p id={errorId} className="mt-1.5 text-xs text-rose-600">
          {errors![0]}
        </p>
      )}
    </div>
  );
}
