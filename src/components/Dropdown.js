import React from "react";
import ArrowIcon from "./Icons/ArrowIcon";

const Dropdown = ({
  onChange,
  options = null,
  color = null,
  defaultValue = null,
  children,
}) => {
  return (
    <div className="relative w-min">
      <div className={`absolute right-1 top-[10%]`}>
        <ArrowIcon backgroundColor={color} arrowColor="white" />
      </div>
      <select
        className="workforce-select relative z-20 w-[11.5rem] rounded-md border border-[#707070] bg-transparent p-1 text-lg font-bold"
        autoComplete="off"
        onChange={(e) => onChange(e.target.value)}
        defaultValue={defaultValue}
      >
        {options || children}
      </select>
    </div>
  );
};

export default Dropdown;
