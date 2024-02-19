import { useState, useRef, useEffect, useLayoutEffect } from "react";
import styled, { css } from "styled-components";
import {
  MinusCircleFilled,
  PlusCircleFilled,
  LeftCircleOutlined,
  RightCircleOutlined,
} from "@ant-design/icons";
import { Line } from "./Line.jsx";

const AnnotationBackground = styled.div.attrs((props) => ({
  style: {
    transform: `scale(${props.scale})`,
    top: props.top + "px",
    left: props.left + "px",
    width: props.width,
    height: props.height,
  },
}))`
  background-color: white;
  position: relative;
  display: flex;
`;

const Annotation = styled.div.attrs((props) => ({
  style: {
    width: props.width,
    height: props.height,
    cursor: props.$panning ? "grabbing " : "grab",
  },
}))`
  position: relative;
  overflow: hidden;
  display: flex;
  background-color: #454545;
  align-items: center;
  justify-content: center;
`;

const Controller = styled.div`
  display: flex;
  position: absolute;
  padding: 0.2rem;
  top: 0;
  left: calc(100% - 4rem);
  transition: left 0.2s linear;
  ${(props) =>
    props.$onLeft &&
    css`
      left: 0;
    `};
`;

const Svg = styled.svg`
  position: absolute;
  width: 100%;
  height: 100%;
`;

export const Annotator = ({
  maxZoomInFactor,
  themeColor,
  contrastColor,
  componentWidth,
  componentHeight,
  dotSize,
  lineWidth,
  fontSize,
  imgSrc,
}) => {
  const [scaleFactor, setScaleFactor] = useState(1);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [onLeft, setOnLeft] = useState(true);

  // to allow svg re-scaling after window resize
  const [widthChange, setWidthChange] = useState(1);
  const [heightChange, setHeightChange] = useState(1);

  const annotateSection = useRef(null);
  const annotateClip = useRef(null);
  const drawboard = useRef(null);

  // scaling and panning
  const [offsets, setOffsets] = useState([0, 0]);
  const [panning, setPanning] = useState(false);

  const [lineCount, setLineCount] = useState(0);

  useEffect(() => {
    window.addEventListener("resize", () => resizeEveything());
    return window.removeEventListener("resize", getLocalDimensions);
  }, []);

  useLayoutEffect(() => {
    getLocalDimensions();
  }, []);

  const resizeEveything = () => {
    const container = annotateSection.current.getBoundingClientRect();
    setWidth((prevWidth) => {
      setWidthChange(container.width / prevWidth);
      return container.width;
    });
    setHeight((prevHeight) => {
      setHeightChange(container.height / prevHeight);
      return container.height;
    });
  };

  const getLocalDimensions = () => {
    const container = annotateSection.current.getBoundingClientRect();
    setWidth(container.width);
    setHeight(container.height);
  };

  const zoomImage = (event) => {
    const factor = getZoomFactor(event);
    setOffsets(calcFinalOffsets(0, 0, factor));
    setScaleFactor(factor);
  };

  const getZoomFactor = (event) => {
    const change = event.deltaY * 0.001;
    return Math.min(Math.max(scaleFactor - change, 1), maxZoomInFactor);
  };

  const calcFinalOffsets = (movementX, movementY, zoomFactor = scaleFactor) => {
    const xLimit = ((zoomFactor - 1) * width) / 2;
    const yLimit = ((zoomFactor - 1) * height) / 2;
    const finalX = Math.max(
      xLimit * -1,
      Math.min(xLimit, offsets[0] + movementX)
    );
    const finalY = Math.max(
      yLimit * -1,
      Math.min(yLimit, offsets[1] + movementY)
    );
    return [finalX, finalY];
  };

  const pan = (event) => {
    const magnifier = 2;
    const calc = calcFinalOffsets(
      event.movementX * magnifier,
      event.movementY * magnifier
    );
    if (panning) {
      setOffsets(calc);
    }
  };

  const iconStyle = () => {
    return { color: themeColor, width: "1.2rem" };
  };

  return (
    <Annotation
      onMouseUp={() => setPanning(false)}
      onMouseDown={() => setPanning(true)}
      onMouseMove={pan}
      ref={annotateSection}
      $panning={panning}
      width={componentWidth}
      height={componentHeight}
    >
      <AnnotationBackground
        ref={annotateClip}
        onWheel={zoomImage}
        scale={scaleFactor}
        left={offsets[0]}
        top={offsets[1]}
        width={width}
        height={height}
      >
        <img
          src={imgSrc}
          style={{
            width: width,
            height: height,
          }}
          alt="Background"
        />
        <Svg ref={drawboard} viewBox={`0 0 ${width} ${height}`}>
          {Array(lineCount)
            .fill(null)
            .map((_, i) => (
              <Line
                key={i}
                c1={[width * 0.4, height / 2]}
                c2={[width * 0.6, height / 2]}
                radius={dotSize}
                strokeWidth={lineWidth}
                scale={scaleFactor}
                canvasRef={drawboard}
                svgColor={themeColor}
                textColor={contrastColor}
                fontSize={fontSize}
                widthRatio={widthChange}
                heightRatio={heightChange}
              />
            ))}
        </Svg>
      </AnnotationBackground>
      <Controller $onLeft={onLeft}>
        {!onLeft && (
          <LeftCircleOutlined
            style={iconStyle()}
            onClick={() => setOnLeft(true)}
          />
        )}
        <PlusCircleFilled
          style={iconStyle()}
          onClick={() => setLineCount(lineCount + 1)}
        />
        <MinusCircleFilled
          style={iconStyle()}
          onClick={() => setLineCount(Math.max(0, lineCount - 1))}
        />
        {onLeft && (
          <RightCircleOutlined
            style={iconStyle()}
            onClick={() => setOnLeft(false)}
          />
        )}
      </Controller>
    </Annotation>
  );
};

Annotator.defaultProps = {
  maxZoomInFactor: 5,
  themeColor: "#ff2da4",
  contrastColor: "#a60050",
  componentWidth: "100%",
  componentHeight: "400px",
  dotSize: 8,
  lineWidth: 3,
  fontSize: "0.8rem",
  imgSrc:
    "https://img1.baidu.com/it/u=904793130,704474900&fm=253&fmt=auto&app=138&f=JPG?w=800&h=500",
};
