import { csv } from "d3"
import { useEffect, useState } from "react"

export interface City {
  city: string,
  lat: number,
  lng: number,
  country: string,
  population: number,
}

export const useDataFromCities = (url: string): any => {
  const [data, setData] = useState<any>(null)

  const row = (d: any) => {
    d.lat = +d.lat
    d.lng = +d.lng
    d.population = +d.population
    return d
  }

  useEffect(() => {
    csv(url, row).then(setData)
  }, [])

  return data
}