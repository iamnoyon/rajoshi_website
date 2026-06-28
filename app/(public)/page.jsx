import Hero from "@/components/modules/home/Hero";
import Features from "@/components/modules/home/Features";
import Categories from "@/components/modules/home/Categories";
import FeaturedProducts from "@/components/modules/home/FeaturedProducts";
import BestSellers from "@/components/modules/home/BestSellers";
import CTABanner from "@/components/modules/home/CTABanner";

export default function HomePage() {
  return (
    <div>
      <Hero />
      <Features />
      <Categories />
      <FeaturedProducts />
      <BestSellers />
      <CTABanner />
    </div>
  );
}
