import { PaginationContainer, ProductsContainer, Filters } from "../Components";
import { customFetch } from "../Utils";

// URL
const url = "/products";

// Loader Function
export const loader = async ({ request }) => {
  // Params Object
  const params = Object.fromEntries([
    ...new URL(request.url).searchParams.entries(),
  ]);

  // Custom Fetch
  const response = await customFetch(url, { params });

  // products - array of objects
  const products = response.data.data;

  // meta object
  const meta = response.data.meta;

  // Return Object
  return { products, meta, params };
};

// JSX
const Products = () => {
  return (
    <>
      <Filters />
      <ProductsContainer />
      <PaginationContainer />
    </>
  );
};
export default Products;
