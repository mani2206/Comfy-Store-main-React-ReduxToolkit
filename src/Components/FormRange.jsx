import { useState } from "react";
import { formatPrice } from "../Utils";

const FormRange = ({ name, label, size, price }) => {
  // MAX & STEP UP VALUE
  const maxRange = 100000;
  const step = 1000;

  // Range State
  const [selectedPrice, setSelectedPrice] = useState(price || maxRange);

  // JSX
  return (
    <div>
      {/* Header - Label */}
      <label htmlFor={name} className="label cursor-pointer">
        <span className="label-text capitalize">{label}</span>
        <span>{formatPrice(selectedPrice)}</span>
      </label>

      {/* Range Input */}
      <input
        type="range"
        name={name}
        min={0}
        max={maxRange}
        value={selectedPrice}
        onChange={(e) => {
          setSelectedPrice(e.target.value);
        }}
        className={`range range-primary ${size}`}
        step={step}
      ></input>

      {/* Footer - Range*/}
      <div className="w-full flex justify-between text-xs px-2 mt-2">
        <span className="font-bold text-md">0</span>
        <span className="font-bold text-md">Max : {formatPrice(maxRange)}</span>
      </div>
    </div>
  );
};
export default FormRange;
