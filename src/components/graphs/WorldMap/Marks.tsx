import { geoEqualEarth, geoNaturalEarth1, geoPath, geoGraticule } from 'd3';

interface MarksProps {
  land: {[key: string]: any},
  interiors: any;
}

export const Marks = (props: MarksProps) => {
  const projection = geoNaturalEarth1();
  const path = geoPath(projection);
  const graticule = geoGraticule();

  return (
    <>
    <g className="world-map">
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
