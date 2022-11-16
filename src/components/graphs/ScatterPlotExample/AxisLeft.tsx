import { ScaleLinear } from "d3"

interface AxisLeftProps {
  yScale: ScaleLinear<number, number, never>,
  innerWidth: number,
  tickOffset: number
}

export const AxisLeft = (props: AxisLeftProps) => {
  return (
    <>
    {
      props.yScale.ticks().map(tickValue => (
        <g className="tick" transform={`translate(0, ${props.yScale(tickValue)})`}>
          <line x2={props.innerWidth} />
            <text key={tickValue}
                style={{ textAnchor: 'end' }}
                dy='.32em' x={-props.tickOffset}>
              {tickValue}
            </text>
        </g>
      ))
    }
    </>
  )
}