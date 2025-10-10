import { motion } from "framer-motion";

export default function Stepper({ steps, currentStep }) {
  return (
    <div className="flex items-center justify-between w-full max-w-3xl mx-auto">
      {steps?.map((label, index) => (
        <div key={index} className="flex flex-col items-center flex-1 relative">
          {/* Circle */}
          <motion.div
            initial={false}
            animate={{
              backgroundColor:
                index < currentStep
                  ? "#2563eb" // blue filled
                  : index === currentStep
                    ? "#fff" // active (white)
                    : "#fff", // upcoming (white)
              color:
                index < currentStep
                  ? "#fff" // completed → white text
                  : index === currentStep
                    ? "#000" // active → black text
                    : "#000", // upcoming → black text
              borderColor: index <= currentStep ? "#2563eb" : "#d1d5db",
              borderWidth: 2,
              scale: index === currentStep ? 1.1 : 1,
            }}
            transition={{ duration: 0.3 }}
            className="w-10 h-10 flex items-center justify-center rounded-full font-semibold z-10"
          >
            {index + 1}
          </motion.div>

          {/* Label */}
          <span className="mt-2 text-sm">{label}</span>

          {/* Connector */}
          {index < steps.length - 1 && (
            <div className="absolute top-5 left-1/2 w-full">
              <div
                className={`h-[2px] w-full ${index < currentStep ? "bg-blue-500" : "bg-gray-300"
                  }`}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
