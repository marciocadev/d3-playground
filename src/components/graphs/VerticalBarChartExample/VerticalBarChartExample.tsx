import { format, max, scaleBand, scaleLinear } from "d3";
import { AxisBottom } from "./AxisBottom";
import { AxisLeft } from "./AxisLeft";
import { Marks } from "./Marks";
import { useData } from "./useData";

export const VerticalBarChartExample = () => {
  const url = 'https://gist.githubusercontent.com/curran/0ac4077c7fc6390f5dd33bf5c06cb5ff/raw/605c54080c7a93a417a3cea93fd52e7550e76500/UN_Population_2019.csv';

  const width = 1024;
  const height = 500;
  const margin = {
    top: 20,
    right: 65,
    bottom: 100,
    left: 20
  }
  const xAxisLabelOffset = 50;
  const innerHeight = height - margin.top - margin.bottom;
  const innerWidth = width - margin.left - margin.right;

  const data = useData(url);

  if (!data) {
    return <pre>Loading...</pre>;
  };

  const xValue = (d:any) => d.Country;
  const xScale = scaleBand()
    .domain(data.map(xValue))
    .range([0, innerWidth])
    .paddingInner(0.15);

  const yValue = (d:any) => d.Population;
  const yScale = scaleLinear()
      .domain([0, max(data, yValue)])
      .range([innerHeight, 0])

  const siFormat = format('.2s');
  const yAxisTickFormat = (tickValue: number | { valueOf(): number; }) => siFormat(tickValue).replace('G', 'B');

  return (
    <svg width={width} height={height}>
      <g transform={`translate(${margin.left}, ${margin.top})`}>
        { <AxisLeft yScale={yScale} innerWidth={innerWidth} 
          tickFormat={yAxisTickFormat} /> }
        { <AxisBottom xScale={xScale} bottom={innerHeight + 20} innerHeight={innerHeight} /> }
        {
          <Marks data={data} xScale={xScale} yScale={yScale}
          xValue={xValue} yValue={yValue} height={innerHeight} 
          tooltipFormat={yAxisTickFormat} />
        }
      </g>
    </svg>
  )
}