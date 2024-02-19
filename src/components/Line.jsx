import { useEffect, useRef, useState } from "react";

const TARGET = {
  C1: 0,
  C2: 1,
};

export const Line = (props) => {
  const [c1, setC1] = useState(props.c1);
  const [c2, setC2] = useState(props.c2);
  const c1Ref = useRef(c1);
  const c2Ref = useRef(c2);

  // recalculate all positions upon window resizing
  useEffect(() => {
    setC1((prev) => [prev[0] * props.widthRatio, prev[1] * props.heightRatio]);
    setC2((prev) => [prev[0] * props.widthRatio, prev[1] * props.heightRatio]);
  }, [props.widthRatio, props.heightRatio]);

  const getMovements = (event) => {
    const rect = props.canvasRef.current.getBoundingClientRect();
    const xDistance = (event.clientX - rect.left) / props.scale;
    const yDistance = (event.clientY - rect.top) / props.scale;
    return [xDistance, yDistance];
  };

  const pickupCircle = (e, target) => {
    // prevent triggering upper level events such as panning
    e.stopPropagation();

    const drag = (event) => {
      const movements = getMovements(
        event,
        props.canvasRef.current,
        props.scale
      );
      if (target === TARGET.C1) {
        setC1([movements[0], movements[1]]);
        c1Ref.current = [movements[0], movements[1]];
      } else if (target === TARGET.C2) {
        setC2([movements[0], movements[1]]);
        c2Ref.current = [movements[0], movements[1]];
      }
    };

    // register position-updating on mousemove
    window.addEventListener("mousemove", drag);

    const dropdownTarget = () => {
      window.removeEventListener("mousemove", drag);
      window.removeEventListener("mouseup", dropdownTarget);
    };

    // stop tracking mousemove
    window.addEventListener("mouseup", dropdownTarget);
  };

  const calculateLength = () => {
    const width = Math.abs(c1[0] - c2[0]);
    const height = Math.abs(c1[1] - c2[1]);
    const diagonal = Math.sqrt(width * width + height * height);
    return Math.round(diagonal);
  };

  return (
    <g>
      <line
        x1={c1[0]}
        y1={c1[1]}
        x2={c2[0]}
        y2={c2[1]}
        strokeWidth={props.strokeWidth / props.scale}
        stroke={props.svgColor}
      />
      <circle
        onMouseDown={(e) => pickupCircle(e, TARGET.C1)}
        r={props.radius / props.scale}
        cx={c1[0]}
        cy={c1[1]}
        fill={props.svgColor}
      />
      <circle
        onMouseDown={(e) => pickupCircle(e, TARGET.C2)}
        r={props.radius / props.scale}
        cx={c2[0]}
        cy={c2[1]}
        fill={props.svgColor}
      />
      <text
        style={{
          WebkitUserSelect: "none",
          msUserSelect: "none",
          userSelect: "none",
          textAnchor: "middle",
          fontSize: props.fontSize,
          fill: props.textColor,
        }}
        x={(c1[0] + c2[0]) / 2}
        y={(c1[1] + c2[1]) / 2}
      >
        {calculateLength()}
      </text>
    </g>
  );
};
