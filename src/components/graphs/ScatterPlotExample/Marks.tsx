import { DSVRowArray, ScaleLinear } from "d3";

interface MarksProps {
  yScale: ScaleLinear<number, number, never>,
  xScale: ScaleLinear<number, number, never>,
  xValue: any,
  yValue: any,
  data: DSVRowArray<any>,
  tooltipFormat: any,
  circleRadius: number,
}

export const Marks = (props: MarksProps) => {
  return (
    <>
    {
      props.data.map(d => 
        <circle className="marks"
          cx={props.xScale(props.xValue(d))}
          cy={props.yScale(props.yValue(d))}
          r={props.circleRadius}>
            <title>
              (
                {props.tooltipFormat(props.yValue(d))}, 
                {props.tooltipFormat(props.xValue(d))}
              )
            </title>
        </circle>
      )
    }
    </>
  )
}
