import Graph from "graphology";
import { SigmaContainer } from "@react-sigma/core";
import React from "react";

function QuizGraphTheory(props) {
  const FIRST_COLOR = "black";
  const SECOND_COLOR = "grey";
  const THIRD_COLOR = "grey";
  const DISTANCE = 1;

  const graph = new Graph();

  React.useEffect(() => {
    graph.addNode("Student", {
      size: 15,
      color: "blue",
      x: 0,
      y: 0.3,
    });
    graph.addNode("SE", {
      size: 15,
      label: "  SWE: ≈ " + props.weightSE + " Weight",
      color: "yellow",
      x: DISTANCE,
      y: 0,
    });
    graph.addNode("CSE", {
      size: 15,
      label: "  CSE: ≈ " + props.weightCSE + " Weight",
      color: "red",
      x: DISTANCE,
      y: 0.3,
    });
    graph.addNode("RE", {
      size: 15,
      label: "  REE: ≈ " + props.weightRE + " Weight",
      color: "green",
      x: DISTANCE,
      y: 0.6,
    });

    const weights = [
      { vertex: "SE", value: props.weightSE },
      { vertex: "CSE", value: props.weightCSE },
      { vertex: "RE", value: props.weightRE },
    ];
    weights.sort(function (a, b) {
      return b.value - a.value;
    });
    weights[0].value = weights[0].value > 1 ? weights[0].value : 2;
    weights[1].value = weights[1].value > 0 ? weights[1].value : 1;
    weights[2].value = weights[2].value > 0 ? weights[2].value : 1;
    graph.addEdge("Student", weights[0].vertex, {
      size: weights[0].value,
      color: FIRST_COLOR,
    });
    graph.addEdge("Student", weights[1].vertex, {
      size: weights[1].value,
      color: SECOND_COLOR,
    });
    graph.addEdge("Student", weights[2].vertex, {
      size: weights[2].value,
      color: THIRD_COLOR,
    });
  });

  return (
    <SigmaContainer
      initialSettings={{
        minCameraRatio: 1.5,
        maxCameraRatio: 1.5,
      }}
      graph={graph}
      style={{
        position: "relative",
        height: "300px",
        paddingRight: "12%",
        width: "60%",
        backgroundColor: "rgb(220, 250, 250)",
        margin: "auto",
        marginTop: "4%",
        marginBottom: "4%",
        borderStyle: "solid",
        borderImage:
          "url('data:image/svg+xml;charset=utf-8,%3Csvg width=%27100%27 height=%27100%27 viewBox=%270 0 100 100%27 fill=%27none%27 xmlns=%27http://www.w3.org/2000/svg%27%3E %3Cstyle%3Epath%7B %3B%7D%40keyframes stroke%7Bto%7Bstroke-dashoffset:776%3B%7D%7D%3C/style%3E%3ClinearGradient id=%27g%27 x1=%270%25%27 y1=%270%25%27 x2=%270%25%27 y2=%27100%25%27%3E%3Cstop offset=%270%25%27 stop-color=%27%2300ffff%27 /%3E%3Cstop offset=%2725%25%27 stop-color=%27%23c05c7e%27 /%3E%3Cstop offset=%2750%25%27 stop-color=%27%23f3826f%27 /%3E%3Cstop offset=%27100%25%27 stop-color=%27%23ffb961%27 /%3E%3C/linearGradient%3E %3Cpath d=%27M1.5 1.5 l97 0l0 97l-97 0 l0 -97%27 stroke-linecap=%27square%27 stroke=%27url%28%23g%29%27 stroke-width=%273%27 stroke-dasharray=%27388%27/%3E %3C/svg%3E') 1",
      }}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
          top: "0",
        }}
      ></div>
    </SigmaContainer>
  );
}

export default QuizGraphTheory;
