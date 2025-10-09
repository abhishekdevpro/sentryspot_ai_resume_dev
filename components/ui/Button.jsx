export const Button = ({
  children,
  size = "md",
  variant = "primary",
  icon: Icon,           // pass an icon component here
  iconPosition = "left", // left or right
  onClick,
  className = "",
  ...props
}) => {
  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-2 text-base",
    lg: "px-8 py-4 text-lg",
  };

  const variants = {
    primary: "bg-blue-900 text-white hover:bg-blue-800",
    secondary: "bg-white text-blue-900 hover:bg-gray-300",
    success: "bg-green-500 text-white hover:bg-green-400",
    danger: "bg-red-500 text-white hover:bg-red-400",
    link: "text-blue-900 hover:underline",
    outline: "border border-blue-900 text-blue-900 hover:bg-gray-400",
  };
  
  return (
    <button
      className={`inline-flex items-center justify-center gap-2 ${sizes[size]} ${variants[variant]} rounded-full shadow-md transition duration-300 ease-in-out focus:outline-none ${className}`}
      onClick={onClick}
      {...props}
    >
      {Icon && iconPosition === "left" && <Icon size={18} />}
      {children}
      {Icon && iconPosition === "right" && <Icon size={18} />}
    </button>
  );
};

