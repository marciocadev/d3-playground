import { DSVRowArray, ScaleBand, ScaleLinear } from "d3";

interface MarksProps {
  yScale: ScaleBand<string>,
  xScale: ScaleLinear<number, number, never>,
  xValue: any,
  yValue: any,
  data: DSVRowArray<any>,
  tooltipFormat: any,
}

export const Marks = (props: MarksProps) => {
  return (
    <>
    {
      props.data.map(d => 
        <rect className="marks"
          key={d.Country}
          x={0} y={props.yScale(props.yValue(d))}
          width={props.xScale(props.xValue(d))}
          height={props.yScale.bandwidth()}>
            <title>{props.tooltipFormat(props.xValue(d))}</title>
        </rect>
      )
    }
    </>
  )
}
