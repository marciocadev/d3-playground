import { ScaleBand } from "d3"

interface AxisLeftProps {
  yScale: ScaleBand<string>
}

export const AxisLeft = (props: AxisLeftProps) => {
  return (
    <>
    <g className="tick">
    {
      props.yScale.domain().map(tickValue => (
        <text key={tickValue}
            style={{ textAnchor: 'end' }} dy='.32em' x={-3}
            y={props.yScale(tickValue)! + props.yScale.bandwidth() / 2}>
          {tickValue}
        </text>
      ))
    }
    </g>
    </>
  )
}