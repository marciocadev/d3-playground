import { extent, format, scaleLinear, scaleTime, timeFormat } from 'd3'
import { AxisBottom } from './AxisBottom'
import { AxisLeft } from './AxisLeft'
import { Marks } from './Marks'
import { useData } from './useData'

export const LineChartExample = () => {
  const url = 'https://gist.githubusercontent.com/curran/90240a6d88bdb1411467b21ea0769029/raw/7d4c3914cc6a29a7f5165f7d5d82b735d97bcfe4/week_temperature_sf.csv'

  const data = useData(url)

  if (data == null) {
    return <pre>Loading...</pre>
  };

  const width = 1024
  const height = 500
  const margin = {
    top: 20,
    right: 30,
    bottom: 65,
    left: 90
  }
  const xAxisLabelOffset = 50
  const yAxisLabelOffset = 40
  const innerHeight = height - margin.top - margin.bottom
  const innerWidth = width - margin.left - margin.right

  const xValue = (d: any) => d.timestamp as (Date)
  const xAxisLabel = 'Time'
  const xExtent = extent(data, xValue)
  const xScale = scaleTime()
    .domain(xExtent[0] === undefined ? [0, 0] : xExtent)
    .range([0, innerWidth])
    .nice()

  const yAxisLabel = 'Tempareture'
  const yValue = (d: any) => d.temperature as (number | undefined)
  const yExtent = extent(data, yValue)
  const yScale = scaleLinear()
    .domain(yExtent[0] === undefined ? [0, 0] : yExtent)
    .range([innerHeight, 0])
    .nice()

  const xAxisTickFormat = timeFormat('%a %d')
  const siFormat = format('.2s')
  const yAxisTickFormat = (tickValue: number | { valueOf: () => number }) =>
    siFormat(tickValue).replace('G', 'B') + '°F'

  const circleRadius = 3.5

  return (
    <svg width={width} height={height}>
      <g transform={`translate(${margin.left}, ${margin.top})`}>
        <text textAnchor='middle' className="axis-label"
          transform={`translate(${-yAxisLabelOffset}, ${innerHeight / 2}) rotate(-90) `}
          >
          {yAxisLabel}
        </text>
        { <AxisLeft yScale={yScale} innerWidth={innerWidth}
          tickOffset={7} /> }
        <text textAnchor='middle' className="axis-label"
          x={innerWidth / 2} y={innerHeight + xAxisLabelOffset} >
          {xAxisLabel}
        </text>
        { <AxisBottom xScale={xScale} innerHeight={innerHeight}
          tickFormat={xAxisTickFormat} tickOffset={7} /> }
        { <Marks data={data} xScale={xScale} yScale={yScale} circleRadius={circleRadius}
          yValue={yValue} xValue={xValue}
          yTooltipFormat={yAxisTickFormat} xTooltipFormat={xAxisTickFormat} /> }
      </g>
    </svg>
  )
}
