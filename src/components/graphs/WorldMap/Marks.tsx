import {
  geoNaturalEarth1, geoOrthographic, geoPath,
  geoGraticule, geoMercator, geoEqualEarth, geoStereographic, geoCentroid, geoInterpolate, transition
} from 'd3'

interface MarksProps {
  width: number;
  height: number;
  land: { [key: string]: any }
  interiors: any
}

export const Marks = (props: MarksProps): JSX.Element => {
  const projection = geoOrthographic()
    .fitExtent([[10, 10], [props.width - 10, props.height - 10]],
      { type: "Sphere" });
  const path = geoPath(projection)
  const graticule = geoGraticule()

  return (
    <>
      <g className="worldmap">
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
