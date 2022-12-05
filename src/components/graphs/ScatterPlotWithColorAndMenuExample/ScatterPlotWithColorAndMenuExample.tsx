import { extent, format, scaleLinear, scaleOrdinal, DSVRowString, DSVRowArray } from 'd3'
import { useState } from 'react'
import { AxisBottom } from './AxisBottom'
import { AxisLeft } from './AxisLeft'
import { ColorLegend } from './ColorLegend'
import { Dropdown } from './Dropdown'
import { Marks } from './Marks'
import { useData } from './useData'

export const ScatterPlotWithColorAndMenuExample = () => {
  const url = 'https://gist.githubusercontent.com/curran/a08a1080b88344b0c8a7/raw/0e7a9b0a5d22642a06d3d5b9bcbad9890c8ee534/iris.csv'

  const width = 1024
  const height = 550
  const margin = {
    top: 20,
    right: 165,
    bottom: 65,
    left: 90
  }
  const xAxisLabelOffset = 50
  const yAxisLabelOffset = 40
  const innerHeight = height - margin.top - margin.bottom
  const innerWidth = width - margin.left - margin.right


  const attributes = [
    { value: 'sepal_length', label: 'Sepal Length' },
    { value: 'sepal_width', label: 'Sepal Width' },
    { value: 'petal_length', label: 'Petal Length' },
    { value: 'petal_width', label: 'Petal Width' },
    { value: 'species', label: 'Species' }
  ];

  const getLabel = (value: string) => {
    for (let i = 0; i < attributes.length; i++) {
      if (attributes[i].value === value) {
        return attributes[i].label;
      }
    }
  };

  let initialXAttribute = 'sepal_width'
  const [xAttribute, setXAttribute] = useState(initialXAttribute)
  const xValue = (d: any) => d[xAttribute] as (number | undefined)
  const xAxisLabel = getLabel(xAttribute)

  let initialYAttribute = 'sepal_length'
  const [yAttribute, setYAttribute] = useState(initialYAttribute)
  const yValue = (d: any) => d[yAttribute] as (number | undefined)
  const yAxisLabel = getLabel(yAttribute)

  let initialColorAttribute = 'species';
  const [colorAttribute, setColorAttribute] = useState(initialColorAttribute)
  let colorValue = (d: any) => d[colorAttribute]
  const colorLegendLabel = 'Species'

  const data = useData(url)

  const [hoveredValue, setHoveredValue] = useState(null)

  if (data == null) {
    return <pre>Loading...</pre>
  };

  // const xMax = max(data, xValue);
  // const xMin = min(data, xValue)
  const xExtent = extent(data, xValue)
  const xScale = scaleLinear()
    .domain(xExtent[0] === undefined ? [0, 0] : xExtent)
    .range([0, innerWidth])
    .nice()

  const yExtent = extent(data, yValue)
  const yScale = scaleLinear()
    .domain(yExtent[0] === undefined ? [0, 0] : yExtent)
    .range([innerHeight, 0])

  const colorScale = scaleOrdinal()
    .domain(data.map(colorValue))
    .range(['#E6842A', '#137B80', '#8E6C8A']);

  const filteredData = data.filter(d => (hoveredValue === colorValue(d)))

  const siFormat = format('.2s')
  const xAxisTickFormat = (tickValue: number | { valueOf: () => number }) => siFormat(tickValue).replace('G', 'B')

  const tickSpacing = 20
  const tickTextOffset = 15
  const circleRadius = 7
  const fadeOpacity = 0.3

  return (
    <>
      <div className='flex justify-center w-[64rem] pt-3 pb-2'>
        <label className='mr-1'>X</label>
        <Dropdown id='y-select'
          options={attributes}
          selectedValue={xAttribute}
          onSelectedValueChange={setXAttribute}
        />
        <label className='ml-4 mr-1'>Y</label>
        <Dropdown id='x-select'
          options={attributes}
          selectedValue={yAttribute}
          onSelectedValueChange={setYAttribute}
        />
      </div>
      <svg width={width} height={height}>
        <g transform={`translate(${margin.left}, ${margin.top})`}>
          <text textAnchor='middle' className="axis-label"
            transform={`translate(${-yAxisLabelOffset}, ${innerHeight / 2}) rotate(-90) `}
          >{yAxisLabel}</text>
          {<AxisLeft yScale={yScale} innerWidth={innerWidth}
            tickOffset={5} />}
          <text textAnchor='middle' className="axis-label"
            x={innerWidth / 2} y={innerHeight + xAxisLabelOffset} >
            {xAxisLabel}
          </text>
          {<AxisBottom xScale={xScale} innerHeight={innerHeight}
            tickFormat={xAxisTickFormat} tickOffset={5} />}
          <g transform={`translate(${innerWidth + 50}, 50)`}>
            <text textAnchor='middle'
              x={35} y={-25}
              className="axis-label"
            >{colorLegendLabel}</text>
            <ColorLegend colorScale={colorScale} tickSpacing={tickSpacing}
              tickSize={circleRadius} tickTextOffset={tickTextOffset}
              onHover={setHoveredValue} hoveredValue={hoveredValue}
              fadeOpacity={fadeOpacity} />
          </g>
          <g opacity={hoveredValue ? fadeOpacity : 1}>
            {<Marks data={data} xScale={xScale} yScale={yScale} circleRadius={circleRadius}
              yValue={yValue} xValue={xValue} tooltipFormat={xAxisTickFormat}
              colorScale={colorScale} colorValue={colorValue} />}
          </g>
          {<Marks data={filteredData} xScale={xScale} yScale={yScale} circleRadius={circleRadius}
            yValue={yValue} xValue={xValue} tooltipFormat={xAxisTickFormat}
            colorScale={colorScale} colorValue={colorValue} />}
        </g>
      </svg>
    </>
  )
}