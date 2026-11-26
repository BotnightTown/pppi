const benefits = [
  {
    title: "100% оригінал",
    text: "Працюємо напряму з офіційними дистриб'юторами та надаємо гарантію автентичності.",
  },
  {
    title: "Швидка доставка",
    text: "Відправлення в день замовлення. Нова пошта, Укрпошта та кур'єр.",
  },
  {
    title: "Зручна оплата",
    text: "Оплата карткою онлайн або готівкою при отриманні.",
  },
  {
    title: "Пробники та подарунки",
    text: "До кожного замовлення — подарункова упаковка та пробник на вибір.",
  },
];

export default function Benefits() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {benefits.map((b) => (
          <div key={b.title} className="text-center">
            <div
              aria-hidden="true"
              className="mx-auto mb-4 h-10 w-10 rounded-full border border-[#9a7b4f] bg-[#efe4d3]"
            />
            <h3 className="font-[family-name:var(--font-serif)] text-lg">
              {b.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-stone-600">
              {b.text}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
