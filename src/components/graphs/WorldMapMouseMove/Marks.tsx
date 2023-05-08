import {
  geoNaturalEarth1, geoOrthographic, geoPath,
  geoGraticule, geoMercator, geoEqualEarth, geoStereographic, geoCentroid, geoInterpolate, transition
} from 'd3'
import { useCallback, useState } from 'react';

interface MarksProps {
  width: number;
  height: number;
  land: { [key: string]: any }
  interiors: any,
}

export const Marks = (props: MarksProps): JSX.Element => {

  const intialMousePosition = { x: props.width / 2, y: props.height / 2 };
  const [MousePosition, SetMousePosition] = useState(intialMousePosition)
  const handleMouseMove = useCallback((event: any) => {
    const { clientX, clientY } = event;
    SetMousePosition({ x: clientX, y: clientY });
  }, [SetMousePosition])

  const projection = geoOrthographic()
    .fitExtent([[10, 10], [props.width - 10, props.height - 10]],
      { type: "Sphere" });

  const path = geoPath(projection)
  const graticule = geoGraticule()

  return (
    <>
      <g className="worldmap" onMouseMove={handleMouseMove}>
        {projection.rotate([MousePosition.x + 30 / 60, -(MousePosition.y - 0.25), 0])}
        <path className='sphere' d={path({ type: 'Sphere' })!} />
        <path className='graticule' d={path(graticule())!} />
        {
          props.land.features.map((feature: any) => (
            <path className='land' d={(path(feature)!)}>
              <title>{feature.properties.name}</title>
            </path>
          ))
        }
        <path className='interiors' d={path(props.interiors)!} />
      </g>
    </>
  )
}
