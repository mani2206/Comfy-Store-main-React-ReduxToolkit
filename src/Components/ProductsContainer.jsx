import { useState } from "react";
import { ProductsGrid, ProductsList } from "../Components";
import { useLoaderData } from "react-router-dom";
import { BsFillGridFill, BsList } from "react-icons/bs";

const ProductsContainer = () => {
  // Getting the meta data
  const { meta } = useLoaderData();
  const numberOfProducts = meta.pagination.total;

  // Layout State
  const [layout, setLayout] = useState("grid");

  // Layout Style Function
  const setActiveStyles = (pattern) => {
    return `text-xl btn btn-circle btn-sm ${
      pattern === layout
        ? "btn-primary text-primary-content"
        : "btn-ghost text-base-content"
    }`;
  };

  // JSX
  return (
    <>
      {/* Header */}
      <div className="flex justify-between items-center mt-8 border-b border-base-300 pb-5">
        {/* Display Number of Products */}
        <h4 className="font-medium text-md">
          {numberOfProducts} product{numberOfProducts > 1 && "s"}
        </h4>

        {/* Layout Toggle Buttons */}
        <div className="flex gap-x-2">
          <button
            className={setActiveStyles("grid")}
            onClick={() => {
              setLayout("grid");
            }}
          >
            <BsFillGridFill />
          </button>
          <button
            className={setActiveStyles("list")}
            onClick={() => {
              setLayout("list");
            }}
          >
            <BsList />
          </button>
        </div>
      </div>

      {/* Conditional Rendering of the Layout */}
      <div>
        {numberOfProducts === 0 ? (
          <h5 className="text-2xl mt-16">
            Sorry, no products matched your search...
          </h5>
        ) : layout === "grid" ? (
          <ProductsGrid />
        ) : (
          <ProductsList />
        )}
      </div>
    </>
  );
};
export default ProductsContainer;
