// import React from "react";

// const Select = ({ value, onChange, options = [], className = "" }) => {
//   return (
//     <select
//       value={value}
//       onChange={onChange}
//       className={`bg-white px-5 py-2 rounded-full border-2 border-primary text-primary font-medium transition-transform duration-200 ease-in-out hover:scale-[1.02] hover:bg-primary/20 hover:text-primary ${className}`}
//     >
//       {options.map((option) => (
//         <option key={option.value} value={option.value}>
//           {option.label}
//         </option>
//       ))}
//     </select>
//   );
// };

// export default Select;


import React from "react";

const Select = ({
  value,
  onChange,
  options = [],
  size = "md",
  variant = "primary",
  className = "",
  ...props
}) => {
  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  const variants = {
    primary: "bg-blue-900 text-white hover:bg-blue-800",
    secondary: "bg-white text-blue-900 hover:bg-gray-100",
    success: "bg-green-500 text-white hover:bg-green-400",
    danger: "bg-red-500 text-white hover:bg-red-400",
    link: "text-blue-900 hover:underline",
    outline: "border border-blue-900 text-blue-900 hover:bg-gray-100",
  };

  return (
    <select
      value={value}
      onChange={onChange}
      className={`rounded-lg shadow-md transition duration-300 ease-in-out focus:outline-none ${sizes[size]} ${variants[variant]} ${className}`}
      {...props}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value} className="text-black">
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default Select;
