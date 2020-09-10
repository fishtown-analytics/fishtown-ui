import React from "react";

export interface ButtonProps {
  variant?: "primary" | "white";
  size?: "small" | "medium" | "large";
  onClick?: () => void;
}

export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "medium",
  children,
  ...props
}) => {
  return (
    <button
      type="button"
      className="tw-bg-teal-500 hover:tw-bg-teal-700 tw-text-white tw-transition-colors tw-duration-200 tw-font-bold tw-py-2 tw-px-4 tw-rounded"
      {...props}
    >
      {children}
    </button>
  );
};
