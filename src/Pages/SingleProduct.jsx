import { useLoaderData, Link } from "react-router-dom";
import { customFetch, formatPrice, generateAmountOptions } from "../Utils";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addItem } from "../Features/Cart/cartSlice";

// Single Product Fetch
export const loader = async ({ params }) => {
  const resp = await customFetch(`products/${params.id}`);
  return { product: resp.data.data };
};

const SingleProduct = () => {
  // Getting the single product data
  const { product } = useLoaderData();
  const { image, title, price, description, colors, company } =
    product.attributes;

  const dollarsAmount = formatPrice(price);

  // Product color state
  const [productColor, setProductColor] = useState(colors[0]);

  // Product quantity state
  const [amount, setAmount] = useState(1);

  const dispatch = useDispatch();

  // create product data object
  const cartProduct = {
    cartID: product.id + productColor,
    productID: product.id,
    image,
    title,
    price,
    amount,
    productColor,
    company,
  };

  // Add to cart function
  const addToCart = () => {
    dispatch(addItem({ product: cartProduct }));
  };

  // JSX
  return (
    <section>
      {/* Bread Crumbs */}
      <div className="text-md breadcrumbs">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/products">Products</Link>
          </li>
        </ul>
      </div>

      <div className="mt-6 grid gap-y-8 lg:grid-cols-2  lg:gap-x-16">
        {/* Product Image */}
        <img
          src={image}
          alt={title}
          className="w-96 h-96 object-cover rounded-lg lg:w-full  "
        />
        {/* Product Info */}
        <div>
          {/* Title */}
          <h1 className="capitalize text-3xl font-bold">{title}</h1>

          {/* Company */}
          <h4 className="text-xl text-neutral-content font-bold mt-2">
            {company}
          </h4>

          {/* Price */}
          <p className="mt-3 text-xl">{dollarsAmount}</p>

          {/* Description */}
          <p className="mt-6 leading-8">{description}</p>

          {/* Colors */}
          <div className="mt-6">
            <h4 className="text-md font-medium tracking-wider capitalize">
              colors
            </h4>
            <div className="mt-2">
              {colors.map((color) => {
                return (
                  <button
                    type="button"
                    key={color}
                    className={`badge  w-6 h-6 mr-2 ${
                      color === productColor && "border-2 border-secondary"
                    }`}
                    style={{ backgroundColor: color }}
                    onClick={() => {
                      setProductColor(color);
                    }}
                  ></button>
                );
              })}
            </div>
          </div>

          {/* Amount */}
          <div className="form-control w-full max-w-xs">
            <label className="label" htmlFor="amount">
              <h4 className="text-md font-medium tracking-wider capitalize">
                amount
              </h4>
            </label>
            <select
              className="select select-secondary select-bordered select-md"
              value={amount}
              onChange={(e) => {
                setAmount(parseInt(e.target.value));
              }}
            >
              {generateAmountOptions(20)}
            </select>
          </div>

          {/*Cart Button */}
          <div className="mt-10 ">
            <button
              className="btn btn-secondary btn-md uppercase"
              onClick={addToCart}
            >
              Add to bag
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
export default SingleProduct;
