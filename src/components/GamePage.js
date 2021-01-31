import { useEffect, useState } from "react";
import { Maze, mazeSize } from "../constants";
import MazeBoard from "./MazeBoard";

const GamePage = ({ fields, setFields }) => {
  const { diff, step } = fields,
    { setStep } = setFields,
    size = mazeSize(diff);

  const [gridMap, setGridMap] = useState(null);
  const [count, setCount] = useState(0);
  // Game Data
  const [position, setPosition] = useState([size * 2, size * 2]);
  const [moves, setMoves] = useState(0);

  useEffect(() => {
    setGridMap(new Maze(size, size).gridMap);
    setPosition([size * 2 - 1, size * 2 - 1]);
    setMoves(0);
  }, [size, count]);

  const divSize = `${size * 20 + 10}px`;
  const moveIfCan = (toPosition, from) => {
    if (
      toPosition[0] < 1 ||
      toPosition[1] < 1 ||
      toPosition[0] >= size * 2 ||
      toPosition[1] >= size * 2 ||
      gridMap[toPosition[1]][toPosition[0]] === 0 ||
      (from[0] === 1 && from[1] === 1)
    )
      return;
    setPosition(toPosition);
    setMoves(moves + 1);
    if (toPosition[0] === 1 && toPosition[1] === 1)
      alert("You have solved the maze!!");
  };

  window.onkeydown = (e) => {
    if (e.keyCode < 37 || e.keyCode > 40) return;
    console.log(e);
    // Left
    if (e.keyCode === 37) moveIfCan([position[0], position[1] - 1], position);
    // Right
    if (e.keyCode === 39) moveIfCan([position[0], position[1] + 1], position);
    // Up
    if (e.keyCode === 38) moveIfCan([position[0] - 1, position[1]], position);
    // Down
    if (e.keyCode === 40) moveIfCan([position[0] + 1, position[1]], position);
  };

  return (
    <>
      <nav class="bg-indigo-800 mb-10">
        <div class="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
          <div class="relative flex items-center justify-between h-16">
            <span className="text-white text-lg font-bold font-mono">
              Base Maze
            </span>

            <div class="block ml-6">
              <div class="flex  space-x-4">
                <button
                  onClick={(e) => setStep(step - 1)}
                  class="text-gray-300 focus:outline-none hover:bg-indigo-600 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Back
                </button>

                <button
                  onClick={(e) => setCount(count + 1)}
                  class="text-gray-300 focus:outline-none hover:bg-indigo-600 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Restart
                </button>

                <span className="text-white px-0 py-2 rounded-md text-sm font-medium">
                  Moves:
                </span>
                <span className="bg-indigo-600 text-white px-3 py-2 rounded-md text-sm font-medium">
                  {moves}
                </span>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="py-5">
        <div className="flex flex-col items-center">
          <div
            style={{ height: divSize, width: divSize, flexWrap: "wrap" }}
            className="flex relative bg-indigo-300"
          >
            <div
              className="absolute rounded block"
              style={{
                transform: `translate(${position[1] * 10}px, ${
                  position[0] * 10
                }px)`,
                height: "10px",
                width: "10px",
                backgroundColor: "black",
              }}
            ></div>
            <div
              className="absolute block"
              style={{
                transform: `translate(10px, 10px)`,
                height: "10px",
                width: "10px",
                backgroundColor: "grey",
              }}
            ></div>
            <MazeBoard gridMap={gridMap} />
          </div>
        </div>
      </div>

      <div className="text-center text-sm">&copy; Base Maze 2021</div>
    </>
  );
};

export default GamePage;
