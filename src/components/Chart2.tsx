import { select, scaleLinear, line, axisBottom, max, min, axisRight, curveBasis } from 'd3';

export const Chart = () => {

  let dimensions = {
    width: window.innerWidth * 0.9,
    height: 400,
    margin: {
      top: 15,
      right: 15,
      bottom: 40,
      left: 60,
    },
  }

  var canvas = select("body").select('#root').select('#wrapper')
    .append("svg")
    .attr("width", dimensions.width)
    .attr("height", dimensions.height)
    .attr("transform", "translate(" + dimensions.margin.left + "," + dimensions.margin.right + ")");

  const sampleData = [
    { "yData": 202,"xData": 2000 },
    { "yData": 215, "xData": 2001 },
    { "yData": 179, "xData": 2002 },
    { "yData": 199, "xData": 2003 },
    { "yData": 134, "xData": 2003 },
    { "yData": 176, "xData": 2010 }
  ];
  const initialXmin = min(sampleData, function (d) { return d.xData; });
  const initialXMax = max(sampleData, function (d) { return d.xData; });
  const initialYmin = min(sampleData, function (d) { return d.yData; });
  const initialYMax = max(sampleData, function (d) { return d.yData; });
  const linearXScale = scaleLinear()
      .domain([initialXmin === undefined ? 1 : initialXmin, initialXMax === undefined ? 1 : initialXMax])
      .range([dimensions.margin.left, dimensions.width - dimensions.margin.right]);
  var linearYScale = scaleLinear()
      .domain([initialYMax === undefined ? 1 : initialYMax, initialYmin === undefined ? 1 : initialYmin])
      .range([dimensions.margin.top, dimensions.height - dimensions.margin.bottom]);
  var xAxis = axisBottom(linearXScale);
  var yAxis = axisRight(linearYScale);

  canvas.append("g")
    .attr("transform", "translate(0," + (dimensions.height - dimensions.margin.bottom) + ")")
    .call(xAxis);
  //create y Axis
  canvas.append("g")
    .attr("transform", "translate( " + dimensions.margin.left + "  ,0)")
    .call(yAxis);
  
  var lineGenerator = line<any>()
    .x(function (d) {
        return linearXScale(d['xData']);
        //return linearXScale(d["x_value"]);
    })
    .y(function (d) {
        return linearYScale(d['yData']);
    })
    .curve(curveBasis);

  canvas.append("path")
    .attr("d", lineGenerator(sampleData))
    .attr('stroke', 'green')
    .attr('stroke-width', 2)
    .attr('fill', 'none');
  

  return (
    <div id='wrapper'></div>
  );
}