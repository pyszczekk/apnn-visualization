import * as THREE from 'three'
import React, { useLayoutEffect, Fragment, useRef, useEffect, useState, useCallback, useContext, useMemo, forwardRef } from 'react'
import Neuron from './Neuron'
import { useFrame } from "@react-three/fiber";
import { max, abs} from 'mathjs';


function lerp(a, b, t) {return a + (b - a) * t}

function Impulse({position, iRef, colors}){
  
  return(
  <mesh ref={iRef} position={position} >
      <capsuleGeometry args={[1.5,2.5, 5, 5]} />
      <meshBasicMaterial 
      color= {colors[2]}
      clearcoat={1} 
      clearcoatRoughness={0} 
      roughness={0}  />
  </mesh> 
)
}
function StartPoint({ changeInfo, position, charging, destination , colors, bgColor}) {
  // let [bindHover, hovered] = useHover()
  // let bindDrag = useDrag(onDrag, onEnd)
   
 const cRef = useRef();
 const iRef= useRef();
 var t = 1; 

 useFrame(()=>{

  if(cRef.current.scale.x>=1){ 
    t=0;
    iRef.current.position.set(position);
    iRef.current.destination = destination;
   
    var diff = [position[0] - destination[0], position[1]-destination[1], position[2]-destination[2]];
    var x = diff[0];
    var y = diff[1];
    var z = diff[2];
    var yaw = Math.atan2(x, z) *180.0/Math.PI;
    var padj = Math.sqrt(Math.pow(x, 2) + Math.pow(z, 2)); 
    var pitch = Math.atan2(padj, y) *180.0/Math.PI; 
    // console.log(diff)
    // console.log(yaw, padj,pitch);
    var maximum = max(abs(diff));
  //   if(rotationAxis!=undefined || rotationAxis!=NaN){
  //   var maximum = max(abs(rotationAxis))
  //   var rAxis = rotationAxis
  //     if(maximum!=0){
  //       rAxis = rotationAxis.map((x)=>x/maximum);
  //     }
  //  var product = dot(position,destination);
  //  var angle = acos(product);
  // angle = Math.atan(angle.im/angle.re);

  diff = [parseFloat(diff[0]/maximum),parseFloat(diff[1]/maximum),parseFloat(diff[2]/maximum)]
 // console.log(maximum, diff,"normalize");
    iRef.current.rotation.x =  padj*diff[2]*Math.PI/180
    iRef.current.rotation.y =  yaw*diff[1]*Math.PI/180
    iRef.current.rotation.z =  pitch*diff[0]*Math.PI/180
    
  //  if(maximum==0)
  //  iRef.current.rotation.z =  Math.PI/2+rAxis[2]*angle;
  // console.log(rotationAxis, rAxis, angle, maximum, product);
  //}
  }; 
  
  if(t<1){
    console.log("Sending")
    
    var newX = lerp(position[0], destination[0], t);   // interpolate between a and b where
    var newY = lerp(position[1], destination[1], t);   // t is first passed through a easing
    var newZ = lerp(position[2], destination[2], t);   // function in this example.

    t+=0.07
    iRef.current.position.x = newX;
    iRef.current.position.y = newY;
    iRef.current.position.z = newZ;
  }
  
  
})
 
  return (

    <group>
    <Neuron  bgColor={bgColor} changeInfo={changeInfo} position={position} charging={charging} chargingRef={cRef} colors={colors}/>
    <Impulse position={position} destination={destination} iRef={iRef}  colors={colors}/>
    </group>
  )
}
function EndPoint({changeInfo, position, charging, colors, bgColor }) {
  // let [bindHover, hovered] = useHover()
  // let bindDrag = useDrag(onDrag, onEnd)
   
 const cRef = useRef();

 
  return (

    <Neuron  bgColor={bgColor} changeInfo={changeInfo} position={position} charging={charging} chargingRef={cRef} colors ={colors}/>
    
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
function Synapsis({ changeInfo,start, end , colors, weight, bgColor}) {
  const ref = useRef()
  const synapsis = useRef();
  const [hovered, setHovered] = React.useState(false);
  useLayoutEffect(() => {
    ref.current.geometry.setFromPoints([start, end].map((point) => new THREE.Vector3(...point)))
  }, [start, end])
  
  
    return (
      <Fragment>
        <line ref={ref} onPointerOver={() => {
            setHovered(true);
            console.log("POINTER OVER synapsis");
            
            changeInfo( "Synapsis: "+weight)
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
        <StartPoint  bgColor={bgColor} changeInfo={changeInfo} position={start} charging={0.65} destination={end} colors={colors}/>
        <EndPoint  bgColor={bgColor} changeInfo={changeInfo} position={end} charging={0.1} colors={colors}/>
      </Fragment>
    )
  }
  export default Synapsis;
  