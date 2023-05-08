import { json } from 'd3'
import { useEffect, useState } from 'react'
import { feature, mesh } from 'topojson'

export const useDataFromWorldMap = (url: string): any => {
  const [data, setData] = useState<any>()

  /**
   * Testando o plugin Better Comments
   * * Comentários em verde destacado
   * ! Comentários como alertas de erro
   * TODO: TODO fica em laranja
   * ? a interrogação deixa o comentário azul
   * @param meuParametro como o parâmetro é exibidono comentário
   */
  useEffect(() => {
    json(url).then((topology: any) => {
      const { countries, land } = topology.objects
      setData({
        // land: feature(topology, countries),
        land: feature(topology, land),
        interiors: mesh(topology, countries, (a, b) => a !== b),
      })
    })
  }, [])

  return data
}
