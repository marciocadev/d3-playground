import { max, scaleSqrt } from 'd3';
import { Marks } from './Marks';
import { useDataFromCities } from './useDataFromCities';
import { useDataFromWorldMap } from './useDataFromWorldMap';

export const WorldmapCities = () => {
  const urlCities = 'https://gist.githubusercontent.com/marciocadev/ff1d824742ddaf7cc45b54afd7954967/raw/7c148380f439bf890926feaccf6afb26e8698dad/worldcities_clean.csv';
  //'https://gist.githubusercontent.com/curran/13d30e855d48cdd6f22acdf0afe27286/raw/0635f14817ec634833bb904a47594cc2f5f9dbf8/worldcities_clean.csv';
  const urlWorldMap = 'https://gist.githubusercontent.com/marciocadev/b0da4f846de2f9bd31c25c52a417fee6/raw/d2ed1366e267bcbb7b5c35d1b024f9103d34b23c/countries-50m.json'
  // console.log(url)
  const dataWorldMap = useDataFromWorldMap(urlWorldMap)
  const dataCities = useDataFromCities(urlCities)
  // console.log(dataCities)

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

  return (
    <svg width={width} height={height}>
      {<Marks
        worldMap={dataWorldMap}
        cities={dataCities}
        interiors={dataWorldMap.interiors}
        sizeValue={sizeValue}
        sizeScale={sizeScale}
      />}
    </svg>
  )
}