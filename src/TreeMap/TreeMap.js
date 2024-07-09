import React from "react";
import * as d3 from "d3";

let movieDataURL =
  "https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/movie-data.json";

let movieData;

let canvas = d3.select("#canvas");
let tooltip = d3.select("#tooltip");

let drawTreeMap = () => {
  let hierarchy = d3
    .hierarchy(movieData, (node) => {
      return node["children"];
    })
    .sum((node) => {
      return node["value"];
    })
    .sort((node1, node2) => {
      return node2["value"] - node1["value"];
    });

  let createTreeMap = d3.treemap().size([1000, 600]);

  createTreeMap(hierarchy);

  console.log(hierarchy.leaves());
  let block = canvas
    .selectAll("g")
    .data(hierarchy.leaves())
    .enter()
    .append("g")
    .attr("transform", (movie) => {
      return "translate(" + movie["x0"] + ", " + movie["y0"] + ")";
    });

  block
    .append("rect")
    .attr("class", "tile")
    .attr("fill", (movie) => {
      let category = movie["data"]["category"];
      if (category === "Action") {
        return "orange";
      } else if (category === "Drama") {
        return "lightgreen";
      } else if (category === "Adventure") {
        return "coral";
      } else if (category === "Family") {
        return "lightblue";
      } else if (category === "Animation") {
        return "pink";
      } else if (category === "Comedy") {
        return "khaki";
      } else if (category === "Biography") {
        return "tan";
      }
    })
    .attr("data-name", (movie) => {
      return movie["data"]["name"];
    })
    .attr("data-category", (movie) => {
      return movie["data"]["category"];
    })
    .attr("data-value", (movie) => {
      return movie["data"]["value"];
    })
    .attr("width", (movie) => {
      return movie["x1"] - movie["x0"];
    })
    .attr("height", (movie) => {
      return movie["y1"] - movie["y0"];
    })
    .on("mouseover", (movie) => {
      tooltip.transition().style("visibility", "visible");

      let revenue = movie["data"]["value"]
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

      tooltip.html("$" + revenue + "<hr />" + movie["data"]["name"]);

      tooltip.attr("data-value", movie["data"]["value"]);
    })
    .on("mouseout", (movie) => {
      tooltip.transition().style("visibility", "hidden");
    });

  block
    .append("text")
    .text((movie) => {
      return movie["data"]["name"];
    })
    .attr("x", 5)
    .attr("y", 30);
};

d3.json(movieDataURL).then((data, error) => {
  if (error) {
    console.log(error);
  } else {
    movieData = data;
    console.log(movieData);
    drawTreeMap();
  }
});

const TreeMap = () => {
  return (
    <>
      <h2 id="title">Movie Sales</h2>
      <div id="description">
        Top 95 Highest Grossing Movies sorted by revenue.
      </div>
      <div id="tooltip"></div>
      <svg id="canvas"></svg>
      <svg id="legend">
        <g>
          <rect
            className="legend-item"
            x="10"
            y="0"
            width="40"
            height="40"
            fill="orange"
          ></rect>
          <text x="60" y="20" fill="white">
            Action
          </text>
        </g>
        <g>
          <rect
            className="legend-item"
            x="10"
            y="40"
            width="40"
            height="40"
            fill="lightgreen"
          ></rect>
          <text x="60" y="60" fill="white">
            Drama
          </text>
        </g>
        <g>
          <rect
            className="legend-item"
            x="10"
            y="80"
            width="40"
            height="40"
            fill="coral"
          ></rect>
          <text x="60" y="100" fill="white">
            Adventure
          </text>
        </g>
        <g>
          <rect
            className="legend-item"
            x="10"
            y="120"
            width="40"
            height="40"
            fill="lightblue"
          ></rect>
          <text x="60" y="140" fill="white">
            Family
          </text>
        </g>
        <g>
          <rect
            className="legend-item"
            x="10"
            y="160"
            width="40"
            height="40"
            fill="pink"
          ></rect>
          <text x="60" y="180" fill="white">
            Animation
          </text>
        </g>
        <g>
          <rect
            className="legend-item"
            x="10"
            y="200"
            width="40"
            height="40"
            fill="khaki"
          ></rect>
          <text x="60" y="220" fill="white">
            Comedy
          </text>
        </g>
        <g>
          <rect
            className="legend-item"
            x="10"
            y="240"
            width="40"
            height="40"
            fill="tan"
          ></rect>
          <text x="60" y="260" fill="white">
            Biography
          </text>
        </g>
      </svg>
      <div className="footer">
        Created by{" "}
        <a href="https://www.linkedin.com/in/mohit-maurya-76a282204/">
          Mohit Maurya ❤️
        </a>
      </div>
    </>
  );
};

export default TreeMap;
