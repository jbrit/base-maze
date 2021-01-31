import React from "react";

export const mazeSize = (difficulty) => {
  switch (difficulty) {
    case "medium":
      return 18;

    case "hard":
      return 24;

    default:
      return 12;
  }
};

const validSize = (num) => isNaN(num) || num < 5 || num > 999;

const direction = () => {
  const num = Math.floor(Math.random() * 4);
  switch (num) {
    // case 0:
    //   return "nw";
    // case 1:
    //   return "ne";
    // case 2:
    //   return "sw";
    // case 3:
    //   return "se";
    default:
      return "nw";
  }
};

export class Maze {
  // Constructor
  constructor(w, h, canvas) {
    this.canvas = canvas;
    this.w = validSize(w) ? 20 : w;
    this.h = validSize(h) ? 20 : h;
    this.map = [];
    for (var mh = 0; mh < h; ++mh) {
      this.map[mh] = [];
      for (var mw = 0; mw < w; ++mw) {
        this.map[mh][mw] = { n: 0, s: 0, e: 0, w: 0 };
      }
    }
    var bias = direction();
    this.build(bias);
  }
  //   Build method
  build(dir) {
    var dirs = [];
    dirs.push(dir === "ne" || dir === "nw" ? "n" : "s");
    dirs.push(dir === "ne" || dir === "se" ? "e" : "w");

    for (var y = 0; y < this.h; ++y) {
      var trueY = dir === "nw" || dir === "ne" ? this.h - (y + 1) : y;

      for (var x = 0; x < this.w; ++x) {
        var trueX = dir === "nw" || dir === "sw" ? this.w - (x + 1) : x;
        var m = 0;

        // If we're at the opposite corners for our movement, break!
        if (
          trueY === 0 &&
          dirs[0] === "n" &&
          ((trueX === 0 && dirs[1] === "w") ||
            (trueX === this.w - 1 && dirs[1] === "e"))
        ) {
          break;
        }
        if (
          trueY === this.h - 1 &&
          dirs[0] === "s" &&
          ((trueX === 0 && dirs[1] === "w") ||
            (trueX === this.w - 1 && dirs[1] === "e"))
        ) {
          break;
        }

        // If we're at an opposite border, move the only way we can...
        if (trueY === 0 && dirs[0] === "n") {
          this.map[trueY][trueX][dirs[1]] = 1;
          this.map[trueY][trueX + (dirs[1] === "w" ? -1 : 1)][
            dirs[1] === "w" ? "e" : "w"
          ] = 1;
          m = 1;
        } else if (trueY === this.h - 1 && dirs[0] === "s") {
          this.map[trueY][trueX][dirs[1]] = 1;
          this.map[trueY][trueX + (dirs[1] === "w" ? -1 : 1)][
            dirs[1] === "w" ? "e" : "w"
          ] = 1;
          m = 1;
        } else if (trueX === 0 && dirs[1] === "w") {
          this.map[trueY][trueX][dirs[0]] = 1;
          this.map[trueY + (dirs[0] === "n" ? -1 : 1)][trueX][
            dirs[0] === "n" ? "s" : "n"
          ] = 1;
          m = 1;
        } else if (trueX === this.w - 1 && dirs[1] === "e") {
          this.map[trueY][trueX][dirs[0]] = 1;
          this.map[trueY + (dirs[0] === "n" ? -1 : 1)][trueX][
            dirs[0] === "n" ? "s" : "n"
          ] = 1;
          m = 1;
        }

        if (m === 0) {
          var mov = dirs[Math.floor((Math.random() * 1000) % 2)];

          if (mov === "n") {
            this.map[trueY][trueX][mov] = 1;
            this.map[trueY - 1][trueX]["s"] = 1;
          } else if (mov === "s") {
            this.map[trueY][trueX][mov] = 1;
            this.map[trueY + 1][trueX]["n"] = 1;
          } else if (mov === "w") {
            this.map[trueY][trueX][mov] = 1;
            this.map[trueY][trueX - 1]["e"] = 1;
          } else if (mov === "e") {
            this.map[trueY][trueX][mov] = 1;
            this.map[trueY][trueX + 1]["w"] = 1;
          }
        }
      }
    }

    this.toGrid();
  }

  toGrid() {
    var grid = [];
    for (var mh = 0; mh < this.h * 2 + 1; ++mh) {
      grid[mh] = [];
      for (var mw = 0; mw < this.w * 2 + 1; ++mw) {
        grid[mh][mw] = 0;
      }
    }

    for (var y = 0; y < this.h; ++y) {
      var py = y * 2 + 1;

      for (var x = 0; x < this.w; ++x) {
        var px = x * 2 + 1;

        grid[py][px] = 1;

        if (this.map[y][x]["n"] === 1) {
          grid[py - 1][px] = 1;
        }
        if (this.map[y][x]["s"] === 1) {
          grid[py + 1][px] = 1;
        }
        if (this.map[y][x]["e"] === 1) {
          grid[py][px + 1] = 1;
        }
        if (this.map[y][x]["w"] === 1) {
          grid[py][px - 1] = 1;
        }
      }
    }

    this.gridMap = grid;
    this.gridW = grid.length;
    this.gridH = grid[0].length;
  }
}

const cellBlock = (num) => (
  <div
    style={{
      height: "10px",
      width: "10px",
      backgroundColor: num === 0 ? "transparent" : "white",
    }}
    className="gameCell"
  ></div>
);

const mazeRow = (row) => (
  <div className="gameRow">
    {row.map((cell, idx) => (
      <React.Fragment key={idx}>{cellBlock(cell)}</React.Fragment>
    ))}
  </div>
);

export const mazeMapGen = (gridMap) =>
  gridMap.map((row, idx) => (
    <React.Fragment key={idx}>{mazeRow(row)}</React.Fragment>
  ));
