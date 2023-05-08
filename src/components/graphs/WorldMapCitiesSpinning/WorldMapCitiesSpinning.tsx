import React, { useState } from 'react'
import { useDataFromWorldMap } from './useData';
import { geoOrthographic, geoPath, geoGraticule, max, scaleSqrt } from 'd3';
import { useDataFromCities } from './useDataFromCities';

export const WorldMapCitiesSpinning = (): JSX.Element => {
  const urlCities = 'https://gist.githubusercontent.com/marciocadev/ff1d824742ddaf7cc45b54afd7954967/raw/7c148380f439bf890926feaccf6afb26e8698dad/worldcities_clean.csv';
  const urlWorldMap = 'https://gist.githubusercontent.com/marciocadev/b0da4f846de2f9bd31c25c52a417fee6/raw/d2ed1366e267bcbb7b5c35d1b024f9103d34b23c/countries-50m.json'
  const dataWorldMap = useDataFromWorldMap(urlWorldMap)
  const dataCities = useDataFromCities(urlCities)

  const [state, setState] = useState({ rotation: 0 });

  interface City {
    city: string,
    lat: number,
    lng: number,
    country: string,
    population: number,
  }

  if (!dataWorldMap || !dataCities) {
    return <pre>Loading...</pre>
  };

  const width = 1024
  const height = 500

  const sizeValue = (d: any) => d.population
  const maxRadius = 15
  const scaleMax = max(dataCities, sizeValue)
  const sizeScale = scaleSqrt()
    .domain([0, parseFloat(scaleMax!)])
    .range([0, maxRadius])

  window.requestAnimationFrame(() => {
    setState({ rotation: state.rotation + 0.2 })
  })

  function render(state: any) {
    const projection = geoOrthographic()
      .fitExtent([[10, 10], [width - 10, height - 10]],
        { type: "Sphere" })
      .rotate([state.rotation, 0, 0]);

    const path = geoPath(projection)
    const graticule = geoGraticule()

    return (
      <svg width={width} height={height}>
        <g className='worldmap'>
          <path className='sphere' d={path({ type: 'Sphere' })!} />
          <path className='graticule' d={path(graticule())!} />
          {
            dataWorldMap.land.features.map((feature: any) => (
              <path className='land' d={(path(feature)!)}>
                <title>{feature.properties.name}</title>
              </path>
            ))
          }
          <path className='interiors' d={path(dataWorldMap.interiors)!} />
          {
            dataCities.map((d: City) => {
              const p = projection([d.lng, d.lat])
              return <circle cx={p?.[0]} cy={p?.[1]} r={sizeScale(sizeValue(d))} />
            })
          }
        </g>
      </svg>
    )
  }

  return render(state);
}