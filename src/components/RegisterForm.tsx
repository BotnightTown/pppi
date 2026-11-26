"use client";

import Link from "next/link";
import { useActionState } from "react";
import { registerAction, type RegisterState } from "@/app/register/actions";

const initialState: RegisterState = {};

export default function RegisterForm() {
  const [state, formAction, pending] = useActionState(
    registerAction,
    initialState,
  );

  return (
    <form action={formAction} noValidate className="space-y-5">
      {state.message && (
        <p
          role="alert"
          className="rounded-lg bg-rose-50 px-4 py-3 text-sm text-rose-700"
        >
          {state.message}
        </p>
      )}

      <Field
        label="Ім'я"
        name="name"
        type="text"
        autoComplete="name"
        defaultValue={state.values?.name}
        errors={state.errors?.name}
      />
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
        autoComplete="new-password"
        errors={state.errors?.password}
        hint="Щонайменше 8 символів, літера і цифра"
      />

      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-full bg-stone-900 py-3 text-sm tracking-wide text-white transition-colors hover:bg-[#9a7b4f] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {pending ? "Створення акаунта…" : "Зареєструватися"}
      </button>

      <p className="text-center text-sm text-stone-600">
        Вже є акаунт?{" "}
        <Link href="/login" className="text-[#9a7b4f] hover:underline">
          Увійти
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
  hint?: string;
};

function Field({
  label,
  name,
  type,
  autoComplete,
  defaultValue,
  errors,
  hint,
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
      {hint && !hasError && (
        <p className="mt-1.5 text-xs text-stone-500">{hint}</p>
      )}
      {hasError && (
        <p id={errorId} className="mt-1.5 text-xs text-rose-600">
          {errors![0]}
        </p>
      )}
    </div>
  );
}
