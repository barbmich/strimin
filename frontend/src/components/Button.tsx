import type React from "react";

const baseStyles =
  "inline-flex items-center justify-center rounded-md font-medium transition-colors";

const variantStyles = {
  default: "bg-blue-600 text-white hover:bg-blue-700",
  outline: "border border-gray-300 bg-white hover:bg-gray-100",
  ghost: "bg-transparent hover:bg-gray-100",
  secondary: "bg-gray-200 text-gray-900 hover:bg-gray-300",
};

const sizeStyles = {
  default: "h-10 px-4 py-2 text-sm",
  icon: "h-10 w-10 p-2",
};

type ButtonProps = {
  children: React.ReactNode;
  variant?: keyof typeof variantStyles;
  size?: keyof typeof sizeStyles;
  className?: string;
  onClick?: () => void;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({
  children,
  variant = "default",
  size = "default",
  className = "",
  onClick,
  ...props
}: ButtonProps) {
  const buttonStyles = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`;

  return (
    <button className={buttonStyles} onClick={onClick} {...props}>
      {children}
    </button>
  );
}
