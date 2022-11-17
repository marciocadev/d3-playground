import { ScaleTime } from 'd3'

interface AxisBottomProps {
  innerHeight: number
  xScale: ScaleTime<number, number, never>
  tickFormat: any
  tickOffset: number
}

export const AxisBottom = (props: AxisBottomProps) => {
  return (
    <>
    {
      props.xScale.ticks().map(tickValue => (
        <g transform={`translate(${props.xScale(tickValue)}, 0)`}
          className='tick' key={tickValue.toISOString()}>
          <line y2={props.innerHeight} />
          <text style={{ textAnchor: 'middle' }}
            dy='.71em' y={props.innerHeight + props.tickOffset}>
              {props.tickFormat(tickValue)}
          </text>
        </g>
      ))
    }
    </>
  )
}
