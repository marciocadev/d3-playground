import { useCallback, useState } from "react";

export const MouseFolllows = () => {
  
  const width = 960;
  const height = 500;
  const circleRadius = 30;
  
  let initialMousePosition = { x: width / 2, y: height / 2 };
  const [mousePosition, setMousePosition] = useState(initialMousePosition);
  
  const handleMouseMove = useCallback((event: any) => {
    const {clientX, clientY} = event;
    setMousePosition({ x: clientX, y: clientY })
  }, [setMousePosition])
    
  return (
    <svg width={width} height={height}
      onMouseMove={handleMouseMove} style={{backgroundColor: '#888'}}>
      <circle 
        cx={mousePosition.x}
        cy={mousePosition.y}
        r={circleRadius}
      />
    </svg>
)
}