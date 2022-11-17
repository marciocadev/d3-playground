import React from 'react'
import { Marks } from './Marks'
import { useDataFromWorldMap } from './useData'

export const WorldMap = (): JSX.Element => {
  // const url = 'countries-50m.json'; // 'https://unpkg.com/world-atlas@2.0.2/countries-50m.json';
  const data = useDataFromWorldMap()

  if (!data) {
    return <pre>Loading...</pre>
  };

  const width = 1024
  const height = 500

  console.log(data)

  return (
    <svg width={width} height={height}>
      {<Marks land={data.land} interiors={data.interiors} />}
    </svg>
  )
}
