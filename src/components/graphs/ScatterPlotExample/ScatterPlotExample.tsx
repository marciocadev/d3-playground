import { extent, format, scaleLinear } from 'd3'
import { AxisBottom } from './AxisBottom'
import { AxisLeft } from './AxisLeft'
import { Marks } from './Marks'
import { useData } from './useData'

export const ScatterPlotExample = () => {
  const url = 'https://gist.githubusercontent.com/curran/a08a1080b88344b0c8a7/raw/0e7a9b0a5d22642a06d3d5b9bcbad9890c8ee534/iris.csv'

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

  const xAxisLabel = 'Sepal Length'
  const xValue = (d: any) => d.sepal_length as (number | undefined)
  // const xMax = max(data, xValue);
  // const xMin = min(data, xValue)
  const xExtent = extent(data, xValue)
  const xScale = scaleLinear()
    .domain(xExtent[0] === undefined ? [0, 0] : xExtent)
    .range([0, innerWidth])
    .nice()

  const yAxisLabel = 'Sepal Width'
  const yValue = (d: any) => d.sepal_width as (number | undefined)
  const yExtent = extent(data, yValue)
  const yScale = scaleLinear()
    .domain(yExtent[0] === undefined ? [0, 0] : yExtent)
    .range([innerHeight, 0])

  const siFormat = format('.2s')
  const xAxisTickFormat = (tickValue: number | { valueOf: () => number }) => siFormat(tickValue).replace('G', 'B')

  const circleRadius = 7

  return (
    <svg width={width} height={height}>
      <g transform={`translate(${margin.left}, ${margin.top})`}>
        <text textAnchor='middle' className="axis-label"
          transform={`translate(${-yAxisLabelOffset}, ${innerHeight / 2}) rotate(-90) `}
          >
          {yAxisLabel}
        </text>
        { <AxisLeft yScale={yScale} innerWidth={innerWidth}
          tickOffset={5} /> }
        <text textAnchor='middle' className="axis-label"
          x={innerWidth / 2} y={innerHeight + xAxisLabelOffset} >
          {xAxisLabel}
        </text>
        { <AxisBottom xScale={xScale} innerHeight={innerHeight}
          tickFormat={xAxisTickFormat} tickOffset={5} /> }
        { <Marks data={data} xScale={xScale} yScale={yScale} circleRadius={circleRadius}
          yValue={yValue} xValue={xValue} tooltipFormat={xAxisTickFormat} /> }
      </g>
    </svg>
  )
}
