import type { Metadata } from "next";
import RegisterForm from "@/components/RegisterForm";

export const metadata: Metadata = {
  title: "Реєстрація",
};

export default function RegisterPage() {
  return (
    <section className="mx-auto flex max-w-md flex-col px-4 py-16 sm:py-20">
      <h1 className="text-center font-[family-name:var(--font-serif)] text-3xl">
        Створити акаунт
      </h1>
      <p className="mt-2 mb-8 text-center text-sm text-stone-600">
        Зареєструйтесь, щоб оформлювати замовлення та зберігати обране.
      </p>
      <div className="rounded-2xl border border-stone-200 bg-white p-6 sm:p-8">
        <RegisterForm />
      </div>
    </section>
  );
}
