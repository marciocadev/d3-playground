import { DSVRowArray, ScaleLinear, ScaleTime } from "d3";

interface MarksProps {
  yScale: ScaleLinear<number, number, never>,
  xScale: ScaleTime<number, number, never>,
  xValue: any,
  yValue: any,
  data: DSVRowArray<any>,
  xTooltipFormat: any,
  yTooltipFormat: any,
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
                {props.yTooltipFormat(props.yValue(d))} , 
                {props.xTooltipFormat(props.xValue(d))}
              )
            </title>
        </circle>
      )
    }
    </>
  )
}
