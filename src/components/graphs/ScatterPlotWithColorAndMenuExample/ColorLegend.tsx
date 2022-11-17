interface ColorLegendProps {
  colorScale: any,
  tickSpacing: number,
  tickSize: number,
  tickTextOffset: number
}

export const ColorLegend = (props: ColorLegendProps) =>
  props.colorScale.domain().map((domainValue: string, i: number) => (
    <g transform={`translate(0, ${i * props.tickSpacing})`} className='tick'>
      <circle fill={props.colorScale(domainValue)} r={props.tickSize} />
      <text dy='.32em' x={props.tickTextOffset}>{domainValue}</text>
    </g>
  ))

