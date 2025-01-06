import { Link } from "react-router-dom";
import PropTypes from 'prop-types';

const CategoryItem = ({ category }) => {
  return (
    <div className="relative overflow-hidden h-32 w-36 rounded-lg group sm:flex-col sm:w-full sm:h-40 md:h-48 md:w-full xsm:h-40 xsm:w-full xsm:flex-col">
      <Link to={"/category" + category.href}>
        <div className="min-w-full min-h-full cursor-pointer">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-blue-950 opacity-50 z-10" />
          <img
            src={category.imageUrl}
            alt={category.name}
            className="w-fit h-fit object-cover transition-transform duration-500 ease-out group-hover:scale-110"
            loading="lazy"
          />
          <div className="absolute -bottom-2 left-0 right-0 p-4 z-20">
            <h3 className="text-white text-lg font-semibold">
              {category.name}
            </h3>
          </div>
        </div>
      </Link>
    </div>
  );
};
CategoryItem.propTypes = {
  category: PropTypes.shape({
    href: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
};

export default CategoryItem;
