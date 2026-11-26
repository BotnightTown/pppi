"use server";

import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { hashPassword } from "@/lib/password";
import { registerSchema } from "@/lib/validation";

export type RegisterState = {
  errors?: {
    name?: string[];
    email?: string[];
    password?: string[];
  };
  message?: string;
  values?: { name: string; email: string };
};

const EMAIL_TAKEN = "Користувач із такою email-адресою вже існує";

export async function registerAction(
  _prev: RegisterState,
  formData: FormData,
): Promise<RegisterState> {
  const raw = {
    name: String(formData.get("name") ?? ""),
    email: String(formData.get("email") ?? ""),
    password: String(formData.get("password") ?? ""),
  };
  // Пароль у values не повертаємо
  const values = { name: raw.name, email: raw.email };

  const parsed = registerSchema.safeParse(raw);
  if (!parsed.success) {
    const flat = parsed.error.flatten().fieldErrors;
    return { errors: flat, values };
  }

  const { name, email, password } = parsed.data;

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return { errors: { email: [EMAIL_TAKEN] }, values };
  }

  try {
    await prisma.user.create({
      data: {
        name,
        email,
        passwordHash: await hashPassword(password),
      },
    });
  } catch (error) {
    // Гонка: інший запит створив користувача між перевіркою і вставкою
    if ((error as { code?: string })?.code === "P2002") {
      return { errors: { email: [EMAIL_TAKEN] }, values };
    }
    console.error("Registration failed", error);
    return {
      message: "Не вдалося створити акаунт. Спробуйте пізніше.",
      values,
    };
  }

  // redirect() кидає виняток, тому викликається поза try/catch
  redirect("/login?registered=1");
}
