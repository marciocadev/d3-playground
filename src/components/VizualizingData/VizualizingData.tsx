import { arc, csv, pie, DSVRowArray } from "d3";
import { useState, useEffect } from "react";

export const VizualizingData = () => {
  const [data, setData] = useState<DSVRowArray<string>>();

  const width = 960;
  const height = 500;
  const centerX = width / 2;
  const centerY = height / 2

  const pieArc = arc()
  const pieF = (props: {startAngle: number, endAngle: number}) => {
    return pieArc({
      innerRadius: 0,
      outerRadius: width,
      startAngle: props.startAngle,
      endAngle: props.endAngle
    });
  }

  const url = 'https://gist.githubusercontent.com/curran/b236990081a24761f7000567094914e0/raw/acd2b8cecfe51c520622fbaf407ee88b8796bfc6/cssNamedColors.csv'
  useEffect(() => {
    csv(url).then(setData);
  }, []);
  
  if (!data) {
    return <pre>Loading...</pre>;
  };

  const colorPie = pie<any>().value(1)

  return (
    <svg width={width} height={height}>
      <g transform={`translate(${centerX}, ${centerY})`}>
        {
          colorPie(data)
            .map(d => (
              <path 
                fill={d.data['RGB hex value']}
                d={pieF(d) as string}
              />
            ))
        }
        {/* {
          data.map((d, i) => (
              <path 
                fill={d['RGB hex value']}
                d={pieF({
                  startAngle: i / data.length * 2 * Math.PI,
                  endAngle: (i + 1) / data.length * 2 * Math.PI
                }) as string} />
          ))
        } */}
      </g>
    </svg>
  )
}
