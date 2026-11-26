"use server";

import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { hashPassword, verifyPassword } from "@/lib/password";
import { createSession, deleteSession } from "@/lib/session";
import { loginSchema } from "@/lib/validation";

export type LoginState = {
  errors?: { email?: string[]; password?: string[] };
  message?: string;
  values?: { email: string };
};

// Порівняння з фіктивним хешем, коли користувача не знайдено,
// щоб час відповіді не виказував існування email.
const dummyHash = hashPassword("dummy-password-for-timing");

export async function loginAction(
  _prev: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const raw = {
    email: String(formData.get("email") ?? ""),
    password: String(formData.get("password") ?? ""),
  };
  const values = { email: raw.email };

  const parsed = loginSchema.safeParse(raw);
  if (!parsed.success) {
    return { errors: parsed.error.flatten().fieldErrors, values };
  }

  const { email, password } = parsed.data;
  const user = await prisma.user.findUnique({ where: { email } });

  const valid = user
    ? await verifyPassword(password, user.passwordHash)
    : (await verifyPassword(password, await dummyHash), false);

  if (!user || !valid) {
    return { message: "Невірний email або пароль", values };
  }

  await createSession(user.id);
  redirect("/profile");
}

export async function logoutAction() {
  await deleteSession();
  redirect("/login");
}
