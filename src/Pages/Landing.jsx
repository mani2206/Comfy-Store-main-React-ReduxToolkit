import { Hero, FeaturedProducts } from "../Components";
import { customFetch } from "../Utils/index";

const URL = "/products?featured=true";

export const loader = async () => {
  const response = await customFetch(URL);
  const products = response.data.data;
  return { products };
};

const Landing = () => {
  return (
    <div>
      <Hero />
      <FeaturedProducts />
    </div>
  );
};
export default Landing;
