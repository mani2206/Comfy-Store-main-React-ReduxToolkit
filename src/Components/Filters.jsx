import { Form, useLoaderData, Link } from "react-router-dom";
import { FormInput, FormSelect, FormRange, FormCheckbox } from "../Components";

const Filters = () => {
  // Getting meta and params data
  const { meta, params } = useLoaderData();
  const { search, category, company, order, price, shipping } = params;

  // JSX
  return (
    <Form className="bg-base-200 rounded-md px-8 py-4 grid gap-x-4 gap-y-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 items-center">
      {/* SEARCH */}
      <FormInput
        type="search"
        label="search product"
        name="search"
        size="input-sm"
        defaultValue={search}
      />

      {/* CATEGORIES */}
      <FormSelect
        label="select category"
        name="category"
        size="select-sm"
        list={meta.categories}
        defaultValue={category}
      />

      {/* COMPANIES */}
      <FormSelect
        label="select company"
        name="company"
        size="select-sm"
        list={meta.companies}
        defaultValue={company}
      />

      {/* ORDER */}
      <FormSelect
        label="sort by"
        name="order"
        size="select-sm"
        list={["a-z", "z-a", "low", "high"]}
        defaultValue={order}
      />

      {/* RANGE FORM */}
      <FormRange
        label="Select Price"
        name="price"
        size="range-sm"
        price={price}
      />

      {/* SHIPPING CHECKBOX */}
      <FormCheckbox
        label="Free Shipping"
        name="shipping"
        size="range-sm"
        defaultValue={shipping}
      />

      {/* BUTTONS */}
      <button type="submit" className="btn btn-primary btn-sm uppercase">
        search
      </button>
      <Link to="/products" className="btn btn-accent btn-sm uppercase">
        reset
      </Link>
    </Form>
  );
};
export default Filters;
