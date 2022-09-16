import * as THREE from 'three'
import React, { useLayoutEffect, Fragment, useRef, useEffect, useState, useCallback, useContext, useMemo, forwardRef } from 'react'
import Neuron from './Neuron'


function lerp(a, b, t) {return a + (b - a) * t}

function Impulse({position, iRef, colors}){
  
  return(
  <mesh ref={iRef} position={position} >
      <sphereGeometry args={[2, 16, 16,2*Math.PI,2*Math.PI,2*Math.PI,2*Math.PI]} />
      <meshBasicMaterial 
      color= {colors[2]}
      clearcoat={1} 
      clearcoatRoughness={0} 
      roughness={0}  />
  </mesh> 
)
}
function StartPoint({ changeInfo, neuron, destination , colors, bgColor, ...props }) {

 const iRef= useRef();
 const [t,setT] = useState(0);
 const [pulsed, setPulsed] = useState(false);
 const startPosition = [neuron.position_x,neuron.position_y,neuron.position_z];
 useEffect(()=>{
  
  if(neuron.state=="pulsing" && !pulsed) { 
    console.log(neuron);
    setT(0);
    setPulsed(true)
    console.log("Sending")
    iRef.current.position.set(startPosition);
    iRef.current.destination = destination;
  }; 
  

  if(t<1 && pulsed){
    //console.log("Sending")
    
    var newX = lerp(startPosition[0], destination[0], t);   // interpolate between a and b where
    var newY = lerp(startPosition[1], destination[1], t);   // t is first passed through a easing
    var newZ = lerp(startPosition[2], destination[2], t);   // function in this example.

    // t+=0.1
    setT(Number(t)+0.1);
    iRef.current.position.x = newX;
    iRef.current.position.y = newY;
    iRef.current.position.z = newZ;
  }
  if(t>=1) setPulsed(false);
  
},[neuron.state,t])
 
  return (

    <group>
    <Neuron bgColor={bgColor} changeInfo={changeInfo} position={[neuron.position_x,neuron.position_y,neuron.position_z]} charging={neuron.charging} colors={colors} label={neuron.label} state={neuron.state}/>
    <Impulse position={[neuron.position_x,neuron.position_y,neuron.position_z]} destination={destination} iRef={iRef}  colors={colors}/>
    </group>
  )
}
function EndPoint({changeInfo, neuron, colors, bgColor, ...props }) {
  // let [bindHover, hovered] = useHover()
  // let bindDrag = useDrag(onDrag, onEnd)
  

 
  return (
    <Neuron bgColor={bgColor} changeInfo={changeInfo} position={[neuron.position_x,neuron.position_y,neuron.position_z]} charging={neuron.charging} colors={colors} label={neuron.label} state={neuron.state}/>
    
  )
}
function negativeRGB(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: 255-parseInt(result[1], 16),
    g: 255-parseInt(result[2], 16),
    b: 255-parseInt(result[3], 16)
  } : null;
}
function componentToHex(c) {
  var hex = c.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}
function calculateColor (color) {
  color = negativeRGB(color);
  return "#"+componentToHex(color.r)+componentToHex(color.g)+componentToHex(color.b);
}
function Synapsis({ changeInfo, start, end , colors, weight, bgColor, ...props}) {
  const ref = useRef()
  const [hovered, setHovered] = React.useState(false);
  const startPosition = [start.position_x, start.position_y, start.position_z];
  const endPosition = [end.position_x, end.position_y, end.position_z]
  useLayoutEffect(() => {
    ref.current.geometry.setFromPoints([startPosition, endPosition].map((point) => new THREE.Vector3(...point)))
  }, [startPosition, endPosition])
  
  
    return (
      <Fragment>
        <line ref={ref} onPointerOver={() => {
            setHovered(true);
            console.log("POINTER OVER synapsis");
            
            changeInfo( "Synapsis\n weight: "+weight)
          }}
          onPointerOut={() => {
            setHovered(false);
            changeInfo( "This panel shows informations about hovered element from visualization")
          }}>
            <bufferGeometry />
          <lineBasicMaterial 
          color = {hovered? calculateColor(colors[1]) : colors[1]}
	        linewidth={20}
	        linecap='round' 
	        linejoin='round' 
          />
        </line>
        <StartPoint  bgColor={bgColor} changeInfo={changeInfo} neuron={start} destination={[end.position_x,end.position_y,end.position_z]} colors={colors}/>
        <EndPoint  bgColor={bgColor} changeInfo={changeInfo} neuron={end} colors={colors}/>
      </Fragment>
    )
  }
  export default React.memo(Synapsis);
  