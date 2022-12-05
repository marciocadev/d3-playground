import { json } from 'd3'
import { useEffect, useState } from 'react'
import { feature, mesh } from 'topojson'

export const useDataFromWorldMap = (url: string): any => {
  const [data, setData] = useState<any>()

  useEffect(() => {
    json(url).then((topology: any) => {
      const { countries, land } = topology.objects
      setData({
        // land: feature(topology, countries),
        land: feature(topology, land),
        interiors: mesh(topology, countries, (a, b) => a !== b)
      })
    })
  }, [])

  return data
}
