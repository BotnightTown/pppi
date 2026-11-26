import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    refresh: jest.fn(),
    back: jest.fn(),
    forward: jest.fn(),
    prefetch: jest.fn(),
  }),
  usePathname: () => "/",
  useSearchParams: () => new URLSearchParams(),
}));

jest.mock("@/app/login/actions", () => {
  return new Proxy(
    {},
    { get: (_t, prop) => (prop === "__esModule" ? true : jest.fn()) },
  );
});
jest.mock("@/app/register/actions", () => {
  return new Proxy(
    {},
    { get: (_t, prop) => (prop === "__esModule" ? true : jest.fn()) },
  );
});

import SearchBar from "@/components/SearchBar";
import LoginForm from "@/components/LoginForm";
import RegisterForm from "@/components/RegisterForm";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";

describe("Smoke: SearchBar", () => {
  test("форма пошуку веде на /catalog і має поле q", () => {
    const { container } = render(<SearchBar />);

    const form = container.querySelector("form");
    expect(form).toBeInTheDocument();
    expect(form).toHaveAttribute("action", "/catalog");

    expect(container.querySelector('input[name="q"]')).toBeInTheDocument();
  });
});

describe("Smoke: LoginForm", () => {
  test("форма входу містить email, пароль і кнопку відправки", () => {
    const { container } = render(<LoginForm />);

    expect(container.querySelector('input[name="email"]')).toBeInTheDocument();
    expect(
      container.querySelector('input[type="password"]'),
    ).toBeInTheDocument();
    expect(
      container.querySelector('button[type="submit"]'),
    ).toBeInTheDocument();
  });
});

describe("Smoke: RegisterForm", () => {
  test("форма реєстрації містить ім'я, email, пароль і кнопку відправки", () => {
    const { container } = render(<RegisterForm />);

    expect(container.querySelector('input[name="name"]')).toBeInTheDocument();
    expect(container.querySelector('input[name="email"]')).toBeInTheDocument();
    expect(
      container.querySelector('input[type="password"]'),
    ).toBeInTheDocument();
    expect(
      container.querySelector('button[type="submit"]'),
    ).toBeInTheDocument();
  });
});

describe("Smoke: статичні блоки макета", () => {
  test("Footer рендериться як contentinfo з посиланнями", () => {
    render(<Footer />);

    expect(screen.getByRole("contentinfo")).toBeInTheDocument();
    expect(screen.getAllByRole("link").length).toBeGreaterThan(0);
  });

  test("Hero рендериться із заголовком і посиланням", () => {
    render(<Hero />);

    expect(screen.getAllByRole("heading").length).toBeGreaterThan(0);
    expect(screen.getAllByRole("link").length).toBeGreaterThan(0);
  });
});
