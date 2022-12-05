import React from 'react'
import { geoNaturalEarth1, geoPath, geoGraticule } from 'd3'
import { City } from './useDataFromCities'


interface MarksProps {
  worldMap: { [key: string]: any }
  interiors: any,
  sizeScale: any,
  sizeValue: any
  cities: City[]
}

export const Marks = ({
  worldMap,
  interiors,
  sizeScale,
  sizeValue,
  cities,
}: MarksProps): JSX.Element => {
  const projection = geoNaturalEarth1()
  const path = geoPath(projection)
  const graticule = geoGraticule()

  return (
    <>
      <g className="worldmapcities">
        <path className='sphere' d={path({ type: 'Sphere' })!} />
        <path className='graticule' d={path(graticule())!} />
        {
          worldMap.land.features.map((feature: any) => (
            <path className='land' d={(path(feature)!)}
              key={feature.properties.name}>
              <title>{feature.properties.name}</title>
            </path>
          ))
        }
        <path className='interiors' d={path(interiors)!} />
        {cities.map((d: City) => {
          const p = projection([d.lng, d.lat])
          return <circle cx={p?.[0]} cy={p?.[1]} r={sizeScale(sizeValue(d))} />
        })}
      </g>
    </>
  )
}
