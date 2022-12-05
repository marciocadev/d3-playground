import React from 'react'
import { Marks } from './Marks'
import { useDataFromWorldMap } from './useData'

export const WorldMap = (): JSX.Element => {
  const urlWorldMap = 'https://gist.githubusercontent.com/marciocadev/b0da4f846de2f9bd31c25c52a417fee6/raw/d2ed1366e267bcbb7b5c35d1b024f9103d34b23c/countries-50m.json'
  const data = useDataFromWorldMap(urlWorldMap)

  if (!data) {
    return <pre>Loading...</pre>
  };

  const width = 1024
  const height = 500

  // console.log(data)

  return (
    <svg width={width} height={height}>
      {<Marks land={data.land} interiors={data.interiors} />}
    </svg>
  )
}
