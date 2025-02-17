import React from "react";
import PropTypes from "prop-types";

export const Button = ({ variant, children }) => {
  const baseStyles = "cursor-pointer py-1 px-3 rounded-lg transition duration-300";

  const variants = {
    filled: "bg-gray-800 text-white border-1 border-white hover:bg-white hover:text-black hover:border-1 hover:border-black-500",
    outlined: "border-1 border-white text-white bg-black hover:bg-white hover:text-black hover:border-gray-500",
    inverted: "border-1 border-gray text-gray bg-white text-black hover:bg-black hover:text-gray-200",
  };

  return (
    <button className={`${baseStyles} ${variants[variant]}`}>{children}</button>
  );
};

Button.propTypes = {
  variant: PropTypes.oneOf(["filled", "outlined", "inverted"]),
  children: PropTypes.node.isRequired,
};
