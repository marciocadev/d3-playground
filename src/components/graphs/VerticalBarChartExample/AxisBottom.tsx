import { ScaleBand } from 'd3'

interface AxisBottomProps {
  xScale: ScaleBand<string>
  bottom: number
  innerHeight: number
}

export const AxisBottom = (props: AxisBottomProps) => {
  const lineSpan = (text: string, yIni: number | undefined) => {
    const textSplit = text.split(' ')
    const resultText = []
    let dy = 0
    for (let i = 0; i < textSplit.length; i++) {
      if (textSplit[i + 1]) {
        if (textSplit[i].length + textSplit[i + 1].length <= 10) {
          resultText.push(
            <tspan dy={dy.toString() + 'em'} x={yIni}>
              {textSplit[i] + ' ' + textSplit[i + 1]}
            </tspan>
          )
          i++
          dy = 1
        } else {
          resultText.push(
            <tspan dy={dy.toString() + 'em'} x={yIni}>
              {textSplit[i]}
            </tspan>
          )
          dy = 1
        }
      } else {
        resultText.push(
          <tspan dy={dy.toString() + 'em'} x={yIni}>
            {textSplit[i]}
          </tspan>
        )
      }
    }

    return <>{resultText}</>
  }

  return (
    <>
      {props.xScale.domain().map((tickValue) => (
        <g className="tick">
          <text key={tickValue} y={props.bottom} x={props.xScale(tickValue)}>
            {lineSpan(tickValue, props.xScale(tickValue))}
          </text>
        </g>
      ))}
    </>
  )
}
