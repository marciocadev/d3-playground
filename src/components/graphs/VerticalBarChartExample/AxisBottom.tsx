import { ScaleBand } from "d3"

interface AxisBottomProps {
  xScale: ScaleBand<string>,
  bottom: number,
  innerHeight: number,
}

export const AxisBottom = (props: AxisBottomProps) => {
  return (
    <>
      {
        props.xScale.domain().map(tickValue => (
          <text key={tickValue} y={props.bottom}
            transform={`translate(0, ${20})`}
            x={props.xScale(tickValue)}>
            {tickValue}
          </text>
        ))
      }
    </>
  )
}