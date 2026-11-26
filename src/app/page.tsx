import Hero from "@/components/Hero";
import Categories from "@/components/Categories";
import FeaturedProducts from "@/components/FeaturedProducts";
import QuizBanner from "@/components/QuizBanner";
import Benefits from "@/components/Benefits";
import Brands from "@/components/Brands";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Categories />
      <FeaturedProducts />
      <QuizBanner />
      <Brands />
      <Benefits />
    </>
  );
}
