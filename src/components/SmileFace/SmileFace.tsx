import { arc } from 'd3';

const width = 960;
const height = 500;
const centerX = width / 2;
const centerY = height / 2
const strokeWidth = 20;
const eyeOffSetX = 90;
const eyeOffSetY = 100;
const eyeRadius = 50;
const mouthWidth = 20;
const mouthRadius = 140;

const mouthArc = arc()
const smileMouthArcParam = {
  innerRadius: mouthRadius,
  outerRadius: mouthRadius + mouthWidth,
  startAngle: Math.PI / 2,
  endAngle: Math.PI * 3 / 2,
}
let mouth = mouthArc(smileMouthArcParam);

interface BackgroundCircleProps {
  radius: number,
  cy?: number,
  cx?: number,
  strokeWidth?: number
}
export const BackgroundCircle = (props: BackgroundCircleProps) => {
  return (
    <circle r={props.radius}
      fill={'#ff0'} stroke={"#000"}
      strokeWidth={props.strokeWidth} />
  );
}

export const SmileFace = () => {
  return (
    <svg width={width} height={height}>
      <g transform={`translate(${centerX}, ${centerY})`}>
        <BackgroundCircle radius={centerY - strokeWidth / 2}
          strokeWidth={strokeWidth}/>
        <circle cx={-eyeOffSetX} cy={-eyeOffSetY} r={eyeRadius} />
        <circle cx={eyeOffSetX} cy={-eyeOffSetY} r={eyeRadius} />
        <path d={typeof mouth === 'string' ? mouth : undefined} />
        {/* <path d={typeof mouth === 'string' ? mouth : undefined} /> */}
      </g>
    </svg>
  )
}