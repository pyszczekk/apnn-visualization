import * as THREE from 'three'
import ReactDOM from 'react-dom'
import React, { useLayoutEffect, Fragment, useRef, useEffect, useState, useCallback, useContext, useMemo, forwardRef } from 'react'
import Neuron from './Neuron'
import { useFrame } from "@react-three/fiber";
import { InstancedInterleavedBuffer } from 'three';


// function useHover() {
//   const [hovered, setHover] = useState(false)
//   const hover = useCallback((e) => (e.stopPropagation(), setHover(true)), [])
//   const unhover = useCallback((e) => setHover(false), [])
//   return [{ onPointerOver: hover, onPointerOut: unhover }, hovered]
// }

// function useDrag(onDrag, onEnd) {
//   const [active, setActive] = useState(false)
//    const activeRef = useRef()
//   const move = useCallback((event) => activeRef.current && (event.stopPropagation(), onDrag(event.unprojectedPoint)), [onDrag])
//   useEffect(() => void (activeRef.current = active))
//   return { onPointerMove: move }
// }
function lerp(a, b, t) {return a + (b - a) * t}

function Impulse({position, iRef, colors}){
  
  return(
  <mesh ref={iRef} position={position}>
      <sphereGeometry args={[5, 16, 16]} />
      <meshBasicMaterial 
      color= {colors[2]}
      clearcoat={1} 
      clearcoatRoughness={0} 
      roughness={0}  />
  </mesh> 
)
}
function StartPoint({ position, charging, destination , colors}) {
  // let [bindHover, hovered] = useHover()
  // let bindDrag = useDrag(onDrag, onEnd)
   
 const cRef = useRef();
 const iRef= useRef();
 var t = 1;
 useFrame(()=>{
  if(cRef.current.scale.x==1){ 
    t=0;
    iRef.current.position.set(position);
     iRef.current.destination = destination;
  }; 
  
  if(t<1){
    console.log("Sending")
    var newX = lerp(position[0], destination[0], t);   // interpolate between a and b where
    var newY = lerp(position[1], destination[1], t);   // t is first passed through a easing
    var newZ = lerp(position[2], destination[2], t);   // function in this example.

    t+=0.1
    iRef.current.position.x = newX;
    iRef.current.position.y = newY;
    iRef.current.position.z = newZ;
  }
  
})
 
  return (

    <group>
    <Neuron position={position} charging={charging} chargingRef={cRef} colors={colors}/>
    <Impulse position={position} destination={destination} iRef={iRef}  colors={colors}/>
    </group>
  )
}
function EndPoint({ position, charging, colors }) {
  // let [bindHover, hovered] = useHover()
  // let bindDrag = useDrag(onDrag, onEnd)
   
 const cRef = useRef();

 
  return (

    <Neuron position={position} charging={charging} chargingRef={cRef} colors ={colors}/>
    
  )
}
function Synapsis({ start, end , colors}) {
  const ref = useRef()
  const synapsis = useRef();
  useLayoutEffect(() => {
    ref.current.geometry.setFromPoints([start, end].map((point) => new THREE.Vector3(...point)))
  }, [start, end])
  

    return (
      <Fragment>
        <line ref={ref}>
          <bufferGeometry/>
          <lineBasicMaterial 
          color = {colors[1]}
	        linewidth={20}
	        linecap='round' 
	        linejoin='round' />
        </line>
        <StartPoint position={start} charging={1} destination={end} colors={colors}/>
        <EndPoint position={end} charging={0} colors={colors}/>
      </Fragment>
    )
  }
  export default Synapsis;
  