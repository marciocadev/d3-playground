import { curveBasis, curveNatural, DSVRowArray, line, ScaleLinear, ScaleTime } from 'd3'

interface MarksProps {
  yScale: ScaleLinear<number, number, never>
  xScale: ScaleTime<number, number, never>
  xValue: any
  yValue: any
  data: DSVRowArray<any>
  xTooltipFormat: any
  yTooltipFormat: any
  circleRadius: number
}

export const Marks = (props: MarksProps) => {
  return (
    <>
    <g className="marks">
      <path
        d={(line<any>()
          .x(d => props.xScale(props.xValue(d)))
          .y(d => props.yScale(props.yValue(d)))
          .curve(curveNatural)
          (props.data)
        ) as undefined | string
        } />
      {
        props.data.map(d =>
          <circle
          cx={props.xScale(props.xValue(d))}
          cy={props.yScale(props.yValue(d))}
          r={props.circleRadius}>
              <title>
                (
                  {props.yTooltipFormat(props.yValue(d))} ,
                  {props.xTooltipFormat(props.xValue(d))}
                )
              </title>
          </circle>
        )
      }
    </g>
    </>
  )
}
