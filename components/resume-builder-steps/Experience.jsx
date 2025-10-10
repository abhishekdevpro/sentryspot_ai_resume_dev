import { Button } from "../ui/Button";

export default function ExperienceStep({ onNext,onBack, onChange, value }) {
  const experiences = [
    { id: "none", label: "No Experience" },
    { id: "less-3", label: "Less Than 3 Years" },
    { id: "3-5", label: "3-5 Years" },
    { id: "5-10", label: "5-10 Years" },
    { id: "10-plus", label: "10+ Years" },
  ];

  return (
    <div className="space-y-6">
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-12">
        <div className="max-w-xl text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">
            How long have you been working?
          </h1>
          <p className="text-md md:text-lg text-blue-900 mb-10">
            We will find the best templates for your professional experience level.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-xl w-full">
          {experiences.map((exp) => (
            <button
              key={exp.id}
              onClick={() => {
                onChange(exp.id);
                onNext();
              }}

              className={`w-full p-5 rounded-2xl shadow-md bg-transparent border border-blue-900
                        hover:bg-blue-900 hover:text-white hover:shadow-xl 
                        flex items-center justify-between text-blue-900 font-semibold
                        transition-all duration-300 ease-in-out transform hover:scale-105 group
                        ${value.experience === exp.id
                  ? "bg-blue-900 text-white border-2 border-blue-900 shadow-xl scale-105"
                  : ""
                }`}
            >
              {/* {exp.label} */}
              <span className="text-lg mb-2">{exp.label}</span>
              <span className="text-xl transition-transform duration-300 ease-in-out group-hover:translate-x-1">
                →
              </span>
            </button>
          ))}
        </div>
        {/* <div className="mt-10 flex max-w-xl w-full justify-between gap-4 ">
          <button
            onClick={onBack}
            className="px-8 py-3 bg-transparent border border-blue-900 rounded-xl text-gray-700 
              font-medium hover:bg-gray-500 hover:text-white hover:border-gray-400 transition-colors"
          >
            Back
          </button>
          <button
            className="px-8 py-3 bg-blue-900 border border-blue-900 rounded-xl text-white
              font-medium hover:bg-blue-800" 
          >
            Next
          </button>
        </div> */}
      </main>
    </div>
  );
}
