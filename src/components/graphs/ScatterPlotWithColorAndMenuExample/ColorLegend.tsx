interface ColorLegendProps {
  colorScale: any,
  tickSpacing: number,
  tickSize: number,
  tickTextOffset: number,
  onHover: any,
  hoveredValue: any,
  fadeOpacity: number
}

export const ColorLegend = ({
  colorScale,
  tickSpacing,
  tickSize,
  tickTextOffset,
  onHover,
  hoveredValue,
  fadeOpacity
}: ColorLegendProps) =>
  colorScale.domain().map((domainValue: string, i: number) => (
    <g className='tick' transform={`translate(0, ${i * tickSpacing})`}
      opacity={hoveredValue && domainValue !== hoveredValue ? fadeOpacity : 1}
      onMouseEnter={() => onHover(domainValue)}
      onMouseOut={() => onHover(null)}>

      <circle fill={colorScale(domainValue)} r={tickSize} />

      <text dy='.32em' x={tickTextOffset}>
        {domainValue}
      </text>
    </g>
  ))

