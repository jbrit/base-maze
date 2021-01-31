import React from "react";
import { mazeMapGen } from "../constants";

const MazeBoard = React.memo(({ gridMap }) => {
  return gridMap ? (
    mazeMapGen(gridMap)
  ) : (
    <div className="bg-white h-full, w-full"></div>
  );
});

export default MazeBoard;
