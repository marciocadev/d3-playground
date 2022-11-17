import { format, max, scaleBand, scaleLinear } from 'd3'
import { AxisBottom } from './AxisBottom'
import { AxisLeft } from './AxisLeft'
import { Marks } from './Marks'
import { useData } from './useData'

export const HorizontalBarChartExample = () => {
  const url = 'https://gist.githubusercontent.com/curran/0ac4077c7fc6390f5dd33bf5c06cb5ff/raw/605c54080c7a93a417a3cea93fd52e7550e76500/UN_Population_2019.csv'

  const width = 1024
  const height = 500
  const margin = {
    top: 20,
    right: 30,
    bottom: 65,
    left: 220
  }
  const xAxisLabelOffset = 50
  const innerHeight = height - margin.top - margin.bottom
  const innerWidth = width - margin.left - margin.right

  const data = useData(url)

  if (data == null) {
    return <pre>Loading...</pre>
  };

  const xValue = (d: any) => d.Population
  const xScale = scaleLinear()
    .domain([0, max(data, xValue)])
    .range([0, innerWidth])

  const yValue = (d: any) => d.Country
  const yScale = scaleBand()
    .domain(data.map(yValue))
    .range([0, innerHeight])
    .paddingInner(0.15)

  const siFormat = format('.2s')
  const xAxisTickFormat = (tickValue: number | { valueOf: () => number }) => siFormat(tickValue).replace('G', 'B')

  return (
    <svg width={width} height={height}>
      <g transform={`translate(${margin.left}, ${margin.top})`}>
        { <AxisLeft yScale={yScale} /> }
        { <AxisBottom xScale={xScale} innerHeight={innerHeight}
          tickFormat={xAxisTickFormat} /> }
        <text textAnchor='middle' className="axis-label"
          x={innerWidth / 2} y={innerHeight + xAxisLabelOffset}>Population</text>
        { <Marks data={data} xScale={xScale} yScale={yScale}
          xValue={xValue} yValue={yValue} tooltipFormat={xAxisTickFormat} /> }
      </g>
    </svg>
  )
}
