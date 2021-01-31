import logo from "../static/logo.png";
import DifficultyComponent from "./DifficultyComponent";

const IntroPage = ({ fields, setFields }) => {
  const { name, step } = fields,
    { setStep } = setFields,
    difficulties = ["easy", "medium", "hard"];

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 ">
      <div className="flex flex-col items-center justify-center bg-indigo-100 py-2">
        <div className="mb-8">
          <img
            style={{ filter: "drop-shadow(0px 0px 0.5px black)" }}
            className="mx-auto h-24 w-auto"
            src={logo}
            alt="Base Maze"
          />
          <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
            Hi, {name}
          </h2>
        </div>
        <button
          onClick={(e) => setStep(1)}
          className="group relative  flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Go back
        </button>
      </div>
      <div className="flex flex-col items-center justify-center">
        <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
          Choose your difficulty!
        </h2>
        <div className="block">
          <div className="mt-2">
            {difficulties.map((difficulty) => (
              <DifficultyComponent
                key={difficulty}
                value={difficulty}
                fields={fields}
                setFields={setFields}
              >
                {difficulty
                  .split("")
                  .map((val, idx) => (idx === 0 ? val.toUpperCase() : val))
                  .join("")}
              </DifficultyComponent>
            ))}
          </div>
          <button
            onClick={(e) => setStep(step + 1)}
            className="group relative  flex justify-center mt-4 py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default IntroPage;
