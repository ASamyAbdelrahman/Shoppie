import { useEffect } from "react";
import CategoryItem from "../components/CategoryItem";
import { useProductStore } from "../stores/useProductStore";
import FeaturedProducts from "../components/FeaturedProducts";
import Hero from "../components/Hero";
import FlexContent from '../components/FlexContent';

const categories = [
  { href: "/pants", name: "Pants", imageUrl: "/pants.png" },
  { href: "/t-shirts", name: "T-shirts", imageUrl: "/tshirts.jpeg" },
  { href: "/shoes", name: "Shoes", imageUrl: "/shoes.jpeg" },
  { href: "/hats", name: "Hats", imageUrl: "/hats.png" },
  { href: "/jackets", name: "Jackets", imageUrl: "/jackets.png" },
  { href: "/shorts", name: "Shorts", imageUrl: "/shorts.png" },
  { href: "/bags", name: "Bags", imageUrl: "/bags.png" },
];

const HomePage = () => {
  const { fetchFeaturedProducts, products, isLoading } = useProductStore();

  useEffect(() => {
    fetchFeaturedProducts();
  }, [fetchFeaturedProducts]);

  return (
    <div className="relative min-h-screen text-white overflow-hidden">
      <Hero />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-gradient text-center text-5xl sm:text-6xl font-bold mb-4">
          Explore Our Categories
        </h1>
        <p className="text-center text-xl text-slate-950 mb-12">
          Discover the latest trends in eco-friendly fashion
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-4">
          {categories.map((category) => (
            <CategoryItem category={category} key={category.name} />
          ))}
        </div>

        <FlexContent />

        {!isLoading && products.length > 0 && (
          <FeaturedProducts featuredProducts={products} />
        )}
      </div>
    </div>
  );
};
export default HomePage;
