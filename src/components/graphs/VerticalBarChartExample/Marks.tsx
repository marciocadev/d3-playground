import { DSVRowArray, ScaleBand, ScaleLinear } from "d3"

interface MarksProps {
  yScale: ScaleLinear<number, number, never>,
  xScale: ScaleBand<string>,
  yValue: any,
  xValue: any,
  data: DSVRowArray<any>,
  height: number,
  tooltipFormat: any,
}

export const Marks = (props: MarksProps) => {
  return (
    <>
    {
      props.data.map(d => (
        <rect className="marks"
          key={d.Country}
          x={props.xScale(props.xValue(d))}
          width={props.xScale.bandwidth()}
          y={props.yScale(props.yValue(d))}
          height={props.height - props.yScale(props.yValue(d))}>
            <title>{props.tooltipFormat(props.yValue(d))}</title>
        </rect>
      ))
    }
    </>
  )
}