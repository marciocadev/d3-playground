import { csv, DSVRowArray } from 'd3'
import { useEffect, useState } from 'react'

export const useData = (url: string) => {
  const [data, setData] = useState<DSVRowArray<any>>()

  useEffect(() => {
    const row = (d: any) => {
      d.sepal_length = +d.sepal_length
      d.sepal_width = +d.sepal_width
      d.petal_length = +d.petal_length
      d.petal_width = +d.petal_width
      return d
    }
    csv(url, row).then(setData)
  }, [])

  return data
}
