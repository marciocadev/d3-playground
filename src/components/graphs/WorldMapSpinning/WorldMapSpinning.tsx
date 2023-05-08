import React, { useState } from 'react'
import { useDataFromWorldMap } from './useData';
import {
  geoNaturalEarth1, geoOrthographic, geoPath,
  geoGraticule, geoMercator, geoEqualEarth, geoStereographic, geoCentroid, geoInterpolate, transition
} from 'd3';
import { renderIntoDocument } from 'react-dom/test-utils';

export const WorldMapSpinning = (): JSX.Element => {
  const urlWorldMap = 'https://gist.githubusercontent.com/marciocadev/b0da4f846de2f9bd31c25c52a417fee6/raw/d2ed1366e267bcbb7b5c35d1b024f9103d34b23c/countries-50m.json'
  const data = useDataFromWorldMap(urlWorldMap)

  const [state, setState] = useState({ rotation: 0 });

  if (!data) {
    return <pre>Loading...</pre>
  };

  const width = 1024
  const height = 500

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
            data.land.features.map((feature: any) => (
              <path className='land' d={(path(feature)!)}>
                <title>{feature.properties.name}</title>
              </path>
            ))
          }
          <path className='interiors' d={path(data.interiors)!} />
        </g>
      </svg>
    )
  }

  return render(state);
}