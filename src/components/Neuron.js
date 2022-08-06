import React, { useRef , useState} from 'react'
import * as THREE from 'three'
import { useFrame } from "@react-three/fiber";

function Neuron({onHover, ...props}){
    const neuronRef = useRef();
    const chargerRef = props.chargingRef;
    let mnoznik = 1.0;
    let charg = props.charging;
    const [hover, setHover] = useState(false);
    useFrame(()=>{
        //temporary charging, to see animation
        charg=charg+(0.01*mnoznik);
        chargerRef.current.scale.x = charg;
        chargerRef.current.scale.y = charg;
        chargerRef.current.scale.z = charg;
        props.charging = charg;
        if(charg>=1) mnoznik=-1.0;
        if(charg<=0) mnoznik=1.0;
        // if(hover){
        //     neuronRef.current.scale.x = 1.5;
        //     neuronRef.current.scale.y = 1.5;
        //     neuronRef.current.scale.z = 1.5;
        // }else{
        //     neuronRef.current.scale.x = 1;
        //     neuronRef.current.scale.y = 1;
        //     neuronRef.current.scale.z = 1;
        // }
    })

    return(
        <group
        onPointerOver={() => {
            setHover(true);
            console.log("POINTER OVER");
          }}
          onPointerOut={() => {
            setHover(false);
          }}
          >
             <mesh ref={props.chargingRef} {...props}>
                <sphereGeometry args={[15, 64, 32,2*Math.PI,2*Math.PI,2*Math.PI,2*Math.PI]} />
                <meshStandardMaterial 
                color= {props.colors[0]}
                blendingEquation={THREE.AddEquation} 
             />
            </mesh>
            <mesh ref={neuronRef} {...props}>
            <sphereGeometry args={[15, 64, 32,2*Math.PI,2*Math.PI,2*Math.PI,2*Math.PI]} />
            <meshStandardMaterial 
            color= {props.colors[0]}
            transparent={true} 
            opacity={0.5} 
            clearcoat={1} 
            clearcoatRoughness={0} 
            roughness={0} 
        
            />
            </mesh> 
            <mesh  {...props}>
            <sphereGeometry args={[17, 64, 32,2*Math.PI,2*Math.PI,2*Math.PI,2*Math.PI]} />
            <meshStandardMaterial 
            color= {"#FFF"}

            emissive={props.colors[0]}
            transparent={true} 
            opacity={hover?0.1:0.0} 
            clearcoat={1} 
            clearcoatRoughness={1} 
            roughness={1} 
        
            />
             </mesh> 
           
        </group>
    )
}
export default React.memo(Neuron);