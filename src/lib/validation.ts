import { z } from "zod";

export const registerSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Ім'я має містити щонайменше 2 символи")
    .max(60, "Ім'я занадто довге"),
  email: z
    .string()
    .trim()
    .toLowerCase()
    .pipe(z.email("Вкажіть коректну email-адресу")),
  password: z
    .string()
    .min(8, "Пароль має містити щонайменше 8 символів")
    .max(72, "Пароль занадто довгий (максимум 72 символи)")
    .regex(/[A-Za-zА-Яа-яІіЇїЄєҐґ]/, "Пароль має містити хоча б одну літеру")
    .regex(/\d/, "Пароль має містити хоча б одну цифру"),
});

export type RegisterInput = z.infer<typeof registerSchema>;

export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .toLowerCase()
    .pipe(z.email("Вкажіть коректну email-адресу")),
  password: z.string().min(1, "Введіть пароль"),
});
