import React, { Fragment, useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom/client";
import { Stage, Layer, Shape, Text, Group, Line } from "react-konva";

const App = () => {
  const shapeRef = useRef();
  // (c,b) |-----------------|(a,b)
  //       |                 /(a,q)
  // (c,e) |---------------/(d,e)
  let [a, setA] = useState(100);
  let b = 0;
  let c = 0;
  let [d, setD] = useState(80);
  let [e, setE] = useState(50);
  const [grad, setGrad] = useState(45);
  let initialQ = e - Math.tan((grad * Math.PI) / 180) * (a - d);
  let [q, setQ] = useState(initialQ);
  let [f, setF] = useState(350);
  let [g, setG] = useState(110);

  useEffect(() => {
    setQ(initialQ);
  }, [grad]);
  const handelIncWidth = () => {
    setA(a + 15);
    setD(d + 15);
  };
  const handelDecWidth = () => {
    setA(a - 15);
    setD(d - 15);
  };
  const handelIncHeight = () => {
    setE(e + 15);
    setQ(q + 15);
  };
  const handelDecHeight = () => {
    setE(e - 15);
    setQ(q - 15);
  };
  const handelIncDegree = () => {
    setGrad(grad + 5);
  };
  const handelDecDegree = () => {
    setGrad(grad - 5);
  };
  const handelIncDistance = () => {
    setF(() => f + 5);
    setG(() => g - 5);
  };
  const handelDecDistance = () => {
    setF(() => f - 5);
    setG(() => g + 5);
  };

  return (
    <Fragment>
      <div>
        <label>width : </label>
        <button onClick={handelIncWidth}>+</button>
        <button onClick={handelDecWidth}>-</button>
      </div>
      <div>
        <label>height : </label>
        <button onClick={handelIncHeight}>+ </button>
        <button onClick={handelDecHeight}>-</button>
      </div>
      <div>
        <label>degree : </label>
        <button onClick={handelIncDegree}>+ </button>
        <button onClick={handelDecDegree}>-</button>
      </div>
      <div>
        <label>distance : </label>
        <button onClick={handelIncDistance}>+ </button>
        <button onClick={handelDecDistance}>-</button>
      </div>

      <Stage width={window.innerWidth} height={window.innerHeight}>
        <Layer>
          <Text
            x={100}
            y={250}
            fontSize={20}
            text={
              "a:" +
              a +
              "  b:" +
              b +
              "  c:" +
              c +
              "  d:" +
              d +
              " e:" +
              e +
              "  q:" +
              q.toFixed(0) +
              "  grad:" +
              grad
            }
          />
          <Group draggable>
            <Text
              x={g + (a - c) / 2}
              y={b}
              text={(a - c).toString()}
              fontSize={8}
              fill={"red"}
            />
            <Text
              x={g + (d - c) / 2}
              y={e + 10}
              text={(d - c).toString()}
              fontSize={8}
              fill={"red"}
            />
            <Text
              x={g - 10}
              y={(e - b) / 2}
              text={(e - b).toFixed(0)}
              fontSize={8}
              fill={"red"}
            />
            <Text
              x={g + a}
              y={(q - b) / 2}
              text={(q - b).toFixed(0)}
              fontSize={8}
              fill={"red"}
            />
            <Shape
              ref={shapeRef}
              x={f}
              y={10}
              scaleX={-1}
              sceneFunc={(context, shape) => {
                context.beginPath();
                context.moveTo(a, b);
                context.lineTo(a, b);
                context.lineTo(c, b);
                context.lineTo(c, e);
                context.lineTo(d, e);
                context.lineTo(a, q);
                context.closePath();
                context.fillStrokeShape(shape);
              }}
              fill="green"
              stroke="black"
              strokeWidth={2}
              dragDistance={25}
            />
          </Group>
          <Line
            x={100}
            y={0}
            fill={"red"}
            stroke={"black"}
            strokeWidth={4}
            points={[130, 0, 130, 80]}
            dash={[10, 10]}
          />
          <Group draggable>
            <Shape
              ref={shapeRef}
              x={g}
              y={10}
              sceneFunc={(context, shape) => {
                context.beginPath();
                context.moveTo(d, e);
                // context.moveTo(a, b);
                context.lineTo(d, e);
                // context.lineTo(a, b);
                // context.lineTo(c, b);
                context.lineTo(c, e);
                context.lineTo(c, b);
                context.lineTo(a, b);
                context.lineTo(a, q);
                context.closePath();
                context.fillStrokeShape(shape);
              }}
              fill="red"
              stroke="black"
              strokeWidth={2}
            />
          </Group>
        </Layer>
      </Stage>
    </Fragment>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
