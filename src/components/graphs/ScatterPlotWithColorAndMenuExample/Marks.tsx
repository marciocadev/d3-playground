import { DSVRowArray, ScaleLinear, ScaleOrdinal } from 'd3'
import { Domain } from 'domain'

interface MarksProps {
  yScale: ScaleLinear<number, number, never>
  xScale: ScaleLinear<number, number, never>
  xValue: any
  yValue: any
  data: DSVRowArray<any>
  tooltipFormat: any
  circleRadius: number,
  colorScale: ScaleOrdinal<string, any, never>,
  colorValue: any
}

export const Marks = (props: MarksProps) => {
  return (
    <>
      {
        props.data.map((d, i) =>
          <circle className="marks-color"
            cx={props.xScale(props.xValue(d))}
            cy={props.yScale(props.yValue(d))}
            r={props.circleRadius}
            fill={props.colorScale(props.colorValue(d))}
            key={i}>
            <title>
              ( {props.tooltipFormat(props.yValue(d))}, {props.tooltipFormat(props.xValue(d))} )
            </title>
          </circle>
        )
      }
    </>
  )
}
