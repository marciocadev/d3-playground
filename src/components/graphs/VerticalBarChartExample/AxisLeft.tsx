import { ScaleLinear } from 'd3'

interface AxisLeftProps {
  innerWidth: number
  yAxisLabelOffset: number
  yScale: ScaleLinear<number, number, never>
  tickFormat: any
}

export const AxisLeft = (props: AxisLeftProps) => {
  return (
    <>
      {props.yScale.ticks().map((tickValue) => (
        <g
          className="tick"
          key={tickValue}
          transform={`translate(0, ${props.yScale(tickValue)})`}
        >
          <line x2={props.innerWidth} />
          <text x={props.yAxisLabelOffset} dx=".71em">
            {props.tickFormat(tickValue)}
          </text>
        </g>
      ))}
    </>
  )
}
