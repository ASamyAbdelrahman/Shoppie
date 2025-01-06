import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { ShoppingCart, ChevronLeft, ChevronRight } from "lucide-react";
import { useCartStore } from "../stores/useCartStore";

const FeaturedProducts = ({ featuredProducts }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(4);

  const { addToCart } = useCartStore();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) setItemsPerPage(1);
      else if (window.innerWidth < 1024) setItemsPerPage(2);
      else if (window.innerWidth < 1280) setItemsPerPage(3);
      else setItemsPerPage(4);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => prevIndex + itemsPerPage);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => prevIndex - itemsPerPage);
  };

  const isStartDisabled = currentIndex === 0;
  const isEndDisabled = currentIndex >= featuredProducts.length - itemsPerPage;

  return (
    <div className="py-12">
      <div className="container mx-auto px-2">
        <h2
          className="text-5xl lg:text-4xl md:text-3xl font-bold text-slate-900 filter
         drop-shadow-lg mb-7"
        >
          Featured
        </h2>
        <div className="relative">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-300 ease-in-out"
              style={{
                transform: `translateX(-${
                  currentIndex * (100 / itemsPerPage)
                }%)`,
              }}
            >
              {featuredProducts?.map((product) => (
                <div
                  key={product._id}
                  className="w-full sm:w-1/3 lg:w-1/4 xl:w-1/5 xsm=w-1/2 flex-shrink-0 px-4"
                >
                  <div className="bg-slate-100 bg-opacity-10 backdrop-blur-sm rounded-lg shadow-xl  shadow-sky-200 overflow-hidden h-full transition-all duration-300 hover:shadow-xl border border-[#1b4ce0]">
                    <div className="relative mx-3 mt-3 flex h-30 overflow-hidden rounded-xl">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-40 object-cover transition-transform duration-300 ease-in-out hover:scale-110"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="text-md font-semibold mb-2 text-slate-900">
                        {product.name}
                      </h3>
                      <p className="text-[#1b4ce0] font-medium mb-4 drop-shadow-lg filter">
                        ${product.price.toFixed(2)}
                      </p>
                      <button
                        onClick={() => addToCart(product)}
                        className="w-full bg-theme hover:bg-theme-hover text-white font-semibold py-2 px-4 rounded transition-colors duration-300 
												flex items-center justify-center"
                      >
                        <ShoppingCart className="w-5 h-5 mr-2" />
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <button
            onClick={prevSlide}
            disabled={isStartDisabled}
            className={`absolute -top-10 right-10 transform -translate-y-1/2 p-2 rounded-full transition-colors duration-500 xsm:hidden ${
              isStartDisabled
                ? "bg-blue-400"
                : "bg-[#1b4ce0] hover:bg-[#1438a4]"
            }`}
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={nextSlide}
            disabled={isEndDisabled}
            className={`absolute -top-10 -right-4 transform -translate-y-1/2 p-2 rounded-full transition-colors duration-500  xsm:hidden ${
              isEndDisabled ? "bg-blue-400" : "bg-[#1b4ce0] hover:bg-[#1438a4]"
            }`}
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
};
FeaturedProducts.propTypes = {
  featuredProducts: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default FeaturedProducts;
