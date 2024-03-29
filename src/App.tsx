import React from 'react'
import { HorizontalBarChartExample } from './components/graphs/HorizontalBarChartExample/HorizontalBarChartExample'
import { LoadData } from './components/LoadData/LoadData'
import { MouseFolllows } from './components/MouseFollows/MouseFollows'
import { ScatterPlotExample } from './components/graphs/ScatterPlotExample/ScatterPlotExample'
import { SmileFace } from './components/SmileFace/SmileFace'
import { VizualizingData } from './components/VizualizingData/VizualizingData'
import { ScatterPlotTimeExample } from './components/graphs/ScatterPlotTimeExample/ScatterPlotTimeExample'
import { LineChartExample } from './components/graphs/LineChartExample/LineChartExample'
import { WorldMap } from './components/graphs/WorldMap/WorldMap'
import { VerticalBarChartExample } from './components/graphs/VerticalBarChartExample/VerticalBarChartExample'
import { ScatterPlotWithMenusExample } from './components/graphs/ScatterPlotWithMenusExample/ScatterPlotWithMenusExample'
import { ScatterPlotWithColorAndMenuExample } from './components/graphs/ScatterPlotWithColorAndMenuExample/ScatterPlotWithColorAndMenuExample'
import { WorldmapCities } from './components/graphs/WorldMapCities/WorldMapCities';
import { WorldMapMouseMove } from './components/graphs/WorldMapMouseMove/WorldMapMouseMove';
import { WorldMapSpinning } from './components/graphs/WorldMapSpinning/WorldMapSpinning';
import { WorldMapCitiesSpinning } from './components/graphs/WorldMapCitiesSpinning/WorldMapCitiesSpinning';

function App(): JSX.Element {
  return (
    <>
      <div data-theme="dark">
        {/* <SmileFace /> */}
        {/* <MouseFolllows /> */}
        {/* <LoadData /> */}
        {/* <VizualizingData /> */}
        {/* <VerticalBarChartExample /> */}
        {/* <HorizontalBarChartExample /> */}
        {/* <ScatterPlotExample /> */}
        {/* <ScatterPlotTimeExample /> */}
        {/* <LineChartExample /> */}
        {/* <WorldMap /> */}
        {/* <ScatterPlotWithMenusExample /> */}
        {/* <ScatterPlotWithColorAndMenuExample /> */}
        {/* <WorldmapCities /> */}
        {/* <WorldMapMouseMove /> */}
        <WorldMapSpinning />
        {/* <WorldMapCitiesSpinning /> */}
      </div>
    </>
  )
}

export default App
